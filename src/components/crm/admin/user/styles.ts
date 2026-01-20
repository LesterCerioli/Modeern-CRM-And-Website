import styled from 'styled-components';

interface StatusProps {
  $status: 'active' | 'inactive' | 'pending';
}

interface RoleProps {
  $role: string;
}

export const UserContainer = styled.div`
  background: #f8f9fa;
  min-height: 100vh;
  padding: 30px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const UserHeader = styled.header`
  margin-bottom: 30px;
  
  h1 {
    color: #2c3e50;
    font-size: 2rem;
    margin: 0 0 10px 0;
    font-weight: 600;
  }
  
  p {
    color: #7f8c8d;
    margin: 0;
    font-size: 1rem;
  }
`;

export const FormContainer = styled.form`
  background:  #ff9800;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 40px;
   color: white;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 25px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: white;
  font-weight: 500;
  font-size: 0.95rem;
  
  &::after {
    content: ${props => props.htmlFor === 'organization' ? 'none' : '" *"'};
    color: #e74c3c;
    margin-left: 4px;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  color: #2c3e50;
  transition: all 0.3s ease;
  background: ${props => props.readOnly ? '#f8f9fa' : 'white'};
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  }
  
  &::placeholder {
    color: #95a5a6;
  }
  
  &:disabled {
    background-color: #ecf0f1;
    cursor: not-allowed;
  }
`;

export const PasswordContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const PasswordActions = styled.div`
  position: absolute;
  right: 10px;
  display: flex;
  gap: 8px;
`;

export const IconButton = styled.button`
  background: transparent;
  border: none;
  color: #7f8c8d;
  cursor: pointer;
  padding: 6px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  
  &:hover {
    color: #3498db;
    background: rgba(52, 152, 219, 0.1);
  }
  
  &:disabled {
    color: #bdc3c7;
    cursor: not-allowed;
    
    &:hover {
      background: transparent;
    }
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

export const GenerateButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #f8f9fa;
  color: #3498db;
  border: 2px solid #e1e5e9;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  margin-top: 10px;
  transition: all 0.3s;
  
  &:hover {
    background: #3498db;
    color: white;
    border-color: #3498db;
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  color: #2c3e50;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  }
  
  option:first-child {
    color: #95a5a6;
  }
`;

export const Option = styled.option`
  padding: 10px;
  color: #2c3e50;
`;

export const FormActions = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e1e5e9;
`;

export const SubmitButton = styled.button`
  flex: 1;
  background: #2ecc71;
  color: white;
  border: none;
  padding: 14px 20px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background: #27ae60;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(46, 204, 113, 0.3);
  }
  
  &:disabled {
    background: #95a5a6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const CancelButton = styled.button`
  flex: 1;
  background: #e74c3c;
  color: white;
  border: none;
  padding: 14px 20px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background: #c0392b;
    transform: translateY(-2px);
  }
`;

export const RecentUsersSection = styled.section`
  margin-top: 40px;
  
  h2 {
    color: #2c3e50;
    font-size: 1.5rem;
    margin-bottom: 20px;
    font-weight: 600;
  }
`;

export const EmptyState = styled.div`
  background: white;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  color: #7f8c8d;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  
  p {
    margin: 0;
    font-size: 1.1rem;
  }
`;

export const UsersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const UserCard = styled.div<StatusProps>`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border-left: 4px solid ${props => 
    props.$status === 'pending' ? '#f39c12' : 
    props.$status === 'active' ? '#2ecc71' : '#e74c3c'};
  opacity: ${props => props.$status === 'pending' ? 0.8 : 1};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  }
`;

export const UserCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
`;

export const UserAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3498db, #2ecc71);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  font-weight: 600;
`;

export const UserName = styled.h3`
  margin: 0 0 4px 0;
  color: #2c3e50;
  font-size: 1.1rem;
  font-weight: 600;
`;

export const UserEmail = styled.p`
  margin: 0;
  color: #7f8c8d;
  font-size: 0.9rem;
`;

export const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
  
  span:first-child {
    color: #7f8c8d;
    font-weight: 500;
    font-size: 0.9rem;
  }
  
  span:last-child {
    color: #2c3e50;
    font-weight: 500;
  }
`;

export const RoleBadge = styled.span<RoleProps>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: ${props => {
    switch(props.$role) {
      case 'admin': return 'rgba(231, 76, 60, 0.1)';
      case 'manager': return 'rgba(52, 152, 219, 0.1)';
      case 'support': return 'rgba(155, 89, 182, 0.1)';
      default: return 'rgba(46, 204, 113, 0.1)';
    }
  }};
  color: ${props => {
    switch(props.$role) {
      case 'admin': return '#e74c3c';
      case 'manager': return '#3498db';
      case 'support': return '#9b59b6';
      default: return '#2ecc71';
    }
  }};
`;

export const StatusBadge = styled.span<StatusProps>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  background: ${props => 
    props.$status === 'pending' ? 'rgba(243, 156, 18, 0.1)' : 
    props.$status === 'active' ? 'rgba(46, 204, 113, 0.1)' : 
    'rgba(231, 76, 60, 0.1)'};
  color: ${props => 
    props.$status === 'pending' ? '#f39c12' : 
    props.$status === 'active' ? '#2ecc71' : '#e74c3c'};
`;

export const UserFooter = styled.footer`
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #e1e5e9;
  color: #7f8c8d;
  font-size: 0.9rem;
  
  strong {
    color: #2c3e50;
    display: block;
    margin-bottom: 4px;
  }
  
  p {
    margin: 0;
  }
`;

// Adicione ao arquivo styles.ts do componente User

interface NotificationBannerProps {
  $type: 'success' | 'error' | 'warning' | 'info' | null;
}

export const NotificationBanner = styled.div<NotificationBannerProps>`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  margin-bottom: 25px;
  border-radius: 10px;
  font-weight: 500;
  font-size: 0.95rem;
  gap: 12px;
  animation: slideIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  
  background: ${props => {
    switch (props.$type) {
      case 'success': return 'linear-gradient(135deg, rgba(46, 204, 113, 0.15), rgba(46, 204, 113, 0.05))';
      case 'error': return 'linear-gradient(135deg, rgba(231, 76, 60, 0.15), rgba(231, 76, 60, 0.05))';
      case 'warning': return 'linear-gradient(135deg, rgba(243, 156, 18, 0.15), rgba(243, 156, 18, 0.05))';
      case 'info': return 'linear-gradient(135deg, rgba(52, 152, 219, 0.15), rgba(52, 152, 219, 0.05))';
      default: return 'linear-gradient(135deg, rgba(52, 152, 219, 0.15), rgba(52, 152, 219, 0.05))';
    }
  }};
  
  border: 2px solid ${props => {
    switch (props.$type) {
      case 'success': return 'rgba(46, 204, 113, 0.3)';
      case 'error': return 'rgba(231, 76, 60, 0.3)';
      case 'warning': return 'rgba(243, 156, 18, 0.3)';
      case 'info': return 'rgba(52, 152, 219, 0.3)';
      default: return 'rgba(52, 152, 219, 0.3)';
    }
  }};
  
  color: ${props => {
    switch (props.$type) {
      case 'success': return '#0f5132';
      case 'error': return '#842029';
      case 'warning': return '#664d03';
      case 'info': return '#084298';
      default: return '#084298';
    }
  }};
  
  svg {
    color: ${props => {
      switch (props.$type) {
        case 'success': return '#2ecc71';
        case 'error': return '#e74c3c';
        case 'warning': return '#f39c12';
        case 'info': return '#3498db';
        default: return '#3498db';
      }
    }};
    width: 22px;
    height: 22px;
    flex-shrink: 0;
  }
  
  span {
    flex: 1;
    line-height: 1.4;
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(46, 204, 113, 0.4);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(46, 204, 113, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(46, 204, 113, 0);
    }
  }
  
  ${props => props.$type === 'success' && `
    animation: slideIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55), pulse 2s infinite;
  `}
  
  ${props => props.$type === 'error' && `
    border-left: 6px solid #e74c3c;
  `}
  
  ${props => props.$type === 'warning' && `
    border-left: 6px solid #f39c12;
  `}
  
  ${props => props.$type === 'info' && `
    border-left: 6px solid #3498db;
  `}
  
  &:hover {
    transform: translateY(-2px);
    transition: transform 0.3s ease;
  }
  
  @media (max-width: 768px) {
    padding: 14px 16px;
    font-size: 0.9rem;
    
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export const CloseNotificationButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 2px 8px;
  border-radius: 50%;
  color: inherit;
  opacity: 0.7;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  
  &:hover {
    opacity: 1;
    background: rgba(0, 0, 0, 0.1);
    transform: rotate(90deg);
  }
  
  &:active {
    transform: rotate(90deg) scale(0.95);
  }
`;


export const NotificationProgress = styled.div<{ $type: string }>`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  width: 100%;
  background: ${props => {
    switch (props.$type) {
      case 'success': return '#2ecc71';
      case 'error': return '#e74c3c';
      case 'warning': return '#f39c12';
      case 'info': return '#3498db';
      default: return '#3498db';
    }
  }};
  border-radius: 0 0 10px 10px;
  animation: progress 5s linear forwards;
  
  @keyframes progress {
    from {
      width: 100%;
    }
    to {
      width: 0%;
    }
  }
`;