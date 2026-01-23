'use client';

import { useState, useEffect } from 'react';
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

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            // Você pode adicionar um toast ou feedback visual aqui se quiser
            console.log('Copied to clipboard:', text);
        });
    };

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

                {/* Tag Verde de Sucesso */}
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