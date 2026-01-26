import styled from 'styled-components';

interface PIStatusProps {
  $status: 'planning' | 'executing' | 'completed';
}

interface FeatureStatusProps {
  $status: string;
}

export const SafeBoardContainer = styled.div`
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

export const SafeBoardHeader = styled.div`
  background: linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%);
  padding: 24px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

export const ProjectHeader = styled.div`
  flex: 1;
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
  margin-top: 12px;
  max-width: 300px;
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

export const FrameworkBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 12px 16px;
  backdrop-filter: blur(10px);
  font-weight: 600;
  font-size: 0.9rem;
`;

export const FrameworkIcon = styled.div`
  svg {
    width: 20px;
    height: 20px;
  }
`;

export const SafeMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  padding: 20px 24px;
  background: #f8f9fa;
  border-bottom: 1px solid #e1e5e9;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const MetricCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 16px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #e1e5e9;
`;

export const MetricValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 4px;
  color: #9b59b6;
`;

export const MetricLabel = styled.div`
  font-size: 0.85rem;
  color: #7f8c8d;
  font-weight: 500;
`;

export const SafeBoardContent = styled.div`
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
    color: #9b59b6;
  }
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #9b59b6;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background: #8e44ad;
    transform: translateY(-2px);
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

export const ProgramIncrementsSection = styled.section``;

export const PIList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
`;

export const PICard = styled.div<PIStatusProps>`
  background: white;
  border: 2px solid ${props => {
    switch(props.$status) {
      case 'executing': return '#2ecc71';
      case 'completed': return '#3498db';
      default: return '#f39c12';
    }
  }};
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
`;

export const PIHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const PIName = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
`;

export const PIStatus = styled.span<PIStatusProps>`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  background: ${props => {
    switch(props.$status) {
      case 'executing': return 'rgba(46, 204, 113, 0.1)';
      case 'completed': return 'rgba(52, 152, 219, 0.1)';
      default: return 'rgba(243, 156, 18, 0.1)';
    }
  }};
  color: ${props => {
    switch(props.$status) {
      case 'executing': return '#27ae60';
      case 'completed': return '#3498db';
      default: return '#f39c12';
    }
  }};
`;

export const PITimeline = styled.div`
  display: grid;
  gap: 8px;
  margin-bottom: 16px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
`;

export const TimelineItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TimelineLabel = styled.span`
  font-size: 0.85rem;
  color: #7f8c8d;
  font-weight: 500;
`;

export const TimelineValue = styled.span`
  font-size: 0.9rem;
  color: #2c3e50;
  font-weight: 600;
`;

export const PIObjectives = styled.div`
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #f1f1f1;
`;

export const ObjectivesTitle = styled.h4`
  margin: 0 0 8px 0;
  font-size: 0.9rem;
  color: #7f8c8d;
  font-weight: 600;
  text-transform: uppercase;
`;

export const ObjectivesList = styled.ul`
  margin: 0;
  padding-left: 20px;
`;

export const ObjectiveItem = styled.li`
  font-size: 0.9rem;
  color: #2c3e50;
  margin-bottom: 4px;
  line-height: 1.4;
`;

export const TrainsSection = styled.section``;

export const TrainsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
`;

export const TrainCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid #e1e5e9;
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    border-color: #9b59b6;
  }
`;

export const TrainHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const TrainName = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
`;

export const TrainStats = styled.div``;

export const StatBadge = styled.div`
  background: #f1f1f1;
  border-radius: 20px;
  padding: 6px 12px;
  text-align: center;
`;

export const StatValue = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: #9b59b6;
`;

export const StatLabel = styled.div`
  font-size: 0.7rem;
  color: #7f8c8d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const TrainMetrics = styled.div`
  display: grid;
  gap: 12px;
`;

export const MetricItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #f1f1f1;
  
  &:last-child {
    border-bottom: none;
  }
`;

export const MetricItemLabel = styled.span`
  font-size: 0.85rem;
  color: #7f8c8d;
  font-weight: 500;
`;

export const MetricItemValue = styled.span`
  font-size: 0.9rem;
  color: #2c3e50;
  font-weight: 600;
`;

export const FeaturesSection = styled.section``;

export const FeaturesTable = styled.div`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid #e1e5e9;
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  background: #f8f9fa;
  padding: 16px 20px;
  border-bottom: 1px solid #e1e5e9;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

export const TableHeaderCell = styled.div`
  font-size: 0.85rem;
  font-weight: 600;
  color: #7f8c8d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const TableBody = styled.div``;

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  padding: 16px 20px;
  border-bottom: 1px solid #f1f1f1;
  transition: background 0.2s;
  
  &:hover {
    background: #f8f9fa;
  }
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 20px;
  }
`;

export const TableCell = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const FeatureName = styled.div`
  font-size: 0.95rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 4px;
`;

export const FeatureDescription = styled.div`
  font-size: 0.85rem;
  color: #7f8c8d;
  line-height: 1.4;
`;

export const BusinessValue = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: #27ae60;
`;

export const FeatureStatus = styled.span<FeatureStatusProps>`
  display: inline-block;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  background: ${props => {
    switch(props.$status) {
      case 'implementing': return 'rgba(46, 204, 113, 0.1)';
      case 'analyzing': return 'rgba(52, 152, 219, 0.1)';
      case 'backlog': return 'rgba(243, 156, 18, 0.1)';
      case 'funnel': return 'rgba(155, 89, 182, 0.1)';
      case 'done': return 'rgba(127, 140, 141, 0.1)';
      default: return 'rgba(127, 140, 141, 0.1)';
    }
  }};
  color: ${props => {
    switch(props.$status) {
      case 'implementing': return '#27ae60';
      case 'analyzing': return '#3498db';
      case 'backlog': return '#f39c12';
      case 'funnel': return '#9b59b6';
      case 'done': return '#7f8c8d';
      default: return '#7f8c8d';
    }
  }};
`;

export const ARTBadge = styled.span`
  display: inline-block;
  padding: 6px 12px;
  background: rgba(155, 89, 182, 0.1);
  border: 1px solid rgba(155, 89, 182, 0.2);
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #9b59b6;
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