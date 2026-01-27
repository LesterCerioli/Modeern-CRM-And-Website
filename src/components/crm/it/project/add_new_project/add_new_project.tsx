'use client';

import { useState, useEffect, useCallback } from 'react';
import * as S from './styles';

interface ProjectFormData {
    projectName: string;
    agileMethodology: string;
    projectCode: string;
    organization: string;
    description: string;
    ownerUser: string;
}

interface ProjectResponse {
  id: string;
  organization_id: string;
  name: string;
  code: string;
  description: string;
  owner_id: string;
  owner_username: string;
  template_agile_method: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  settings: Record<string, any>;
}


interface RawProject {
  id: string;
  organization_id: string;
  name: string;
  code: string;
  description: string;
  owner_id: string;
  template_agile_method: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

interface RawProjectsResponse {
  success: boolean;
  count: number;
  total_count: number;
  projects: RawProject[];
  limit: number;
  offset: number;
  organization_name: string;
  include_deleted: boolean;
}

const ProjectForm: React.FC = () => {
    
    const [formData, setFormData] = useState<ProjectFormData>({
        projectName: '',
        agileMethodology: 'Scrum',
        projectCode: '',
        organization: 'Lucas Technology Service',
        description: '',
        ownerUser: 'lester.cerioli@lucastechnologyservice.com'
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [createdProjectDetails, setCreatedProjectDetails] = useState<{
        id: string;
        code: string;
        name: string;
    } | null>(null);

    
    const [projects, setProjects] = useState<RawProject[]>([]);
    const [loadingProjects, setLoadingProjects] = useState<boolean>(true);
    const [projectsError, setProjectsError] = useState<string | null>(null);
    const [includeDeleted, setIncludeDeleted] = useState<boolean>(false);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [organizationFilter, setOrganizationFilter] = useState<string>('all');

    
    const fetchProjects = useCallback(async () => {
        try {
            setProjectsError(null);
            
            const params = new URLSearchParams();
            if (includeDeleted) {
                params.append('include_deleted', 'true');
            }
            if (organizationFilter !== 'all') {
                params.append('organization_name', organizationFilter);
            }
            const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
            const apiUrl = `${apiBaseUrl}/api/projects/raw?${params.toString()}`;
            console.log('[ProjectForm] Fetching projects from:', apiUrl); // Para depuração
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`Failed to fetch projects: ${response.status}`);
            }
            const data: RawProjectsResponse = await response.json();
            if (data.success) {
                setProjects(data.projects);
            } else {
                throw new Error('Failed to fetch projects');
            }
        } catch (err) {
            setProjectsError(err instanceof Error ? err.message : 'Failed to load projects');
            console.error('[ProjectForm] Error fetching projects:', err);
        } finally {
            setLoadingProjects(false);
            setRefreshing(false);
        }
    }, [includeDeleted, organizationFilter]);

    
    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    // Recarregar projetos quando um novo projeto é criado
    useEffect(() => {
        if (submitSuccess) {
            fetchProjects();
        }
    }, [submitSuccess, fetchProjects]);

    // Funções do formulário (mantidas do código original)
    async function getJwtToken(): Promise<string> {
        const response = await fetch("/api/auth/token", {
            method: "POST",
        });

        if (!response.ok) {
            throw new Error("Failed to obtain JWT token");
        }

        const data = await response.json();
        return data.token || data.access_token;
    }

    async function createProjectWithJwt(jwt: string): Promise<ProjectResponse> {
        const response = await fetch("/api/projects", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                token: jwt,
                organization_name: formData.organization,
                name: formData.projectName,
                code: formData.projectCode,
                description: formData.description,
                owner_username: formData.ownerUser,
                template_agile_method: formData.agileMethodology,
                settings: {}
            }),
        });

        const data: ProjectResponse | { error: string } = await response
            .json()
            .catch(() => ({ error: "Internal error. Try again." }));

        if (!response.ok) {
            throw new Error((data as { error: string }).error || "Project creation failed");
        }

        return data as ProjectResponse;
    }

    const generateProjectCode = (projectName: string): string => {
        if (!projectName.trim()) return '';
        
        const cleanName = projectName
            .replace(/[^a-zA-Z\s]/g, '')
            .replace(/\s+/g, ' ')
            .trim()
            .toUpperCase();
        
        if (cleanName.replace(/\s/g, '').length >= 4) {
            const lettersOnly = cleanName.replace(/\s/g, '');
            const firstFourLetters = lettersOnly.substring(0, 4);
            
            const randomNumbers = Math.floor(Math.random() * 1000)
                .toString()
                .padStart(3, '0');
            
            return `${firstFourLetters}-${randomNumbers}`;
        }
        
        if (cleanName.length > 0) {
            let codeLetters = cleanName.replace(/\s/g, '');
            while (codeLetters.length < 4) {
                codeLetters += 'X';
            }
            const firstFourLetters = codeLetters.substring(0, 4);
            
            const randomNumbers = Math.floor(Math.random() * 1000)
                .toString()
                .padStart(3, '0');
            
            return `${firstFourLetters}-${randomNumbers}`;
        }
        
        return '';
    };

    useEffect(() => {
        if (formData.projectName.trim()) {
            const newCode = generateProjectCode(formData.projectName);
            setFormData(prev => ({ 
                ...prev, 
                projectCode: newCode 
            }));
        } else {
            setFormData(prev => ({ 
                ...prev, 
                projectCode: '' 
            }));
        }
    }, [formData.projectName]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        setSubmitError(null);
        setSubmitSuccess(false);
        setCreatedProjectDetails(null);
        
        if (!formData.projectName.trim() || !formData.projectCode.trim()) {
            setSubmitError("Project name and code are required");
            return;
        }

        setIsSubmitting(true);
        console.group("[ProjectForm] Project creation attempt");

        try {
            const jwt = await getJwtToken();
            const project = await createProjectWithJwt(jwt);
            
            setSubmitSuccess(true);
            setCreatedProjectDetails({
                id: project.id,
                code: project.code,
                name: project.name
            });
            
            handleReset();
            
        } catch (err) {
            const message = err instanceof Error ? err.message : "Internal error. Try again.";
            setSubmitError(message);
            
        } finally {
            setIsSubmitting(false);
            console.groupEnd();
        }
    };

    const handleReset = () => {
        setFormData({
            projectName: '',
            agileMethodology: 'Scrum',
            projectCode: '',
            organization: 'Lucas Technology Service',
            description: '',
            ownerUser: 'lester.cerioli@lucastechnologyservice.com'
        });
        setSubmitError(null);
        setSubmitSuccess(false);
        setCreatedProjectDetails(null);
    };

    // Funções para a lista de projetos
    const handleRefreshProjects = () => {
        setRefreshing(true);
        fetchProjects();
    };

    const handleToggleDeleted = () => {
        setIncludeDeleted(!includeDeleted);
    };

    const formatDate = (dateString: string) => {
        if (!dateString || dateString === 'null') return 'N/A';
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch {
            return 'Invalid date';
        }
    };

    const getProjectStatus = (project: RawProject): 'active' | 'inactive' | 'deleted' => {
        if (project.deleted_at && project.deleted_at !== 'null' && project.deleted_at !== '') return 'deleted';
        return project.is_active ? 'active' : 'inactive';
    };

    const getAgileMethod = (method: string): 'Scrum' | 'SAFe' | 'Kanban' | 'Other' => {
        const normalizedMethod = method?.toLowerCase() || '';
        if (normalizedMethod.includes('scrum')) return 'Scrum';
        if (normalizedMethod.includes('safe')) return 'SAFe';
        if (normalizedMethod.includes('kanban')) return 'Kanban';
        return 'Other';
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Copied to clipboard:', text);
        });
    };

    // Estatísticas
    const totalProjects = projects.length;
    const activeProjects = projects.filter(p => p.is_active && (!p.deleted_at || p.deleted_at === 'null')).length;
    const deletedProjects = projects.filter(p => p.deleted_at && p.deleted_at !== 'null').length;

    return (
        <S.UserContainer>
            <S.UserHeader>
                <h1>New Project</h1>
                <p>Fill in the project details below</p>
            </S.UserHeader>

            {submitError && (
                <S.NotificationBanner $type="error">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{submitError}</span>
                </S.NotificationBanner>
            )}

            {submitSuccess && (
                <S.NotificationBanner $type="success">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Project created successfully!</span>
                </S.NotificationBanner>
            )}

            <S.FormContainer onSubmit={handleSubmit}>
                <S.FormGroup>
                    <S.Label htmlFor="projectName">Project Name *</S.Label>
                    <S.Input
                        type="text"
                        id="projectName"
                        placeholder='Enter project name'
                        value={formData.projectName}
                        onChange={(e) => setFormData(prev => ({ ...prev, projectName: e.target.value }))}
                        required
                        disabled={isSubmitting}
                    />
                    <S.FieldDescription>
                        The project code will be generated automatically based on the project name.
                    </S.FieldDescription>
                </S.FormGroup>

                <S.FormGroup>
                    <S.Label htmlFor="agileMethodology">Agile Methodology</S.Label>
                    <S.Select
                        id="agileMethodology"
                        value={formData.agileMethodology}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            agileMethodology: e.target.value
                        }))}
                        required
                        disabled={isSubmitting}
                    >
                        <option value="Scrum">Scrum</option>
                        <option value="SAFe">SAFe</option>
                        <option value="Kanban">Kanban</option>
                    </S.Select>
                </S.FormGroup>

                <S.FormGroup>
                    <S.Label htmlFor="projectCode">Project Code *</S.Label>
                    <S.Input
                        type="text"
                        id="projectCode"
                        placeholder="Project code will be generated automatically"
                        value={formData.projectCode}
                        onChange={(e) => setFormData(prev => ({ ...prev, projectCode: e.target.value }))}
                        required
                        readOnly={!!formData.projectName.trim()}
                        disabled={isSubmitting}
                        style={{
                            backgroundColor: formData.projectName.trim() ? 'rgba(255, 255, 255, 0.1)' : 'white',
                            color: formData.projectName.trim() ? 'rgba(255, 255, 255, 0.9)' : '#2c3e50',
                            borderColor: formData.projectName.trim() ? 'rgba(255, 255, 255, 0.2)' : '#e1e5e9'
                        }}
                    />
                    <S.FieldDescription>
                        Generated automatically: First 4 letters of project name + random 3 digits
                    </S.FieldDescription>
                </S.FormGroup>

                <S.FormGroup>
                    <S.Label htmlFor="organization">Organization</S.Label>
                    <S.Input
                        type="text"
                        id="organization"
                        value={formData.organization}
                        onChange={(e) => setFormData(prev => ({ ...prev, organization: e.target.value }))}
                        readOnly
                        disabled={isSubmitting}
                    />
                </S.FormGroup>

                <S.FormGroup>
                    <S.Label htmlFor="description">Description</S.Label>
                    <S.TextArea
                        id="description"
                        placeholder="Enter project description"
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        rows={4}
                        disabled={isSubmitting}
                    />
                </S.FormGroup>

                <S.FormGroup>
                    <S.Label htmlFor="ownerUser">Owner User</S.Label>
                    <S.Input
                        type="text"
                        id="ownerUser"
                        value={formData.ownerUser}
                        onChange={(e) => setFormData(prev => ({ ...prev, ownerUser: e.target.value }))}
                        readOnly
                        disabled={isSubmitting}
                    />
                </S.FormGroup>

                
                {createdProjectDetails && (
                    <S.SuccessCard>
                        <S.SuccessHeader>
                            <S.SuccessIcon>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </S.SuccessIcon>
                            <S.SuccessTitle>Project Created Successfully!</S.SuccessTitle>
                        </S.SuccessHeader>
                        
                        <S.SuccessDetails>
                            <S.DetailRow>
                                <S.DetailLabel>Project Name:</S.DetailLabel>
                                <S.DetailValue>{createdProjectDetails.name}</S.DetailValue>
                            </S.DetailRow>
                            <S.DetailRow>
                                <S.DetailLabel>Project Code:</S.DetailLabel>
                                <S.DetailValue>
                                    {createdProjectDetails.code}
                                    <S.CopyButton 
                                        onClick={() => copyToClipboard(createdProjectDetails.code)}
                                        title="Copy to clipboard"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    </S.CopyButton>
                                </S.DetailValue>
                            </S.DetailRow>
                            <S.DetailRow>
                                <S.DetailLabel>Project ID:</S.DetailLabel>
                                <S.DetailValue>
                                    {createdProjectDetails.id}
                                    <S.CopyButton 
                                        onClick={() => copyToClipboard(createdProjectDetails.id)}
                                        title="Copy to clipboard"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    </S.CopyButton>
                                </S.DetailValue>
                            </S.DetailRow>
                        </S.SuccessDetails>
                        
                        <S.SuccessFooter>
                            <S.SuccessMessage>
                                Your project has been successfully created and is ready to use.
                            </S.SuccessMessage>
                        </S.SuccessFooter>
                    </S.SuccessCard>
                )}

                <S.FormActions>
                    <S.SubmitButton 
                        type="submit" 
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Creating Project...' : 'Create Project'}
                    </S.SubmitButton>

                    <S.CancelButton
                        type="button" 
                        onClick={handleReset}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </S.CancelButton>
                </S.FormActions>
            </S.FormContainer>

            
            <S.ProjectsSection>
                <S.SectionHeader>
                    <S.SectionTitle>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        All Projects
                    </S.SectionTitle>
                    
                    <S.SectionControls>
                        <S.FilterSelect 
                            value={organizationFilter}
                            onChange={(e) => setOrganizationFilter(e.target.value)}
                        >
                            <option value="all">All Organizations</option>
                            <option value="Lucas Technology Service">Lucas Technology Service</option>
                        </S.FilterSelect>
                        
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={includeDeleted}
                                onChange={handleToggleDeleted}
                                style={{ width: '18px', height: '18px' }}
                            />
                            <span style={{ color: '#2c3e50', fontSize: '0.9rem', fontWeight: '500' }}>
                                Show Deleted
                            </span>
                        </label>
                        
                        <S.RefreshButton 
                            onClick={handleRefreshProjects}
                            disabled={refreshing}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            {refreshing ? 'Refreshing...' : 'Refresh'}
                        </S.RefreshButton>
                    </S.SectionControls>
                </S.SectionHeader>

                <S.StatsContainer>
                    <S.StatCard $type="total">
                        <h3>{totalProjects}</h3>
                        <p>Total Projects</p>
                    </S.StatCard>
                    <S.StatCard $type="active">
                        <h3>{activeProjects}</h3>
                        <p>Active Projects</p>
                    </S.StatCard>
                    <S.StatCard $type="deleted">
                        <h3>{deletedProjects}</h3>
                        <p>Deleted Projects</p>
                    </S.StatCard>
                </S.StatsContainer>

                {loadingProjects ? (
                    <S.LoadingSpinner>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span>Loading projects...</span>
                    </S.LoadingSpinner>
                ) : projectsError ? (
                    <S.ErrorMessage>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h4>Error Loading Projects</h4>
                        <p>{projectsError}</p>
                        <button onClick={handleRefreshProjects}>Try Again</button>
                    </S.ErrorMessage>
                ) : projects.length === 0 ? (
                    <S.EmptyState>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h4>No Projects Found</h4>
                        <p>Create your first project using the form above</p>
                    </S.EmptyState>
                ) : (
                    <S.ProjectsGrid>
                        {projects.map((project) => (
                            <S.ProjectCard key={project.id} $status={getProjectStatus(project)}>
                                <S.ProjectCardHeader>
                                    <S.ProjectInfo>
                                        <S.ProjectName>{project.name}</S.ProjectName>
                                        <S.ProjectCode>{project.code}</S.ProjectCode>
                                    </S.ProjectInfo>
                                    <S.ProjectStatusBadge $status={getProjectStatus(project)}>
                                        {getProjectStatus(project)}
                                    </S.ProjectStatusBadge>
                                </S.ProjectCardHeader>
                                
                                <S.ProjectDescription>
                                    {project.description || 'No description provided'}
                                </S.ProjectDescription>
                                
                                <S.ProjectDetails>
                                    <S.ProjectDetailItem>
                                        <S.DetailLabel>Agile Method</S.DetailLabel>
                                        <S.AgileMethodBadge $method={getAgileMethod(project.template_agile_method)}>
                                            {project.template_agile_method || 'Not specified'}
                                        </S.AgileMethodBadge>
                                    </S.ProjectDetailItem>
                                    
                                    <S.ProjectDetailItem>
                                        <S.DetailLabel>Organization ID</S.DetailLabel>
                                        <S.DetailValue>
                                            {project.organization_id?.substring(0, 8) || 'N/A'}...
                                        </S.DetailValue>
                                    </S.ProjectDetailItem>
                                    
                                    <S.ProjectDetailItem>
                                        <S.DetailLabel>Owner ID</S.DetailLabel>
                                        <S.DetailValue>
                                            {project.owner_id?.substring(0, 8) || 'N/A'}...
                                        </S.DetailValue>
                                    </S.ProjectDetailItem>
                                    
                                    <S.ProjectDetailItem>
                                        <S.DetailLabel>Created</S.DetailLabel>
                                        <S.DetailValue>{formatDate(project.created_at)}</S.DetailValue>
                                    </S.ProjectDetailItem>
                                </S.ProjectDetails>
                                
                                <S.ProjectTimestamps>
                                    <S.Timestamp>
                                        <span>Created</span>
                                        <span>{formatDate(project.created_at)}</span>
                                    </S.Timestamp>
                                    <S.Timestamp>
                                        <span>Updated</span>
                                        <span>{formatDate(project.updated_at)}</span>
                                    </S.Timestamp>
                                </S.ProjectTimestamps>
                                
                                <S.ProjectCardFooter>
                                    <S.ProjectActions>
                                        <S.ActionButton $variant="view" title="View Project">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            View
                                        </S.ActionButton>
                                        
                                        <S.ActionButton $variant="edit" title="Edit Project">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            Edit
                                        </S.ActionButton>
                                    </S.ProjectActions>
                                    
                                    {getProjectStatus(project) === 'deleted' && (
                                        <span style={{ color: '#e74c3c', fontSize: '0.8rem', fontStyle: 'italic' }}>
                                            Deleted: {formatDate(project.deleted_at)}
                                        </span>
                                    )}
                                </S.ProjectCardFooter>
                            </S.ProjectCard>
                        ))}
                    </S.ProjectsGrid>
                )}
            </S.ProjectsSection>

            <S.UserFooter>
                <div>
                    <strong>Welcome back,</strong>
                    <p>Administrator</p>
                </div>
            </S.UserFooter>
        </S.UserContainer>
    );
};

export default ProjectForm;