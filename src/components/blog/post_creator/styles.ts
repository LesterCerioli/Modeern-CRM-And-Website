import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 30px;
  background-color: orange; /* Changed to orange */
  border-radius: 8px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  border: 1px solid #e0e0e0;
  color: white; /* Added white text color */
`;

export const Title = styled.h1`
  color: white; /* Changed to white */
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3); /* Lightened border for contrast */
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-weight: 600;
  color: white; /* Changed to white */
  font-size: 14px;
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.3s;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
  }
  
  &::placeholder {
    color: #9ca3af;
    font-style: italic;
  }
`;

export const TextArea = styled.textarea`
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  min-height: 150px;
  transition: all 0.3s;
  background-color: white;
  line-height: 1.5;
  
  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
  }
  
  &::placeholder {
    color: #9ca3af;
    font-style: italic;
  }
`;

export const UploadContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const UploadButton = styled.label`
  background-color: white;
  color: #374151;
  border: 1px solid #d1d5db;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s;
  
  &:hover {
    background-color: #e5e7eb;
    border-color: #9ca3af;
  }
`;

export const UploadInput = styled.input`
  display: none;
`;

export const ImagePreview = styled.div`
  margin-top: 15px;
  
  img {
    max-width: 200px;
    max-height: 200px;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    padding: 5px;
    background-color: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
`;

// Novos estilos para os botões de publicação
export const PublishOptionsContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 10px;
`;

export const PublishOptionButton = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 14px;
  background-color: ${props => props.active ? '#4a90e2' : 'white'};
  color: ${props => props.active ? 'white' : '#374151'};
  border: 1px solid ${props => props.active ? '#4a90e2' : '#d1d5db'};
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
  text-align: center;
  
  &:hover {
    background-color: ${props => props.active ? '#3a80d2' : '#e5e7eb'};
    border-color: ${props => props.active ? '#3a80d2' : '#9ca3af'};
  }
`;

export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

export const ToggleLabel = styled.span`
  font-weight: 600;
  color: white; /* Changed to white */
  font-size: 14px;
  min-width: 40px;
`;

export const ToggleSwitch = styled.div<{ active: boolean }>`
  cursor: pointer;
  width: 100px;
  
  .toggle-slider {
    position: relative;
    height: 34px;
    background-color: ${props => props.active ? '#e5e7eb' : '#f3f4f6'};
    border-radius: 17px;
    border: 2px solid ${props => props.active ? '#4a90e2' : '#d1d5db'};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
    
    .toggle-on, .toggle-off {
      font-weight: bold;
      font-size: 12px;
      z-index: 1;
      transition: color 0.3s;
    }
    
    .toggle-on {
      color: ${props => props.active ? '#4a90e2' : '#9ca3af'};
    }
    
    .toggle-off {
      color: ${props => !props.active ? '#6b7280' : '#9ca3af'};
    }
    
    .toggle-handle {
      position: absolute;
      width: 46px;
      height: 26px;
      background-color: ${props => props.active ? '#4a90e2' : '#6b7280'};
      border-radius: 13px;
      transition: all 0.3s;
      top: 2px;
      
      &.on {
        left: 2px;
      }
      
      &.off {
        left: calc(100% - 48px);
      }
    }
  }
`;

export const DateTimeSection = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  margin-top: 10px;
`;

export const DateTimeRow = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 15px;
  
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const TimeContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 5px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 30px;
  padding-top: 25px;
  border-top: 1px solid rgba(255, 255, 255, 0.3); /* Lightened border */
`;

export const ActionButton = styled.button<{ variant: 'primary' | 'secondary' }>`
  flex: 1;
  padding: 14px 24px;
  background-color: ${props => props.variant === 'primary' ? '#4a90e2' : 'white'};
  color: ${props => props.variant === 'primary' ? 'white' : '#374151'};
  border: 1px solid ${props => props.variant === 'primary' ? '#4a90e2' : '#d1d5db'};
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background-color: ${props => props.variant === 'primary' ? '#3a80d2' : '#e5e7eb'};
    border-color: ${props => props.variant === 'primary' ? '#3a80d2' : '#9ca3af'};
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.3); /* Lightened border */
  color: white; /* Changed to white */
  font-size: 14px;
`;

// Toast Components
export const ToastContainer = styled.div<{ type: 'success' | 'error' | 'info' }>`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: ${props => {
    switch (props.type) {
      case 'success': return '#10b981';
      case 'error': return '#ef4444';
      case 'info': return '#3b82f6';
      default: return '#10b981';
    }
  }};
  color: white;
  padding: 16px 24px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  animation: ${slideIn} 0.3s ease-out;
  min-width: 300px;
  max-width: 400px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

export const ToastIcon = styled.div<{ type: 'success' | 'error' | 'info' }>`
  font-size: 18px;
  font-weight: bold;
  background: rgba(255, 255, 255, 0.2);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:before {
    content: '${props => {
      switch (props.type) {
        case 'success': return '✓';
        case 'error': return '✗';
        case 'info': return 'ℹ';
        default: return '✓';
      }
    }}';
  }
`;

export const ToastMessage = styled.div`
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
`;

export const ToastCloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

// Period Button for AM/PM
export const PeriodButton = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  background-color: ${props => props.active ? '#4a90e2' : 'white'};
  color: ${props => props.active ? 'white' : '#374151'};
  border: 1px solid ${props => props.active ? '#4a90e2' : '#d1d5db'};
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.active ? '#3a80d2' : '#e5e7eb'};
  }
`;