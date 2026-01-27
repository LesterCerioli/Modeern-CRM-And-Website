'use client';
import React, { useState } from 'react';
import * as S from './styles';

export interface Credential {
  id: number;
  type: 'Identifier' | 'Other';
  email: string;
  password: string;
  description: string;
}

const CredentialManagement: React.FC = () => {
  const [credentials, setCredentials] = useState<Credential[]>([
    { id: 1, type: 'Identifier', email: 'user@email.com', password: '############', description: '' },
    { id: 2, type: 'Other', email: 'user@conemail.com', password: '---', description: '' },
  ]);

  const [formData, setFormData] = useState({
    email: '',
    loginAccess: 'Email',
    password: '',
    login: '',
    password2: '',
    description: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Adicionar nova credencial à lista
    const newCredential: Credential = {
      id: credentials.length + 1,
      type: formData.loginAccess === 'Email' ? 'Identifier' : 'Other',
      email: formData.email || formData.login,
      password: formData.password || formData.password2,
      description: formData.description
    };
    
    setCredentials(prev => [...prev, newCredential]);
    
    // Resetar formulário
    setFormData({
      email: '',
      loginAccess: 'Email',
      password: '',
      login: '',
      password2: '',
      description: ''
    });
    
    console.log('Credencial adicionada:', newCredential);
  };

  const handleCancel = () => {
    setFormData({
      email: '',
      loginAccess: 'Email',
      password: '',
      login: '',
      password2: '',
      description: ''
    });
  };

  const handleDeleteCredential = (id: number) => {
    setCredentials(prev => prev.filter(cred => cred.id !== id));
  };

  return (
    <>
      <S.CredentialSection>
        <S.SectionTitle>Access & Credential Management</S.SectionTitle>
        
        <S.FormContainer onSubmit={handleSubmit}>
          <S.FormRow>
            <S.FormGroup>
              <S.Label>Email</S.Label>
              <S.Select 
                name="loginAccess"
                value={formData.loginAccess}
                onChange={handleInputChange}
              >
                <option value="Email">Login Access</option>
                <option value="Other">Other</option>
              </S.Select>
            </S.FormGroup>
            
            <S.FormGroup>
              <S.Label>Email</S.Label>
              <S.Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email"
              />
            </S.FormGroup>
            
            <S.FormGroup>
              <S.Label>Password</S.Label>
              <S.Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter password"
              />
            </S.FormGroup>
          </S.FormRow>
          
          <S.FormRow>
            <S.FormGroup>
              <S.Label>Login</S.Label>
              <S.Input
                type="text"
                name="login"
                value={formData.login}
                onChange={handleInputChange}
                placeholder="Enter login"
              />
            </S.FormGroup>
            
            <S.FormGroup>
              <S.Label>Password</S.Label>
              <S.Input
                type="password"
                name="password2"
                value={formData.password2}
                onChange={handleInputChange}
                placeholder="Enter password"
              />
            </S.FormGroup>
            
            <S.FormGroup>
              <S.Label>Description</S.Label>
              <S.Input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter description"
              />
            </S.FormGroup>
          </S.FormRow>
          
          <S.ButtonGroup>
            <S.PrimaryButton type="submit">Submit</S.PrimaryButton>
            <S.SecondaryButton type="button" onClick={handleCancel}>Cancel</S.SecondaryButton>
          </S.ButtonGroup>
        </S.FormContainer>
      </S.CredentialSection>

      <S.CredentialSection>
        <S.TableTitle>Registered Credentials</S.TableTitle>
        
        <S.Table>
          <S.TableHeader>
            <tr>
              <S.TableHeaderCell>Type</S.TableHeaderCell>
              <S.TableHeaderCell>Email / Action</S.TableHeaderCell>
              <S.TableHeaderCell>Descriptoid</S.TableHeaderCell>
              <S.TableHeaderCell>Actions</S.TableHeaderCell>
            </tr>
          </S.TableHeader>
          <tbody>
            {credentials.map((cred) => (
              <S.TableRow key={cred.id}>
                <S.TableCell>{cred.type}</S.TableCell>
                <S.TableCell>{cred.email}</S.TableCell>
                <S.TableCell>
                  <S.PasswordDisplay>{cred.password}</S.PasswordDisplay>
                </S.TableCell>
                <S.TableCell>
                  <S.AddButton>+</S.AddButton>
                  <S.DeleteButton onClick={() => handleDeleteCredential(cred.id)}>X</S.DeleteButton>
                </S.TableCell>
              </S.TableRow>
            ))}
          </tbody>
        </S.Table>
      </S.CredentialSection>
    </>
  );
};

export default CredentialManagement;