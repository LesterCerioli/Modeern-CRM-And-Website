'use client';

import React, { useState, useTransition, useEffect } from 'react';
import { FiRefreshCw, FiEye, FiEyeOff, FiCopy, FiCheck, FiAlertCircle, FiGlobe } from 'react-icons/fi';
import * as S from './styles';
import { createUserAction } from '@/app/actions/userActions';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  organization: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
}

type NotificationType = 'success' | 'error' | 'warning' | 'info' | null;

const UserComponent: React.FC = () => {
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    organization_name: 'Lucas Technology Service'
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [passwordCopied, setPasswordCopied] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isApiLoading, setIsApiLoading] = useState(false);
    
  const [optimisticUsers, setOptimisticUsers] = useState<User[]>([]);
  
  const [realUsers, setRealUsers] = useState<User[]>([]);
  
  
  const [notification, setNotification] = useState<{
    type: NotificationType;
    message: string;
  } | null>(null);

  
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  
  const showNotification = (type: NotificationType, message: string) => {
    setNotification({ type, message });
  };

  
  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData(prev => ({ ...prev, password }));
    showNotification('success', 'Strong password generated!');
  };

  
  const copyPassword = async () => {
    if (!formData.password) {
      showNotification('warning', 'Generate a password first');
      return;
    }
    
    try {
      await navigator.clipboard.writeText(formData.password);
      setPasswordCopied(true);
      showNotification('success', 'Password copied to clipboard');
      setTimeout(() => setPasswordCopied(false), 2000);
    } catch (err) {
      showNotification('error', 'Failed to copy password');
    }
  };

  
  const registerViaApi = async () => {
    if (!formData.name || !formData.email || !formData.password || !formData.role || !formData.organization_name) {
        showNotification('warning', 'Please fill all required fields');
        return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showNotification('error', 'Please enter a valid email address');
        return;
    }
    if (formData.password.length < 8) {
        showNotification('warning', 'Password must be at least 8 characters long');
        return;
    }

    const userPassword = formData.password;
    const userName = formData.name;

    const optimisticUser: User = {
        id: `temp_api_${Date.now()}`,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        organization: formData.organization_name,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    setOptimisticUsers(prev => [optimisticUser, ...prev]);
    setIsApiLoading(true);
    showNotification('info', 'Registering user via API...');

    try {
        const tokenResponse = await fetch('/api/auth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
                client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET
            }),
        });
        
        if (!tokenResponse.ok) {
            throw new Error(`Failed to get token: ${tokenResponse.status}`);
        }
        
        const tokenData = await tokenResponse.json();
        const token = tokenData.token;

        const response = await fetch('/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token,
                name: formData.name,
                email: formData.email,
                password: userPassword,
                role: formData.role,
                organization_name: formData.organization_name
            }),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || `API error: ${response.status}`);
        }

        setOptimisticUsers(prev => prev.filter(u => u.id !== optimisticUser.id));
        
        setRealUsers(prev => [{
            id: `api_${Date.now()}`,
            name: formData.name,
            email: formData.email,
            role: formData.role,
            organization: formData.organization_name,
            status: 'active',
            createdAt: new Date().toISOString()
        }, ...prev]);

        showNotification('success', `User ${userName} registered successfully via API!`);
        
    } catch (error: any) {
        console.error('API registration error:', error);
        setOptimisticUsers(prev => prev.filter(u => u.id !== optimisticUser.id));
        
        if (error.message?.includes('401') || error.message?.includes('Unauthorized')) {
            showNotification('error', 'Authentication failed. Invalid token.');
        } else if (error.message?.includes('404')) {
            showNotification('error', 'API endpoint not found.');
        } else if (error.message?.includes('already exists') || error.message?.includes('duplicate')) {
            showNotification('error', `User with email ${formData.email} already exists`);
        } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
            showNotification('error', 'Network error. Please check your connection.');
        } else {
            showNotification('error', error.message || 'Failed to register user via API');
        }
    } finally {
        setIsApiLoading(false);
    }
  }

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    
    if (!formData.name || !formData.email || !formData.password || !formData.role) {
      showNotification('warning', 'Please fill all required fields');
      return;
    }

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showNotification('error', 'Please enter a valid email address');
      return;
    }

    
    if (formData.password.length < 8) {
      showNotification('warning', 'Password must be at least 8 characters long');
      return;
    }

    
    const optimisticUser: User = {
      id: `temp_${Date.now()}`,
      name: formData.name,
      email: formData.email,
      role: formData.role,
      organization: formData.organization_name,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    
    setOptimisticUsers(prev => [optimisticUser, ...prev]);

    
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'user',
      organization_name: 'Lucas Technology Services'
    });

    
    showNotification('success', 'User creation started. Processing in background...');

    
    startTransition(async () => {
      try {
        
        const formDataObj = new FormData();
        formDataObj.append('name', optimisticUser.name);
        formDataObj.append('email', optimisticUser.email);
        formDataObj.append('password', formData.password);
        formDataObj.append('role', optimisticUser.role);
        formDataObj.append('organization_name', optimisticUser.organization);

        
        const result = await createUserAction(formDataObj);

        if (result.success && result.data?.user) {
          
          setOptimisticUsers(prev => prev.filter(u => u.id !== optimisticUser.id));
          
          
          setRealUsers(prev => [{
            ...result.data!.user!,
            id: result.data!.user!.id || `user_${Date.now()}`,
            status: 'active',
            createdAt: new Date().toISOString()
          }, ...prev]);
          
          
          showNotification('success', `User ${optimisticUser.name} created successfully!`);
        } else {
          
          setOptimisticUsers(prev => prev.filter(u => u.id !== optimisticUser.id));
          
          
          if (result.error?.includes('already exists') || result.error?.includes('duplicate')) {
            showNotification('error', `User with email ${optimisticUser.email} already exists`);
          } else if (result.error?.includes('401') || result.error?.includes('Unauthorized')) {
            showNotification('error', 'Authentication failed. Please try again.');
          } else if (result.error?.includes('404') || result.error?.includes('Not Found')) {
            showNotification('error', 'Service not available. Please try later.');
          } else {
            showNotification('error', result.error || 'Failed to create user. Please try again.');
          }
        }
      } catch (error: any) {
        console.error('Error creating user:', error);
        
        
        setOptimisticUsers(prev => prev.filter(u => u.id !== optimisticUser.id));
        
        
        if (error.message?.includes('network') || error.message?.includes('fetch')) {
          showNotification('error', 'Network error. Please check your connection.');
        } else {
          showNotification('error', 'An unexpected error occurred. Please try again.');
        }
      }
    });
  };

  
  const displayUsers = [...optimisticUsers, ...realUsers];

  return (
    <S.UserContainer>
      <S.UserHeader>
        <h1>User Registration</h1>
        <p>Create and manage user accounts</p>
      </S.UserHeader>

      {/* Notificação Inline */}
      {notification && (
        <S.NotificationBanner $type={notification.type}>
          <FiAlertCircle />
          <span>{notification.message}</span>
          <S.CloseNotificationButton onClick={() => setNotification(null)}>
            ×
          </S.CloseNotificationButton>
        </S.NotificationBanner>
      )}

      <S.FormContainer onSubmit={handleSubmit}>
        {/* Name Field */}
        <S.FormGroup>
          <S.Label htmlFor="name">Name *</S.Label>
          <S.Input
            type="text"
            id="name"
            placeholder="Enter full name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
          />
        </S.FormGroup>

        {/* Email Field */}
        <S.FormGroup>
          <S.Label htmlFor="email">Email *</S.Label>
          <S.Input
            type="email"
            id="email"
            placeholder="Enter email address"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            required
          />
        </S.FormGroup>

        {/* Password Field with Generate/Copy */}
        <S.FormGroup>
          <S.Label htmlFor="password">Password *</S.Label>
          <S.PasswordContainer>
            <S.Input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Click generate or type your password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              required
            />
            <S.PasswordActions>
              <S.IconButton 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </S.IconButton>
              <S.IconButton 
                type="button" 
                onClick={copyPassword}
                title="Copy to clipboard"
                disabled={!formData.password}
              >
                {passwordCopied ? <FiCheck /> : <FiCopy />}
              </S.IconButton>
            </S.PasswordActions>
          </S.PasswordContainer>
          <S.GenerateButton type="button" onClick={generatePassword}>
            <FiRefreshCw /> Generate Password
          </S.GenerateButton>
        </S.FormGroup>

        {/* Role Selection */}
        <S.FormGroup>
          <S.Label htmlFor="role">Role *</S.Label>
          <S.Select
            id="role"
            value={formData.role}
            onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
            required
          >
            <S.Option value="">Select role...</S.Option>
            <S.Option value="admin">Admin</S.Option>
            <S.Option value="manager">Manager</S.Option>
            <S.Option value="ommercial">Commercial</S.Option>
            <S.Option value="ommercial-manager">Commercial Manager</S.Option>
            <S.Option value="sales">Sales</S.Option>
            <S.Option value="sales-manager">Sales Manager</S.Option>
            <S.Option value="accounting">Accounting</S.Option>
            <S.Option value="accounting-manager">Accounting Manager</S.Option>
            <S.Option value="finance">Finance</S.Option>
            <S.Option value="finance-manager">Finance Manager</S.Option>
            <S.Option value="marketing">Marketing</S.Option>
            <S.Option value="marketing-manager">Marketing Manager</S.Option>
            <S.Option value="it">IT</S.Option>
            <S.Option value="it-manager">IT Manager</S.Option>
          </S.Select>
        </S.FormGroup>

        {/* Organization (fixed or editable) */}
        <S.FormGroup>
          <S.Label htmlFor="organization">Organization Name</S.Label>
          <S.Input
            type="text"
            id="organization"
            value={formData.organization_name}
            onChange={(e) => setFormData(prev => ({ ...prev, organization_name: e.target.value }))}
            readOnly
          />
        </S.FormGroup>

        {/* Form Actions - MODIFICADO PARA ADICIONAR BOTÃO DA API */}
        <S.FormActions>
          <S.SubmitButton type="submit" disabled={isPending}>
            {isPending ? 'Creating User...' : 'Register User'}
          </S.SubmitButton>
          
          <S.CancelButton 
            type="button" 
            onClick={registerViaApi}
            disabled={isApiLoading}
            style={{ 
              backgroundColor: '#9b59b6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <FiGlobe />
            {isApiLoading ? 'Registering via API...' : 'Register via API'}
          </S.CancelButton>
          
          <S.CancelButton type="button" onClick={() => {
            setFormData({
              name: '',
              email: '',
              password: '',
              role: 'user',
              organization_name: 'Lucas Technology Services'
            });
            showNotification('success', 'Form cleared');
          }}>
            Cancel
          </S.CancelButton>
        </S.FormActions>
      </S.FormContainer>

      {/* Recent Users Grid/Table */}
      <S.RecentUsersSection>
        <h2>Recently Created Users</h2>
        
        {displayUsers.length === 0 ? (
          <S.EmptyState>
            <p>No users created yet. Register your first user above.</p>
          </S.EmptyState>
        ) : (
          <S.UsersGrid>
            {displayUsers.map((user) => (
              <S.UserCard key={user.id} $status={user.status}>
                <S.UserCardHeader>
                  <S.UserAvatar>
                    {user.name.charAt(0).toUpperCase()}
                  </S.UserAvatar>
                  <div>
                    <S.UserName>{user.name}</S.UserName>
                    <S.UserEmail>{user.email}</S.UserEmail>
                  </div>
                </S.UserCardHeader>
                
                <S.UserDetails>
                  <S.DetailItem>
                    <span>Role:</span>
                    <S.RoleBadge $role={user.role}>{user.role}</S.RoleBadge>
                  </S.DetailItem>
                  <S.DetailItem>
                    <span>Organization:</span>
                    <span>{user.organization}</span>
                  </S.DetailItem>
                  <S.DetailItem>
                    <span>Status:</span>
                    <S.StatusBadge $status={user.status}>
                      {user.status === 'pending' ? '⏳ Processing...' : 
                       user.status === 'active' ? '✅ Active' : '❌ Inactive'}
                    </S.StatusBadge>
                  </S.DetailItem>
                  <S.DetailItem>
                    <span>Created:</span>
                    <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                  </S.DetailItem>
                </S.UserDetails>
              </S.UserCard>
            ))}
          </S.UsersGrid>
        )}
      </S.RecentUsersSection>

      {/* User Info Footer */}
      <S.UserFooter>
        <div>
          <strong>Welcome back,</strong>
          <p>Administrator</p>
        </div>
      </S.UserFooter>
    </S.UserContainer>
  );
};

export default UserComponent;