import styled from 'styled-components';

interface SprintStatusProps {
  $status: 'planning' | 'active' | 'completed';
}

interface ItemPriorityProps {
  $priority: 'low' | 'medium' | 'high' | 'critical';
}

interface ItemStatusProps {
  $status: string;
}

export const ScrumBoardContainer = styled.div`
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

export const ScrumBoardHeader = styled.div`
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
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

export const AgileMethodBadge = styled.span<{ $method: string }>`
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
`;

export const MetaValue = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
`;

export const ScrumMetrics = styled.div`
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

export const ScrumBoardContent = styled.div`
  padding: 24px;
  display: grid;
  gap: 32px;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const SectionTitle = styled.div`
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
    color: #3498db;
  }
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #3498db;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background: #2980b9;
    transform: translateY(-2px);
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

export const SprintsSection = styled.section``;

export const SprintsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
`;

export const SprintCard = styled.div<SprintStatusProps>`
  background: white;
  border: 2px solid ${props => {
    switch(props.$status) {
      case 'active': return '#2ecc71';
      case 'completed': return '#3498db';
      default: return '#f39c12';
    }
  }};
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const SprintHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const SprintName = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
`;

export const SprintStatus = styled.span<SprintStatusProps>`
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  background: ${props => {
    switch(props.$status) {
      case 'active': return 'rgba(46, 204, 113, 0.1)';
      case 'completed': return 'rgba(52, 152, 219, 0.1)';
      default: return 'rgba(243, 156, 18, 0.1)';
    }
  }};
  color: ${props => {
    switch(props.$status) {
      case 'active': return '#27ae60';
      case 'completed': return '#3498db';
      default: return '#f39c12';
    }
  }};
`;

export const SprintDates = styled.div`
  display: grid;
  gap: 6px;
  margin-bottom: 12px;
`;

export const DateItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DateLabel = styled.span`
  font-size: 0.85rem;
  color: #7f8c8d;
  font-weight: 500;
`;

export const DateValue = styled.span`
  font-size: 0.9rem;
  color: #2c3e50;
  font-weight: 600;
`;

export const SprintGoal = styled.p`
  margin: 12px 0 0 0;
  padding-top: 12px;
  border-top: 1px solid #f1f1f1;
  font-size: 0.9rem;
  color: #7f8c8d;
  font-style: italic;
`;

export const BacklogSection = styled.section``;

export const BacklogItems = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
`;

export const BacklogItem = styled.div<ItemPriorityProps>`
  background: white;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-left: 4px solid ${props => {
    switch(props.$priority) {
      case 'critical': return '#e74c3c';
      case 'high': return '#e67e22';
      case 'medium': return '#f39c12';
      default: return '#3498db';
    }
  }};
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
`;

export const ItemTitle = styled.h4`
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #2c3e50;
  flex: 1;
`;

export const ItemPoints = styled.span`
  background: #9b59b6;
  color: white;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  margin-left: 10px;
`;

export const ItemDescription = styled.p`
  margin: 0 0 12px 0;
  font-size: 0.9rem;
  color: #7f8c8d;
  line-height: 1.5;
`;

export const ItemFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StatusBadge = styled.span<ItemStatusProps>`
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => {
    switch(props.$status) {
      case 'done': return 'rgba(46, 204, 113, 0.1)';
      case 'inProgress': return 'rgba(52, 152, 219, 0.1)';
      case 'review': return 'rgba(155, 89, 182, 0.1)';
      case 'todo': return 'rgba(243, 156, 18, 0.1)';
      default: return 'rgba(127, 140, 141, 0.1)';
    }
  }};
  color: ${props => {
    switch(props.$status) {
      case 'done': return '#27ae60';
      case 'inProgress': return '#3498db';
      case 'review': return '#9b59b6';
      case 'todo': return '#f39c12';
      default: return '#7f8c8d';
    }
  }};
`;

export const PriorityBadge = styled.span<ItemPriorityProps>`
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => {
    switch(props.$priority) {
      case 'critical': return 'rgba(231, 76, 60, 0.1)';
      case 'high': return 'rgba(230, 126, 34, 0.1)';
      case 'medium': return 'rgba(243, 156, 18, 0.1)';
      default: return 'rgba(52, 152, 219, 0.1)';
    }
  }};
  color: ${props => {
    switch(props.$priority) {
      case 'critical': return '#e74c3c';
      case 'high': return '#e67e22';
      case 'medium': return '#f39c12';
      default: return '#3498db';
    }
  }};
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