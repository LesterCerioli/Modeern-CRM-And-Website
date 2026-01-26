'use client';

import { useState } from 'react';
import * as S from './styles';
import { BoardTemplateProps, SAFEBoardData, ProgramIncrement, AgileReleaseTrain, Feature } from '@/interfaces/board.types';

interface BoardSAFeProps extends BoardTemplateProps {
  initialData?: SAFEBoardData;
}

const BoardSAFe: React.FC<BoardSAFeProps> = ({
  projectId,
  projectName,
  projectCode,
  organizationName,
  initialData
}) => {
  const [programIncrements, setProgramIncrements] = useState<ProgramIncrement[]>(
    initialData?.programIncrements || []
  );
  const [agileReleaseTrains, setAgileReleaseTrains] = useState<AgileReleaseTrain[]>(
    initialData?.agileReleaseTrains || []
  );
  const [features, setFeatures] = useState<Feature[]>(
    initialData?.features || []
  );

  const handleCreateProgramIncrement = () => {
    const newPI: ProgramIncrement = {
      id: `pi-${Date.now()}`,
      name: `PI ${programIncrements.length + 1}`,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'planning',
      objectives: ['Define strategic objectives for this PI']
    };
    setProgramIncrements([...programIncrements, newPI]);
  };

  const handleCreateAgileReleaseTrain = () => {
    const newTrain: AgileReleaseTrain = {
      id: `train-${Date.now()}`,
      name: `ART ${String.fromCharCode(65 + agileReleaseTrains.length)}`,
      teamCount: 5,
      velocity: 100,
      predictability: 85
    };
    setAgileReleaseTrains([...agileReleaseTrains, newTrain]);
  };

  const handleCreateFeature = () => {
    const newFeature: Feature = {
      id: `feature-${Date.now()}`,
      name: 'New Feature',
      description: 'Feature description',
      businessValue: 50,
      status: 'funnel',
      programIncrementId: programIncrements[0]?.id || '',
      trainId: agileReleaseTrains[0]?.id || ''
    };
    setFeatures([...features, newFeature]);
  };

  return (
    <S.SafeBoardContainer>
      <S.SafeBoardHeader>
        <S.ProjectHeader>
          <S.ProjectTitle>
            <S.AgileMethodBadge>
                SAFe
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

        <S.FrameworkBadge>
          <S.FrameworkIcon>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </S.FrameworkIcon>
          SAFe 6.0 Framework
        </S.FrameworkBadge>
      </S.SafeBoardHeader>

      <S.SafeMetrics>
        <S.MetricCard>
          <S.MetricValue>{programIncrements.length}</S.MetricValue>
          <S.MetricLabel>Program Increments</S.MetricLabel>
        </S.MetricCard>
        <S.MetricCard>
          <S.MetricValue>{agileReleaseTrains.length}</S.MetricValue>
          <S.MetricLabel>Agile Release Trains</S.MetricLabel>
        </S.MetricCard>
        <S.MetricCard>
          <S.MetricValue>{features.length}</S.MetricValue>
          <S.MetricLabel>Features</S.MetricLabel>
        </S.MetricCard>
        <S.MetricCard>
          <S.MetricValue>
            {agileReleaseTrains.reduce((acc, train) => acc + train.teamCount, 0)}
          </S.MetricValue>
          <S.MetricLabel>Total Teams</S.MetricLabel>
        </S.MetricCard>
      </S.SafeMetrics>

      <S.SafeBoardContent>
        <S.ProgramIncrementsSection>
          <S.SectionHeader>
            <S.SectionTitle>
              <S.SectionIcon>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </S.SectionIcon>
              <span>Program Increments (PIs)</span>
            </S.SectionTitle>
            <S.ActionButton onClick={handleCreateProgramIncrement}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              New PI
            </S.ActionButton>
          </S.SectionHeader>

          {programIncrements.length === 0 ? (
            <S.EmptyState>
              <S.EmptyStateIcon>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </S.EmptyStateIcon>
              <S.EmptyStateMessage>No Program Increments planned</S.EmptyStateMessage>
              <S.EmptyStateDescription>
                Create your first Program Increment to start planning at scale
              </S.EmptyStateDescription>
            </S.EmptyState>
          ) : (
            <S.PIList>
              {programIncrements.map(pi => (
                <S.PICard key={pi.id} $status={pi.status}>
                  <S.PIHeader>
                    <S.PIName>{pi.name}</S.PIName>
                    <S.PIStatus $status={pi.status}>
                      {pi.status}
                    </S.PIStatus>
                  </S.PIHeader>
                  <S.PITimeline>
                    <S.TimelineItem>
                      <S.TimelineLabel>Start:</S.TimelineLabel>
                      <S.TimelineValue>{pi.startDate}</S.TimelineValue>
                    </S.TimelineItem>
                    <S.TimelineItem>
                      <S.TimelineLabel>End:</S.TimelineLabel>
                      <S.TimelineValue>{pi.endDate}</S.TimelineValue>
                    </S.TimelineItem>
                  </S.PITimeline>
                  <S.PIObjectives>
                    <S.ObjectivesTitle>Objectives:</S.ObjectivesTitle>
                    <S.ObjectivesList>
                      {pi.objectives.map((objective, index) => (
                        <S.ObjectiveItem key={index}>
                          {objective}
                        </S.ObjectiveItem>
                      ))}
                    </S.ObjectivesList>
                  </S.PIObjectives>
                </S.PICard>
              ))}
            </S.PIList>
          )}
        </S.ProgramIncrementsSection>

        <S.TrainsSection>
          <S.SectionHeader>
            <S.SectionTitle>
              <S.SectionIcon>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </S.SectionIcon>
              <span>Agile Release Trains (ARTs)</span>
            </S.SectionTitle>
            <S.ActionButton onClick={handleCreateAgileReleaseTrain}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              New ART
            </S.ActionButton>
          </S.SectionHeader>

          {agileReleaseTrains.length === 0 ? (
            <S.EmptyState>
              <S.EmptyStateIcon>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </S.EmptyStateIcon>
              <S.EmptyStateMessage>No Agile Release Trains configured</S.EmptyStateMessage>
              <S.EmptyStateDescription>
                Create an Agile Release Train to organize teams and value streams
              </S.EmptyStateDescription>
            </S.EmptyState>
          ) : (
            <S.TrainsGrid>
              {agileReleaseTrains.map(train => (
                <S.TrainCard key={train.id}>
                  <S.TrainHeader>
                    <S.TrainName>{train.name}</S.TrainName>
                    <S.TrainStats>
                      <S.StatBadge>
                        <S.StatValue>{train.teamCount}</S.StatValue>
                        <S.StatLabel>Teams</S.StatLabel>
                      </S.StatBadge>
                    </S.TrainStats>
                  </S.TrainHeader>
                  <S.TrainMetrics>
                    <S.MetricItem>
                      <S.MetricItemLabel>Velocity:</S.MetricItemLabel>
                      <S.MetricItemValue>{train.velocity} pts</S.MetricItemValue>
                    </S.MetricItem>
                    <S.MetricItem>
                      <S.MetricItemLabel>Predictability:</S.MetricItemLabel>
                      <S.MetricItemValue>{train.predictability}%</S.MetricItemValue>
                    </S.MetricItem>
                  </S.TrainMetrics>
                </S.TrainCard>
              ))}
            </S.TrainsGrid>
          )}
        </S.TrainsSection>

        <S.FeaturesSection>
          <S.SectionHeader>
            <S.SectionTitle>
              <S.SectionIcon>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </S.SectionIcon>
              <span>Features</span>
            </S.SectionTitle>
            <S.ActionButton onClick={handleCreateFeature}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              New Feature
            </S.ActionButton>
          </S.SectionHeader>

          {features.length === 0 ? (
            <S.EmptyState>
              <S.EmptyStateIcon>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </S.EmptyStateIcon>
              <S.EmptyStateMessage>No Features defined</S.EmptyStateMessage>
              <S.EmptyStateDescription>
                Create Features to deliver value to customers
              </S.EmptyStateDescription>
            </S.EmptyState>
          ) : (
            <S.FeaturesTable>
              <S.TableHeader>
                <S.TableHeaderCell>Feature</S.TableHeaderCell>
                <S.TableHeaderCell>Business Value</S.TableHeaderCell>
                <S.TableHeaderCell>Status</S.TableHeaderCell>
                <S.TableHeaderCell>ART</S.TableHeaderCell>
              </S.TableHeader>
              <S.TableBody>
                {features.map(feature => (
                  <S.TableRow key={feature.id}>
                    <S.TableCell>
                      <S.FeatureName>{feature.name}</S.FeatureName>
                      <S.FeatureDescription>{feature.description}</S.FeatureDescription>
                    </S.TableCell>
                    <S.TableCell>
                      <S.BusinessValue>{feature.businessValue}</S.BusinessValue>
                    </S.TableCell>
                    <S.TableCell>
                      <S.FeatureStatus $status={feature.status}>
                        {feature.status}
                      </S.FeatureStatus>
                    </S.TableCell>
                    <S.TableCell>
                      <S.ARTBadge>
                        ART {feature.trainId?.slice(-1) || 'A'}
                      </S.ARTBadge>
                    </S.TableCell>
                  </S.TableRow>
                ))}
              </S.TableBody>
            </S.FeaturesTable>
          )}
        </S.FeaturesSection>
      </S.SafeBoardContent>
    </S.SafeBoardContainer>
  );
};

export default BoardSAFe;