'use client';
import React, { useState, useEffect, useCallback } from 'react';
import * as S from './styles';

export interface Credential {
  id: number;
  type: 'Identifier' | 'Other';
  email: string;
  password: string;
  description: string;
}

interface ApiCredential {
  id: string;
  organization_id: string;
  organization_name: string;
  type: string;
  email: string;
  password: string;
  description: string;
  created_at: string;
  updated_at: string;
}

interface RawCredentialsResponse {
  credentials: ApiCredential[];
  total: number;
  page: number;
  size: number;
  total_pages: number;
  organization_name: string;
}

const CredentialManagement: React.FC = () => {
  
  const [formData, setFormData] = useState({
    email: '',
    loginAccess: 'Email',
    password: '',
    login: '',
    password2: '',
    description: '',
    organization: 'Lucas Technology Service' // Campo obrigatório
  });

  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [loadingCredentials, setLoadingCredentials] = useState<boolean>(true);
  const [credentialsError, setCredentialsError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [organizationFilter, setOrganizationFilter] = useState<string>('Lucas Technology Service');

  
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

  
  const fetchCredentials = useCallback(async () => {
    try {
      setCredentialsError(null);
      setLoadingCredentials(true);
      
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
      const apiUrl = `${apiBaseUrl}/api/credentials/raw?organization_name=${encodeURIComponent(organizationFilter)}&page=1&size=50`;
      
      console.log('[CredentialManagement] Fetching credentials from:', apiUrl);
      
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`Failed to fetch credentials: ${response.status}`);
      }
      
      const data: RawCredentialsResponse = await response.json();
      
      
      const convertedCredentials: Credential[] = data.credentials.map((cred, index) => ({
        id: index + 1,
        type: cred.type === 'Identifier' ? 'Identifier' : 'Other',
        email: cred.email,
        password: cred.password ? '############' : '---',
        description: cred.description
      }));
      
      setCredentials(convertedCredentials);
      
    } catch (err) {
      setCredentialsError(err instanceof Error ? err.message : 'Failed to load credentials');
      console.error('[CredentialManagement] Error fetching credentials:', err);
    } finally {
      setLoadingCredentials(false);
      setRefreshing(false);
    }
  }, [organizationFilter]);

  
  useEffect(() => {
    fetchCredentials();
  }, [fetchCredentials]);

  
  useEffect(() => {
    if (submitSuccess) {
      fetchCredentials();
    }
  }, [submitSuccess, fetchCredentials]);

  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    
    if (formData.loginAccess === 'Email' && (!formData.email || !formData.password)) {
      setSubmitError("Email and password are required for Email type");
      return;
    }
    
    if (formData.loginAccess === 'Other' && (!formData.login || !formData.password2)) {
      setSubmitError("Login and password are required for Other type");
      return;
    }
    
    if (!formData.description) {
      setSubmitError("Description is required");
      return;
    }

    
    setSubmitError(null);
    setSubmitSuccess(false);
    setIsSubmitting(true);
    
    console.group("[CredentialManagement] Credential creation attempt");

    try {
      
      const credentialType = formData.loginAccess === 'Email' ? 'Identifier' : formData.loginAccess;
      const credentialEmail = formData.loginAccess === 'Email' ? formData.email : formData.login;
      const credentialPassword = formData.loginAccess === 'Email' ? formData.password : formData.password2;

      
      const jwt = await getJwtToken();
      
      
      const response = await fetch("/api/credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: jwt,
          organization_name: formData.organization, // Campo OBRIGATÓRIO
          type: credentialType,
          email: credentialEmail,
          password: credentialPassword,
          description: formData.description
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Credential creation failed");
      }

      const newCredential = await response.json();
      
      
      setSubmitSuccess(true);
      
      
      setFormData({
        email: '',
        loginAccess: 'Email',
        password: '',
        login: '',
        password2: '',
        description: '',
        organization: 'Lucas Technology Service'
      });
      
      console.log('Credencial criada via API:', newCredential);
      
    } catch (err) {
      const message = err instanceof Error ? err.message : "Internal error. Try again.";
      setSubmitError(message);
      console.error('[CredentialManagement] Error creating credential:', err);
    } finally {
      setIsSubmitting(false);
      console.groupEnd();
    }
  };

  const handleCancel = () => {
    setFormData({
      email: '',
      loginAccess: 'Email',
      password: '',
      login: '',
      password2: '',
      description: '',
      organization: 'Lucas Technology Service'
    });
    setSubmitError(null);
    setSubmitSuccess(false);
  };

  const handleDeleteCredential = (id: number) => {
    setCredentials(prev => prev.filter(cred => cred.id !== id));
  };

  
  const handleRefreshCredentials = () => {
    setRefreshing(true);
    fetchCredentials();
  };

  
  return (
    <>
      
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
          <span>Credential created successfully!</span>
        </S.NotificationBanner>
      )}

      <S.CredentialSection>
        <S.SectionTitle>Access & Credential Management</S.SectionTitle>
        
        <S.FormContainer onSubmit={handleSubmit}>
          
          <S.FormRow>
            <S.FormGroup>
              <S.Label>Login Access Type</S.Label>
              <S.Select 
                name="loginAccess"
                value={formData.loginAccess}
                onChange={handleInputChange}
                disabled={isSubmitting}
              >
                <option value="Email">Login Access</option>
                <option value="Other">Other</option>
              </S.Select>
            </S.FormGroup>
            
            
            <S.FormGroup>
              <S.Label>Organization Name *</S.Label>
              <S.Input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleInputChange}
                placeholder="Enter organization name"
                required
                disabled={isSubmitting}
              />
            </S.FormGroup>
            
            {formData.loginAccess === 'Email' ? (
              <S.FormGroup>
                <S.Label>Email *</S.Label>
                <S.Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email"
                  required
                  disabled={isSubmitting}
                />
              </S.FormGroup>
            ) : (
              <S.FormGroup>
                <S.Label>Login *</S.Label>
                <S.Input
                  type="text"
                  name="login"
                  value={formData.login}
                  onChange={handleInputChange}
                  placeholder="Enter login"
                  required
                  disabled={isSubmitting}
                />
              </S.FormGroup>
            )}
          </S.FormRow>
          
          
          <S.FormRow>
            {formData.loginAccess === 'Email' ? (
              <S.FormGroup>
                <S.Label>Password *</S.Label>
                <S.Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter password"
                  required
                  disabled={isSubmitting}
                />
              </S.FormGroup>
            ) : (
              <S.FormGroup>
                <S.Label>Password *</S.Label>
                <S.Input
                  type="password"
                  name="password2"
                  value={formData.password2}
                  onChange={handleInputChange}
                  placeholder="Enter password"
                  required
                  disabled={isSubmitting}
                />
              </S.FormGroup>
            )}
            
            <S.FormGroup>
              <S.Label>Description *</S.Label>
              <S.Input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter description"
                required
                disabled={isSubmitting}
              />
            </S.FormGroup>
          </S.FormRow>
          
          <S.ButtonGroup>
            <S.PrimaryButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating Credential...' : 'Submit'}
            </S.PrimaryButton>
            <S.SecondaryButton type="button" onClick={handleCancel} disabled={isSubmitting}>
              Cancel
            </S.SecondaryButton>
          </S.ButtonGroup>
        </S.FormContainer>
      </S.CredentialSection>

      
      <S.CredentialSection>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <S.TableTitle>Registered Credentials</S.TableTitle>
          
          
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <S.FilterSelect 
              value={organizationFilter}
              onChange={(e) => setOrganizationFilter(e.target.value)}
            >
              <option value="Lucas Technology Service">Lucas Technology Service</option>
            </S.FilterSelect>
            
            
            <S.RefreshButton 
              onClick={handleRefreshCredentials}
              disabled={refreshing || loadingCredentials}
            >
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </S.RefreshButton>
          </div>
        </div>

        
        {loadingCredentials ? (
          <S.LoadingSpinner>
            <span>Loading credentials...</span>
          </S.LoadingSpinner>
        ) : credentialsError ? (
          <S.ErrorMessage>
            <h4>Error Loading Credentials</h4>
            <p>{credentialsError}</p>
            <button onClick={handleRefreshCredentials}>Try Again</button>
          </S.ErrorMessage>
        ) : credentials.length === 0 ? (
          <S.EmptyState>
            <h4>No Credentials Found</h4>
            <p>Create your first credential using the form above</p>
          </S.EmptyState>
        ) : (
          <S.Table>
            <S.TableHeader>
              <tr>
                <S.TableHeaderCell>Type</S.TableHeaderCell>
                <S.TableHeaderCell>Email / Login</S.TableHeaderCell>
                <S.TableHeaderCell>Description</S.TableHeaderCell>
                <S.TableHeaderCell>Actions</S.TableHeaderCell>
              </tr>
            </S.TableHeader>
            <tbody>
              {credentials.map((cred) => (
                <S.TableRow key={cred.id}>
                  <S.TableCell>{cred.type}</S.TableCell>
                  <S.TableCell>{cred.email}</S.TableCell>
                  <S.TableCell>{cred.description}</S.TableCell>
                  <S.TableCell>
                    <S.AddButton disabled={isSubmitting}>+</S.AddButton>
                    <S.DeleteButton 
                      onClick={() => handleDeleteCredential(cred.id)} 
                      disabled={isSubmitting}
                    >
                      X
                    </S.DeleteButton>
                  </S.TableCell>
                </S.TableRow>
              ))}
            </tbody>
          </S.Table>
        )}
      </S.CredentialSection>
    </>
  );
};

export default CredentialManagement;