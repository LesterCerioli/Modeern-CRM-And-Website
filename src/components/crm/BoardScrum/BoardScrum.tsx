'use client';

import { useState } from 'react';
import * as S from './styles';
import { BoardTemplateProps, ScrumBoardData, Sprint, BacklogItem } from '@/interfaces/board.types';

interface BoardScrumProps extends BoardTemplateProps {
  initialData?: ScrumBoardData;
}

const BoardScrum: React.FC<BoardScrumProps> = ({
  projectId,
  projectName,
  projectCode,
  organizationName,
  initialData
}) => {
  const [sprints, setSprints] = useState<Sprint[]>(
    initialData?.sprints || []
  );
  const [backlogItems, setBacklogItems] = useState<BacklogItem[]>(
    initialData?.backlogItems || []
  );
  const [teamVelocity] = useState<number>(initialData?.teamVelocity || 0);
  const [sprintProgress] = useState<number>(initialData?.sprintProgress || 0);

  const handleCreateSprint = () => {
    const newSprint: Sprint = {
      id: `sprint-${Date.now()}`,
      name: `Sprint ${sprints.length + 1}`,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'planning',
      goal: '',
      velocity: 0
    };
    setSprints([...sprints, newSprint]);
  };

  const handleCreateBacklogItem = () => {
    const newItem: BacklogItem = {
      id: `item-${Date.now()}`,
      title: 'New Backlog Item',
      description: 'Add description here',
      storyPoints: 3,
      priority: 'medium',
      status: 'backlog'
    };
    setBacklogItems([...backlogItems, newItem]);
  };

  const handleUpdateItemStatus = (itemId: string, newStatus: BacklogItem['status']) => {
    setBacklogItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, status: newStatus } : item
      )
    );
  };

  return (
    <S.ScrumBoardContainer>
      <S.ScrumBoardHeader>
        <S.ProjectHeader>
          <S.ProjectTitle>
            <S.AgileMethodBadge $method="scrum">
              Scrum
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

        <S.ScrumMetrics>
          <S.MetricCard>
            <S.MetricValue>{teamVelocity}</S.MetricValue>
            <S.MetricLabel>Team Velocity</S.MetricLabel>
          </S.MetricCard>
          <S.MetricCard>
            <S.MetricValue>{sprintProgress}%</S.MetricValue>
            <S.MetricLabel>Sprint Progress</S.MetricLabel>
          </S.MetricCard>
          <S.MetricCard>
            <S.MetricValue>{sprints.filter(s => s.status === 'active').length}</S.MetricValue>
            <S.MetricLabel>Active Sprints</S.MetricLabel>
          </S.MetricCard>
          <S.MetricCard>
            <S.MetricValue>{backlogItems.length}</S.MetricValue>
            <S.MetricLabel>Backlog Items</S.MetricLabel>
          </S.MetricCard>
        </S.ScrumMetrics>
      </S.ScrumBoardHeader>

      <S.ScrumBoardContent>
        <S.SprintsSection>
          <S.SectionHeader>
            <S.SectionTitle>
              <S.SectionIcon>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </S.SectionIcon>
              <span>Sprints</span>
            </S.SectionTitle>
            <S.ActionButton onClick={handleCreateSprint}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              New Sprint
            </S.ActionButton>
          </S.SectionHeader>

          {sprints.length === 0 ? (
            <S.EmptyState>
              <S.EmptyStateIcon>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a22 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </S.EmptyStateIcon>
              <S.EmptyStateMessage>No sprints created yet</S.EmptyStateMessage>
              <S.EmptyStateDescription>
                Create your first sprint to start planning your work
              </S.EmptyStateDescription>
            </S.EmptyState>
          ) : (
            <S.SprintsList>
              {sprints.map(sprint => (
                <S.SprintCard key={sprint.id} $status={sprint.status}>
                  <S.SprintHeader>
                    <S.SprintName>{sprint.name}</S.SprintName>
                    <S.SprintStatus $status={sprint.status}>
                      {sprint.status}
                    </S.SprintStatus>
                  </S.SprintHeader>
                  <S.SprintDates>
                    <S.DateItem>
                      <S.DateLabel>Start:</S.DateLabel>
                      <S.DateValue>{sprint.startDate}</S.DateValue>
                    </S.DateItem>
                    <S.DateItem>
                      <S.DateLabel>End:</S.DateLabel>
                      <S.DateValue>{sprint.endDate}</S.DateValue>
                    </S.DateItem>
                  </S.SprintDates>
                  {sprint.goal && (
                    <S.SprintGoal>{sprint.goal}</S.SprintGoal>
                  )}
                </S.SprintCard>
              ))}
            </S.SprintsList>
          )}
        </S.SprintsSection>

        <S.BacklogSection>
          <S.SectionHeader>
            <S.SectionTitle>
              <S.SectionIcon>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </S.SectionIcon>
              <span>Product Backlog</span>
            </S.SectionTitle>
            <S.ActionButton onClick={handleCreateBacklogItem}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Item
            </S.ActionButton>
          </S.SectionHeader>

          {backlogItems.length === 0 ? (
            <S.EmptyState>
              <S.EmptyStateIcon>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </S.EmptyStateIcon>
              <S.EmptyStateMessage>No backlog items yet</S.EmptyStateMessage>
              <S.EmptyStateDescription>
                Add items to your product backlog to start prioritizing work
              </S.EmptyStateDescription>
            </S.EmptyState>
          ) : (
            <S.BacklogItems>
              {backlogItems.map(item => (
                <S.BacklogItem key={item.id} $priority={item.priority}>
                  <S.ItemHeader>
                    <S.ItemTitle>{item.title}</S.ItemTitle>
                    <S.ItemPoints>{item.storyPoints} pts</S.ItemPoints>
                  </S.ItemHeader>
                  <S.ItemDescription>{item.description}</S.ItemDescription>
                  <S.ItemFooter>
                    <S.StatusBadge $status={item.status}>
                      {item.status}
                    </S.StatusBadge>
                    <S.PriorityBadge $priority={item.priority}>
                      {item.priority}
                    </S.PriorityBadge>
                  </S.ItemFooter>
                </S.BacklogItem>
              ))}
            </S.BacklogItems>
          )}
        </S.BacklogSection>
      </S.ScrumBoardContent>
    </S.ScrumBoardContainer>
  );
};

export default BoardScrum;