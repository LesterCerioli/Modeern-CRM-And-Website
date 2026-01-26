

export interface BoardTemplateProps {
    projectId: string;
    projectName: string;
    projectCode: string;
    organizationName: string;
}
export interface ScrumBoardData {
  sprints: Sprint[];
  backlogItems: BacklogItem[];
  teamVelocity: number;
  sprintProgress: number;
}

export interface SAFEBoardData {
  programIncrements: ProgramIncrement[];
  agileReleaseTrains: AgileReleaseTrain[];
  features: Feature[];
}

export interface KanbanBoardData {
  columns: KanbanColumn[];
  cards: KanbanCard[];
  wipLimits: WIPLimit[];
}

// Common interfaces
export interface Sprint {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'planning' | 'active' | 'completed';
  goal?: string;
  velocity?: number;
}

export interface BacklogItem {
  id: string;
  title: string;
  description: string;
  storyPoints: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'backlog' | 'todo' | 'inProgress' | 'review' | 'done';
  assignee?: string;
  sprintId?: string;
}

export interface ProgramIncrement {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'planning' | 'executing' | 'completed';
  objectives: string[];
}

export interface AgileReleaseTrain {
  id: string;
  name: string;
  teamCount: number;
  velocity: number;
  predictability: number;
}

export interface Feature {
  id: string;
  name: string;
  description: string;
  businessValue: number;
  status: 'funnel' | 'analyzing' | 'backlog' | 'implementing' | 'done';
  programIncrementId: string;
  trainId?: string;
}

export interface KanbanColumn {
  id: string;
  name: string;
  position: number;
  wipLimit?: number;
  color: string;
}

export interface KanbanCard {
  id: string;
  title: string;
  description: string;
  columnId: string;
  position: number;
  size: 'xs' | 's' | 'm' | 'l' | 'xl';
  blocked: boolean;
  assignee?: string;
}

export interface WIPLimit {
  columnId: string;
  current: number;
  limit: number;
}