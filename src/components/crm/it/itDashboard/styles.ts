import styled from 'styled-components';

interface StatusProps {
  $status: 'active' | 'inactive' | 'pending';
}

interface RoleProps {
  $role: string;
}

interface NotificationBannerProps {
  $type: 'success' | 'error' | 'warning' | 'info' | null;
}

interface NavCardProps {
  $isActive: boolean;
  $bgColor: string;
}

interface NavCardIconProps {
  $color: string;
}

interface StatIconProps {
  $color: string;
}

interface FeatureIconProps {
  $color: string;
}

// User Container Styles
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

// Form Styles
export const FormContainer = styled.form`
  background: #ff9800;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 40px;
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #ff5722, #ff9800, #ffc107);
  }

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

export const FormFieldGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormRow = styled.div`
  display: flex;
  gap: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
  
  & > ${FormGroup} {
    flex: 1;
    margin-bottom: 0;
  }
`;

export const Label = styled.label<{ $required?: boolean }>`
  display: block;
  margin-bottom: 8px;
  color: white;
  font-weight: 500;
  font-size: 0.95rem;
  
  &::after {
    content: ${props => props.$required ? '" *"' : 'none'};
    color: #e74c3c;
    margin-left: 4px;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid ${props => props.readOnly ? 'rgba(255, 255, 255, 0.2)' : '#e1e5e9'};
  border-radius: 8px;
  font-size: 1rem;
  color: ${props => props.readOnly ? 'rgba(255, 255, 255, 0.9)' : '#2c3e50'};
  transition: all 0.3s ease;
  background: ${props => props.readOnly ? 'rgba(255, 255, 255, 0.1)' : 'white'};
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  }
  
  &::placeholder {
    color: ${props => props.readOnly ? 'rgba(255, 255, 255, 0.6)' : '#95a5a6'};
  }
  
  &:disabled {
    background-color: #ecf0f1;
    cursor: not-allowed;
  }
`;

export const InputWithIcon = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  
  ${Input}, textarea, select {
    padding-left: 40px;
  }
  
  svg {
    position: absolute;
    left: 12px;
    color: #7f8c8d;
    width: 18px;
    height: 18px;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  color: #2c3e50;
  font-family: inherit;
  transition: all 0.3s ease;
  background: white;
  resize: vertical;
  min-height: 100px;
  
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
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232c3e50' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
  padding-right: 40px;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  }
  
  option {
    padding: 10px;
    color: #2c3e50;
  }
`;

export const Option = styled.option`
  padding: 10px;
  color: #2c3e50;
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

// Form Actions
export const FormActions = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
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
  
  &::before {
    content: '✓';
    font-weight: bold;
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &:hover {
    background: #c0392b;
    transform: translateY(-2px);
  }
  
  &::before {
    content: '✕';
    font-weight: bold;
  }
`;

// User Grid Styles
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

// Footer
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

// Notification Styles
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
  position: relative;
  overflow: hidden;
  
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

// Additional Form Styles
export const FormTitle = styled.h2`
  color: white;
  font-size: 1.5rem;
  margin: 0 0 20px 0;
  font-weight: 600;
  padding-bottom: 15px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
`;

export const ProjectDetailsSection = styled.div`
  margin-bottom: 30px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const SectionTitle = styled.div`
  margin-bottom: 20px;
  
  h3 {
    color: #2c3e50;
    font-size: 1.3rem;
    margin: 0 0 5px 0;
    font-weight: 600;
  }
`;

export const InfoText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  margin: 5px 0 0 0;
  font-style: italic;
`;

export const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
`;

export const RadioOption = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
  
  input[type="radio"] {
    margin: 0;
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
  
  label {
    color: white;
    font-weight: 500;
    cursor: pointer;
    flex: 1;
    margin: 0;
  }
`;

export const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  
  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
  
  label {
    color: white;
    font-weight: 500;
    cursor: pointer;
    margin: 0;
  }
`;

export const FieldDescription = styled.small`
  display: block;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  margin-top: 4px;
  font-style: italic;
`;

export const FormSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 25px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const FormSectionTitle = styled.h4`
  color: white;
  font-size: 1rem;
  margin: 0 0 15px 0;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

export const RequiredIndicator = styled.span`
  color: #e74c3c;
  margin-left: 4px;
`;

export const CharacterCount = styled.div<{ $limitReached: boolean }>`
  text-align: right;
  font-size: 0.8rem;
  margin-top: 4px;
  color: ${props => props.$limitReached ? '#e74c3c' : 'rgba(255, 255, 255, 0.6)'};
`;

export const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 5px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  
  svg {
    width: 14px;
    height: 14px;
  }
`;

export const SuccessMessage = styled.div`
  color: #2ecc71;
  font-size: 0.85rem;
  margin-top: 5px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  
  svg {
    width: 14px;
    height: 14px;
  }
`;

// Dashboard Styles
export const DashboardContainer = styled.div`
  background: #f8f9fa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const DashboardHeader = styled.header`
  background: white
  color: white;
  padding: 25px 30px;
  box-shadow: 0 2px 10px ;;;;white(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  
  h1 {
    font-size: 2.5rem;
    margin: 0 0 5px 0;
    font-weight: 700;
    letter-spacing: 1px;
  }
  
  p {
    margin: 0;
    color: orange;
    font-size: 1.1rem;
  }
`;

export const DashboardLayout = styled.div`
  display: flex;
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 30px;
  gap: 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 20px;
    gap: 20px;
  }
`;

export const Sidebar = styled.aside`
  width: 300px;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const NavigationCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const NavCard = styled.div<NavCardProps>`
  background: ${props => props.$isActive ? props.$bgColor : 'white'};
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid ${props => props.$isActive ? 'rgba(0, 0, 0, 0.1)' : 'transparent'};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 15px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    background: ${props => props.$bgColor};
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export const NavCardIcon = styled.div<NavCardIconProps>`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background: ${props => props.$color}15;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$color};
  font-size: 1.5rem;
  flex-shrink: 0;
`;

export const NavCardContent = styled.div`
  flex: 1;
`;

export const NavCardTitle = styled.h3`
  margin: 0 0 5px 0;
  color: #2c3e50;
  font-size: 1.1rem;
  font-weight: 600;
`;

export const NavCardDescription = styled.p`
  margin: 0;
  color: #7f8c8d;
  font-size: 0.85rem;
  line-height: 1.4;
`;

export const MainContent = styled.main`
  flex: 1;
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

export const StatCard = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  border: 1px solid #e1e5e9;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const StatIcon = styled.div<StatIconProps>`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background: ${props => props.$color}15;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$color};
  font-size: 1.5rem;
`;

export const StatInfo = styled.div`
  flex: 1;
`;

export const StatValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 5px;
`;

export const StatLabel = styled.div`
  color: #7f8c8d;
  font-size: 0.9rem;
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ManagementSection = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 25px;
`;

export const ManagementList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const ManagementItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #e1e5e9;
  
  &:last-child {
    border-bottom: none;
  }
  
  span {
    color: #2c3e50;
    font-size: 0.95rem;
  }
`;

export const ManagementIcon = styled.div`
  color: #3498db;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
`;

export const ActivitiesSection = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 25px;
`;

export const ActivitiesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const ActivityItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

export const ActivityDot = styled.div`
  width: 8px;
  height: 8px;
  background: #3498db;
  border-radius: 50%;
  margin-top: 6px;
  flex-shrink: 0;
`;

export const ActivityText = styled.p`
  margin: 0;
  color: #2c3e50;
  font-size: 0.9rem;
  line-height: 1.4;
`;

export const DashboardFooter = styled.footer`
  background: #2c3e50;
  color: white;
  padding: 20px 30px;
  text-align: center;
  
  strong {
    display: block;
    margin-bottom: 5px;
    font-size: 1.1rem;
  }
  
  p {
    margin: 0;
    color: #bdc3c7;
    font-size: 0.9rem;
  }
`;

export const SectionContent = styled.div`
  animation: fadeIn 0.3s ease;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  margin-top: 20px;
`;

export const FeatureCard = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 25px;
  border: 1px solid #e1e5e9;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

export const FeatureIcon = styled.div<FeatureIconProps>`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: ${props => props.$color}15;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$color};
  font-size: 1.8rem;
  margin-bottom: 20px;
`;

export const FeatureTitle = styled.h3`
  color: #2c3e50;
  font-size: 1.3rem;
  margin: 0 0 10px 0;
  font-weight: 600;
`;

export const FeatureDescription = styled.p`
  color: #7f8c8d;
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
`;

export const EmptySection = styled.div`
  text-align: center;
  padding: 60px 20px;
  
  h3 {
    color: #2c3e50;
    font-size: 1.5rem;
    margin: 20px 0 10px 0;
    font-weight: 600;
  }
  
  p {
    color: #7f8c8d;
    margin: 0;
    font-size: 1rem;
    max-width: 400px;
    margin: 0 auto;
  }
`;

export const EmptyIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3498db;
  font-size: 2.5rem;
  margin: 0 auto 20px;
  border: 2px dashed #e1e5e9;
`;

// Additional Dashboard Components
export const SectionHeader = styled.div`
  margin-bottom: 30px;
  
  h2 {
    color: #2c3e50;
    font-size: 1.8rem;
    margin: 0 0 10px 0;
    font-weight: 600;
  }
  
  p {
    color: #7f8c8d;
    margin: 0;
    font-size: 1rem;
  }
`;

export const FormSectionHeader = styled(SectionHeader)`
  h2 {
    color: white;
  }
  
  p {
    color: rgba(255, 255, 255, 0.8);
  }
`;

export const DashboardSection = styled.section`
  margin-bottom: 40px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const QuickActions = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const QuickActionButton = styled.button`
  flex: 1;
  background: #3498db;
  color: white;
  border: none;
  padding: 15px 20px;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  
  &:hover {
    background: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

export const SystemStatus = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 30px;
`;

export const StatusIndicator = styled.div<{ $status: 'online' | 'offline' | 'warning' }>`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  
  &::before {
    content: '';
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${props => 
      props.$status === 'online' ? '#2ecc71' : 
      props.$status === 'warning' ? '#f39c12' : '#e74c3c'};
  }
  
  span {
    color: #2c3e50;
    font-weight: 600;
    font-size: 1.1rem;
  }
`;

export const StatusDetails = styled.div`
  color: #7f8c8d;
  font-size: 0.9rem;
  line-height: 1.5;
`;

export const RecentUpdates = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 25px;
`;

export const UpdateItem = styled.div`
  padding: 15px 0;
  border-bottom: 1px solid #e1e5e9;
  
  &:last-child {
    border-bottom: none;
  }
`;

export const UpdateTitle = styled.h4`
  color: #2c3e50;
  margin: 0 0 5px 0;
  font-size: 1rem;
  font-weight: 600;
`;

export const UpdateMeta = styled.div`
  color: #7f8c8d;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const UpdateTime = styled.span`
  color: #95a5a6;
`;

export const UpdateAuthor = styled.span`
  color: #3498db;
  font-weight: 500;
`;

export const DashboardWelcome = styled.div`
  background: linear-gradient(135deg, #3498db, #2ecc71);
  color: white;
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 8px 25px rgba(52, 152, 219, 0.3);
  
  h2 {
    margin: 0 0 10px 0;
    font-size: 1.8rem;
    font-weight: 700;
  }
  
  p {
    margin: 0;
    opacity: 0.9;
    font-size: 1.1rem;
  }
`;