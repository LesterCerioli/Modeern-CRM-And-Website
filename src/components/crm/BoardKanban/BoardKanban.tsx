'use client';

import { useState } from 'react';
import * as S from './styles';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { BoardTemplateProps, KanbanBoardData, KanbanColumn, KanbanCard, WIPLimit } from '@/interfaces/board.types';

interface BoardKanbanProps extends BoardTemplateProps {
  initialData?: KanbanBoardData;
}

const BoardKanban: React.FC<BoardKanbanProps> = ({
  projectId,
  projectName,
  projectCode,
  organizationName,
  initialData
}) => {
  const [columns, setColumns] = useState<KanbanColumn[]>(
    initialData?.columns || [
      { id: 'todo', name: 'To Do', position: 0, wipLimit: 5, color: '#3498db' },
      { id: 'inProgress', name: 'In Progress', position: 1, wipLimit: 3, color: '#f39c12' },
      { id: 'review', name: 'Review', position: 2, wipLimit: 2, color: '#9b59b6' },
      { id: 'done', name: 'Done', position: 3, wipLimit: undefined, color: '#2ecc71' },
    ]
  );

  const [cards, setCards] = useState<KanbanCard[]>(
    initialData?.cards || []
  );

  const [wipLimits] = useState<WIPLimit[]>(
    initialData?.wipLimits || []
  );

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newCards = Array.from(cards);
    const movedCard = newCards.find(card => card.id === draggableId);
    
    if (!movedCard) return;

    // Remove from old position
    newCards.splice(source.index, 1);
    
    // Update card properties
    movedCard.columnId = destination.droppableId;
    movedCard.position = destination.index;
    
    // Insert at new position
    newCards.splice(destination.index, 0, movedCard);
    
    // Recalculate positions for destination column
    const destinationCards = newCards.filter(card => card.columnId === destination.droppableId);
    destinationCards.forEach((card, index) => {
      card.position = index;
    });

    setCards(newCards);
  };

  const handleCreateCard = (columnId: string) => {
    const newCard: KanbanCard = {
      id: `card-${Date.now()}`,
      title: 'New Task',
      description: 'Task description',
      columnId,
      position: cards.filter(c => c.columnId === columnId).length,
      size: 'm',
      blocked: false,
      assignee: undefined
    };
    setCards([...cards, newCard]);
  };

  const handleCreateColumn = () => {
    const newColumn: KanbanColumn = {
      id: `column-${Date.now()}`,
      name: 'New Column',
      position: columns.length,
      wipLimit: 5,
      color: '#95a5a6'
    };
    setColumns([...columns, newColumn]);
  };

  const handleUpdateCard = (cardId: string, updates: Partial<KanbanCard>) => {
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === cardId ? { ...card, ...updates } : card
      )
    );
  };

  const handleToggleBlocked = (cardId: string) => {
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === cardId ? { ...card, blocked: !card.blocked } : card
      )
    );
  };

  const getCardsForColumn = (columnId: string) => {
    return cards
      .filter(card => card.columnId === columnId)
      .sort((a, b) => a.position - b.position);
  };

  const getColumnWIPStatus = (columnId: string): 'under' | 'at' | 'over' => {
    const column = columns.find(col => col.id === columnId);
    if (!column || !column.wipLimit) return 'under';
    
    const cardCount = cards.filter(card => card.columnId === columnId).length;
    
    if (cardCount < column.wipLimit) return 'under';
    if (cardCount === column.wipLimit) return 'at';
    return 'over';
  };

  const calculateFlowMetrics = () => {
    const totalCards = cards.length;
    const doneCards = cards.filter(card => card.columnId === 'done').length;
    const blockedCards = cards.filter(card => card.blocked).length;
    
    return {
      throughput: doneCards,
      wip: totalCards - doneCards,
      blocked: blockedCards,
      flowEfficiency: totalCards > 0 ? Math.round((doneCards / totalCards) * 100) : 0
    };
  };

  const metrics = calculateFlowMetrics();

  return (
    <S.KanbanBoardContainer>
      <S.KanbanBoardHeader>
        <S.ProjectHeader>
          <S.ProjectTitle>
            <S.AgileMethodBadge>
              Kanban
            </S.AgileMethodBadge>
            <h2>{projectName}</h2>
            <S.ProjectCode>{projectCode}</S.ProjectCode>
          </S.ProjectTitle>
          <S.ProjectMeta>
            <S.MetaItem>
              <S.MetaLabel>Organization:</S.MetaLabel>
              <S.MetaValue>{organizationName}</S.MetaValue>
            </S.MetaItem>
            <S.MetaItem>
              <S.MetaLabel>Project ID:</S.MetaLabel>
              <S.MetaValue>{projectId}</S.MetaValue>
            </S.MetaItem>
          </S.ProjectMeta>
        </S.ProjectHeader>

        <S.KanbanMetrics>
          <S.MetricCard>
            <S.MetricValue>{metrics.throughput}</S.MetricValue>
            <S.MetricLabel>Throughput</S.MetricLabel>
          </S.MetricCard>
          <S.MetricCard>
            <S.MetricValue>{metrics.wip}</S.MetricValue>
            <S.MetricLabel>Work in Progress</S.MetricLabel>
          </S.MetricCard>
          <S.MetricCard>
            <S.MetricValue>{metrics.blocked}</S.MetricValue>
            <S.MetricLabel>Blocked</S.MetricLabel>
          </S.MetricCard>
          <S.MetricCard>
            <S.MetricValue>{metrics.flowEfficiency}%</S.MetricValue>
            <S.MetricLabel>Flow Efficiency</S.MetricLabel>
          </S.MetricCard>
        </S.KanbanMetrics>
      </S.KanbanBoardHeader>

      <S.KanbanBoardContent>
        <S.BoardControls>
          <S.ControlsTitle>
            <S.SectionIcon>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
              </svg>
            </S.SectionIcon>
            <span>Kanban Board</span>
          </S.ControlsTitle>
          <S.ActionButton onClick={handleCreateColumn}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Column
          </S.ActionButton>
        </S.BoardControls>

        <DragDropContext onDragEnd={handleDragEnd} children={undefined}>
          <S.ColumnsContainer>
            
          </S.ColumnsContainer>

        </DragDropContext>

        <S.FlowMetricsSection>
          <S.SectionTitle>
            <S.SectionIcon>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            </S.SectionIcon>
            <span>Flow Metrics</span>
          </S.SectionTitle>
          
          <S.MetricsGrid>
            <S.FlowMetricCard>
              <S.FlowMetricTitle>Cumulative Flow Diagram</S.FlowMetricTitle>
              <S.FlowMetricValue>Coming Soon</S.FlowMetricValue>
              <S.FlowMetricDescription>
                Visualize work progression over time
              </S.FlowMetricDescription>
            </S.FlowMetricCard>
            
            <S.FlowMetricCard>
              <S.FlowMetricTitle>Lead Time</S.FlowMetricTitle>
              <S.FlowMetricValue>14 days</S.FlowMetricValue>
              <S.FlowMetricDescription>
                Average time from start to completion
              </S.FlowMetricDescription>
            </S.FlowMetricCard>
            
            <S.FlowMetricCard>
              <S.FlowMetricTitle>Cycle Time</S.FlowMetricTitle>
              <S.FlowMetricValue>8 days</S.FlowMetricValue>
              <S.FlowMetricDescription>
                Average time in active work
              </S.FlowMetricDescription>
            </S.FlowMetricCard>
          </S.MetricsGrid>
        </S.FlowMetricsSection>
      </S.KanbanBoardContent>
    </S.KanbanBoardContainer>
  );
};

export default BoardKanban;