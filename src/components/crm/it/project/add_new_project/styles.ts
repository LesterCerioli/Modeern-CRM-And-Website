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

export const SectionTitle = styled.h3`
  color: white;
  font-size: 1.1rem;
  margin: 0 0 15px 0;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &::before {
    content: '';
    display: block;
    width: 4px;
    height: 16px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
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

export const InputWithIcon = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  
  ${Input}, ${TextArea}, ${Select} {
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

// ===== NOVOS ESTILOS PARA A TAG VERDE DE SUCESSO =====

export const SuccessCard = styled.div`
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 10px 25px -5px rgba(16, 185, 129, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  animation: slideIn 0.3s ease-out;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #10b981, #34d399, #10b981);
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  &:hover {
    transform: translateY(-2px);
    transition: transform 0.3s ease;
    box-shadow: 0 15px 30px -5px rgba(16, 185, 129, 0.3);
  }
  
  @media (max-width: 768px) {
    padding: 20px;
    margin-bottom: 20px;
  }
`;

export const SuccessHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }
`;

export const SuccessIcon = styled.div`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  animation: pulseSuccess 2s infinite;
  
  svg {
    width: 24px;
    height: 24px;
    stroke: white;
    stroke-width: 2.5;
  }
  
  @keyframes pulseSuccess {
    0% {
      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
    }
  }
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export const SuccessTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  flex: 1;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

export const SuccessDetails = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 16px;
  backdrop-filter: blur(10px);
  
  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    padding: 10px 0;
  }
`;

export const DetailLabel = styled.span`
  font-weight: 600;
  font-size: 0.95rem;
  opacity: 0.9;
  letter-spacing: 0.3px;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    opacity: 0.8;
  }
`;

export const DetailValue = styled.span`
  font-weight: 700;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.1);
  padding: 8px 12px;
  border-radius: 8px;
  min-width: 200px;
  justify-content: space-between;
  
  @media (max-width: 768px) {
    width: 100%;
    min-width: auto;
    padding: 6px 10px;
    font-size: 0.95rem;
  }
`;

export const CopyButton = styled.button`
  background: rgba(255, 255, 255, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
  
  &:hover {
    background: rgba(255, 255, 255, 0.35);
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0) scale(0.95);
  }
  
  svg {
    stroke: white;
    width: 16px;
    height: 16px;
  }
  
  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
    
    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

export const SuccessFooter = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }
`;

export const SuccessMessage = styled.p`
  font-size: 0.95rem;
  opacity: 0.9;
  margin: 0;
  line-height: 1.5;
  flex: 1;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const SuccessActions = styled.div`
  display: flex;
  gap: 10px;
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

export const ViewProjectButton = styled.button`
  background: rgba(255, 255, 255, 0.25);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.4);
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.35);
    transform: translateY(-2px);
  }
  
  svg {
    width: 16px;
    height: 16px;
    stroke: white;
  }
`;

export const CreateAnotherButton = styled.button`
  background: transparent;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.4);
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }
  
  svg {
    width: 16px;
    height: 16px;
    stroke: white;
  }
`;

export const SuccessBadge = styled.div`
  position: absolute;
  top: -10px;
  right: 20px;
  background: #dc2626;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: badgeBounce 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  
  @keyframes badgeBounce {
    0% {
      transform: scale(0.5) translateY(-20px);
    }
    50% {
      transform: scale(1.1) translateY(0);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }
  
  @media (max-width: 768px) {
    position: relative;
    top: 0;
    right: 0;
    margin-bottom: 10px;
    align-self: flex-end;
  }
`;

export const Timestamp = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  
  span:first-child {
    color: #7f8c8d;
    font-size: 0.8rem;
    font-weight: 500;
  }
  
  span:last-child {
    color: #2c3e50;
    font-size: 0.85rem;
    font-weight: 600;
  }
`;
export const ProjectTimestamps = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #f1f1f1;
`;
export const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
export const StatCard = styled.div<{ $type: 'total' | 'active' | 'deleted' }>`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  text-align: center;
  border-top: 4px solid ${props => 
    props.$type === 'total' ? '#3498db' : 
    props.$type === 'active' ? '#2ecc71' : 
    '#e74c3c'};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  }
  
  h3 {
    margin: 0 0 8px 0;
    color: #2c3e50;
    font-size: 2rem;
    font-weight: 700;
  }
  
  p {
    margin: 0;
    color: #7f8c8d;
    font-size: 0.9rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;
export const LoadingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: #7f8c8d;
  text-align: center;
  
  svg {
    width: 48px;
    height: 48px;
    color: #3498db;
    margin-bottom: 16px;
    animation: spin 1s linear infinite;
  }
  
  span {
    font-size: 1rem;
    font-weight: 500;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
export const ProjectDetails = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
export const ProjectDetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #f1f1f1;
  
  &:last-child {
    border-bottom: none;
  }
`;
export const AgileMethodBadge = styled.span<{ $method: 'Scrum' | 'SAFe' | 'Kanban' | 'Other' }>`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: ${props => {
    switch(props.$method) {
      case 'Scrum': return 'rgba(52, 152, 219, 0.1)';
      case 'SAFe': return 'rgba(155, 89, 182, 0.1)';
      case 'Kanban': return 'rgba(46, 204, 113, 0.1)';
      default: return 'rgba(127, 140, 141, 0.1)';
    }
  }};
  color: ${props => {
    switch(props.$method) {
      case 'Scrum': return '#3498db';
      case 'SAFe': return '#9b59b6';
      case 'Kanban': return '#2ecc71';
      default: return '#7f8c8d';
    }
  }};
  border: 1px solid ${props => {
    switch(props.$method) {
      case 'Scrum': return 'rgba(52, 152, 219, 0.2)';
      case 'SAFe': return 'rgba(155, 89, 182, 0.2)';
      case 'Kanban': return 'rgba(46, 204, 113, 0.2)';
      default: return 'rgba(127, 140, 141, 0.2)';
    }
  }};
`;
export const ProjectCardFooter = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #f1f1f1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const ProjectActions = styled.div`
  display: flex;
  gap: 8px;
`;
export const ActionButton = styled.button<{ $variant: 'view' | 'edit' | 'delete' }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid ${props => {
    switch(props.$variant) {
      case 'view': return '#3498db';
      case 'edit': return '#2ecc71';
      case 'delete': return '#e74c3c';
      default: return '#e1e5e9';
    }
  }};
  background: ${props => {
    switch(props.$variant) {
      case 'view': return 'rgba(52, 152, 219, 0.1)';
      case 'edit': return 'rgba(46, 204, 113, 0.1)';
      case 'delete': return 'rgba(231, 76, 60, 0.1)';
      default: return '#f8f9fa';
    }
  }};
  color: ${props => {
    switch(props.$variant) {
      case 'view': return '#3498db';
      case 'edit': return '#27ae60';
      case 'delete': return '#e74c3c';
      default: return '#2c3e50';
    }
  }};
  
  &:hover {
    background: ${props => {
      switch(props.$variant) {
        case 'view': return '#3498db';
        case 'edit': return '#2ecc71';
        case 'delete': return '#e74c3c';
        default: return '#e1e5e9';
      }
    }};
    color: white;
    transform: translateY(-1px);
  }
  
  svg {
    width: 14px;
    height: 14px;
  }
`;
export const ProjectsSection = styled.section`
  margin-top: 40px;
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  
  @media (max-width: 768px) {
    padding: 20px;
    margin-top: 30px;
  }
`;
export const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
export const ProjectCard = styled.div<{ $status: 'active' | 'inactive' | 'deleted' }>`
  background: ${props => props.$status === 'deleted' ? '#f8f9fa' : 'white'};
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  border-left: 4px solid ${props => 
    props.$status === 'active' ? '#2ecc71' : 
    props.$status === 'inactive' ? '#f39c12' : 
    '#e74c3c'};
  transition: all 0.3s ease;
  position: relative;
  opacity: ${props => props.$status === 'deleted' ? 0.8 : 1};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  }
`;
export const ProjectDescription = styled.p`
  color: #7f8c8d;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0 0 15px 0;
`;
export const ProjectCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
  gap: 15px;
`;
export const ProjectInfo = styled.div`
  flex: 1;
`;
export const ProjectName = styled.h3`
  margin: 0 0 5px 0;
  color: #2c3e50;
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.3;
`;
export const ProjectCode = styled.div`
  color: #3498db;
  font-size: 0.9rem;
  font-weight: 600;
  background: rgba(52, 152, 219, 0.1);
  padding: 4px 10px;
  border-radius: 20px;
  display: inline-block;
`;
export const ProjectStatusBadge = styled.span<{ $status: 'active' | 'inactive' | 'deleted' }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: ${props => 
    props.$status === 'active' ? 'rgba(46, 204, 113, 0.15)' : 
    props.$status === 'inactive' ? 'rgba(243, 156, 18, 0.15)' : 
    'rgba(231, 76, 60, 0.15)'};
  color: ${props => 
    props.$status === 'active' ? '#27ae60' : 
    props.$status === 'inactive' ? '#f39c12' : 
    '#e74c3c'};
  border: 1px solid ${props => 
    props.$status === 'active' ? 'rgba(46, 204, 113, 0.3)' : 
    props.$status === 'inactive' ? 'rgba(243, 156, 18, 0.3)' : 
    'rgba(231, 76, 60, 0.3)'};
`;
export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
`;
export const SectionControls = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  
  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    gap: 10px;
  }
`;
export const FilterSelect = styled.select`
  padding: 10px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #2c3e50;
  background: white;
  cursor: pointer;
  transition: all 0.3s;
  min-width: 150px;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  }
`;
export const RefreshButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #3498db;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background: #2980b9;
    transform: translateY(-2px);
  }
  
  &:disabled {
    background: #95a5a6;
    cursor: not-allowed;
    transform: none;
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;