import styled from 'styled-components';

interface ColumnProps {
  $color: string;
  $isDraggingOver: boolean;
}

interface CardProps {
  $isDragging: boolean;
  $blocked: boolean;
  $size: 'xs' | 's' | 'm' | 'l' | 'xl';
}

interface BlockButtonProps {
  $blocked: boolean;
}

interface WIPLimitProps {
  $status: 'under' | 'at' | 'over';
}

interface SizeBadgeProps {
  $size: 'xs' | 's' | 'm' | 'l' | 'xl';
}

export const KanbanBoardContainer = styled.div`
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

export const KanbanBoardHeader = styled.div`
  background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
  padding: 24px;
  color: white;
`;

export const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

export const ProjectTitle = styled.div`
  h2 {
    margin: 8px 0 4px 0;
    font-size: 1.75rem;
    font-weight: 700;
    color: white;
  }
`;

export const AgileMethodBadge = styled.span`
  display: inline-block;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: white;
`;

export const ProjectCode = styled.span`
  display: inline-block;
  padding: 4px 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-left: 12px;
`;

export const ProjectMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: rgba(255, 255, 255, 0.1);
  padding: 12px 16px;
  border-radius: 8px;
  backdrop-filter: blur(10px);
`;

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const MetaLabel = styled.span`
  font-size: 0.85rem;
  opacity: 0.9;
  font-weight: 500;
  flex-shrink: 0;
`;

export const MetaValue = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const KanbanMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const MetricCard = styled.div`
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 16px;
  text-align: center;
  backdrop-filter: blur(10px);
`;

export const MetricValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 4px;
  color: white;
`;

export const MetricLabel = styled.div`
  font-size: 0.85rem;
  opacity: 0.9;
  font-weight: 500;
`;

export const KanbanBoardContent = styled.div`
  padding: 24px;
`;

export const BoardControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const ControlsTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  
  span {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2c3e50;
  }
`;

export const SectionIcon = styled.div`
  svg {
    width: 20px;
    height: 20px;
    color: #2ecc71;
  }
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #2ecc71;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background: #27ae60;
    transform: translateY(-2px);
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

export const ColumnsContainer = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding: 8px 0 24px 0;
  min-height: 600px;
  
  &::-webkit-scrollbar {
    height: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #bdc3c7;
    border-radius: 4px;
  }
`;

export const Column = styled.div<ColumnProps>`
  flex: 0 0 320px;
  display: flex;
  flex-direction: column;
  background: ${props => props.$isDraggingOver ? `${props.$color}15` : '#f8f9fa'};
  border-radius: 10px;
  border: 2px solid ${props => props.$color};
  min-height: 500px;
  transition: all 0.3s;
`;

export const ColumnHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: white;
  border-bottom: 1px solid #e1e5e9;
  border-radius: 8px 8px 0 0;
`;

export const ColumnTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  font-weight: 600;
  color: #2c3e50;
`;

export const ColumnColor = styled.div<{ $color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.$color};
`;

export const ColumnStats = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CardCount = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: #2c3e50;
`;

export const WIPLimit = styled.span<WIPLimitProps>`
  font-size: 0.75rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 12px;
  background: ${props => {
    switch(props.$status) {
      case 'over': return 'rgba(231, 76, 60, 0.1)';
      case 'at': return 'rgba(243, 156, 18, 0.1)';
      default: return 'rgba(46, 204, 113, 0.1)';
    }
  }};
  color: ${props => {
    switch(props.$status) {
      case 'over': return '#e74c3c';
      case 'at': return '#f39c12';
      default: return '#27ae60';
    }
  }};
  border: 1px solid ${props => {
    switch(props.$status) {
      case 'over': return 'rgba(231, 76, 60, 0.2)';
      case 'at': return 'rgba(243, 156, 18, 0.2)';
      default: return 'rgba(46, 204, 113, 0.2)';
    }
  }};
`;

export const CardsList = styled.div`
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
`;

export const Card = styled.div<CardProps>`
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-left: 4px solid ${props => props.$blocked ? '#e74c3c' : '#2ecc71'};
  opacity: ${props => props.$blocked ? 0.7 : 1};
  transform: ${props => props.$isDragging ? 'rotate(3deg)' : 'none'};
  transition: all 0.3s;
  cursor: grab;
  min-height: ${props => {
    switch(props.$size) {
      case 'xl': return '160px';
      case 'l': return '120px';
      case 'm': return '100px';
      case 's': return '80px';
      default: return '60px';
    }
  }};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    cursor: grabbing;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

export const CardTitle = styled.h4`
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: #2c3e50;
  flex: 1;
`;

export const CardActions = styled.div`
  display: flex;
  gap: 4px;
`;

export const BlockButton = styled.button<BlockButtonProps>`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s;
  opacity: ${props => props.$blocked ? 1 : 0.6};
  
  &:hover {
    background: rgba(0, 0, 0, 0.05);
    opacity: 1;
  }
`;

export const CardDescription = styled.p`
  margin: 0 0 12px 0;
  font-size: 0.85rem;
  color: #7f8c8d;
  line-height: 1.4;
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SizeBadge = styled.span<SizeBadgeProps>`
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  background: ${props => {
    switch(props.$size) {
      case 'xl': return 'rgba(231, 76, 60, 0.1)';
      case 'l': return 'rgba(230, 126, 34, 0.1)';
      case 'm': return 'rgba(243, 156, 18, 0.1)';
      case 's': return 'rgba(52, 152, 219, 0.1)';
      default: return 'rgba(155, 89, 182, 0.1)';
    }
  }};
  color: ${props => {
    switch(props.$size) {
      case 'xl': return '#e74c3c';
      case 'l': return '#e67e22';
      case 'm': return '#f39c12';
      case 's': return '#3498db';
      default: return '#9b59b6';
    }
  }};
`;

export const AssigneeBadge = styled.span`
  font-size: 0.75rem;
  padding: 2px 8px;
  background: #f1f1f1;
  border-radius: 12px;
  color: #7f8c8d;
  font-weight: 500;
`;

export const AddCardButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px;
  background: transparent;
  border: 2px dashed #bdc3c7;
  border-radius: 0 0 8px 8px;
  color: #7f8c8d;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background: rgba(0, 0, 0, 0.02);
    border-color: #95a5a6;
    color: #2c3e50;
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

export const FlowMetricsSection = styled.section`
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #e1e5e9;
`;

export const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  
  span {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2c3e50;
  }
`;

export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

export const FlowMetricCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid #e1e5e9;
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
`;

export const FlowMetricTitle = styled.h4`
  margin: 0 0 8px 0;
  font-size: 1rem;
  font-weight: 600;
  color: #2c3e50;
`;

export const FlowMetricValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2ecc71;
  margin-bottom: 8px;
`;

export const FlowMetricDescription = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: #7f8c8d;
  line-height: 1.4;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 48px 24px;
  background: #f8f9fa;
  border-radius: 10px;
  border: 2px dashed #e1e5e9;
`;

export const EmptyStateIcon = styled.div`
  margin-bottom: 16px;
  
  svg {
    width: 48px;
    height: 48px;
    color: #bdc3c7;
  }
`;

export const EmptyStateMessage = styled.h4`
  margin: 0 0 8px 0;
  font-size: 1.1rem;
  color: #7f8c8d;
  font-weight: 600;
`;

export const EmptyStateDescription = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #95a5a6;
  max-width: 400px;
  margin: 0 auto;
`;

// Add this namespace export at the end:
export const S = {
  KanbanBoardContainer,
  KanbanBoardHeader,
  ProjectHeader,
  ProjectTitle,
  AgileMethodBadge,
  ProjectCode,
  ProjectMeta,
  MetaItem,
  MetaLabel,
  MetaValue,
  KanbanMetrics,
  MetricCard,
  MetricValue,
  MetricLabel,
  KanbanBoardContent,
  BoardControls,
  ControlsTitle,
  SectionIcon,
  ActionButton,
  ColumnsContainer,
  Column,
  ColumnHeader,
  ColumnTitle,
  ColumnColor,
  ColumnStats,
  CardCount,
  WIPLimit,
  CardsList,
  Card,
  CardHeader,
  CardTitle,
  CardActions,
  BlockButton,
  CardDescription,
  CardFooter,
  SizeBadge,
  AssigneeBadge,
  AddCardButton,
  FlowMetricsSection,
  SectionTitle,
  MetricsGrid,
  FlowMetricCard,
  FlowMetricTitle,
  FlowMetricValue,
  FlowMetricDescription,
  EmptyState,
  EmptyStateIcon,
  EmptyStateMessage,
  EmptyStateDescription
};