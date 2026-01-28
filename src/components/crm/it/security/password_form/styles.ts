// styles.ts - VERSÃO CORRIGIDA
'use client';

import styled from 'styled-components';

export const CredentialSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 25px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

export const SectionTitle = styled.h2`
  font-size: 22px;
  color: #2c3e50;
  margin-bottom: 25px;
  font-weight: 600;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormRow = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

export const FormGroup = styled.div`
  flex: 1;
  min-width: 200px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #2c3e50;
  font-weight: 500;
  font-size: 14px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  box-sizing: border-box;
  background-color: white;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 10px;
  padding-top: 20px;
  border-top: 1px solid #eee;
`;

export const PrimaryButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  
  &:hover {
    background-color: #2980b9;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const SecondaryButton = styled.button`
  background-color: #95a5a6;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  
  &:hover {
    background-color: #7f8c8d;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
    transform: none;
  }
`;

export const TableContainer = styled.div`
  margin-top: 30px;
  border-top: 1px solid #eee;
  padding-top: 25px;
`;

export const TableTitle = styled.h3`
  font-size: 18px;
  color: #2c3e50;
  margin-bottom: 20px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #eee;
`;

export const TableHeader = styled.thead`
  background-color: #f8f9fa;
`;

export const TableHeaderCell = styled.th`
  padding: 15px;
  text-align: left;
  color: #2c3e50;
  font-weight: 600;
  font-size: 14px;
  border-bottom: 2px solid #eee;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #eee;
  
  &:hover {
    background-color: #f9f9f9;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

export const TableCell = styled.td`
  padding: 15px;
  color: #555;
  font-size: 14px;
`;

export const PasswordDisplay = styled.span`
  letter-spacing: 3px;
  font-family: monospace;
  font-size: 14px;
  color: #333;
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 5px 8px;
  border-radius: 3px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f0f0f0;
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

interface NotificationBannerProps {
  $type: 'success' | 'error' | 'warning' | 'info' | null;
}

export const AddButton = styled(ActionButton)`
  color: #27ae60;
  margin-right: 10px;
`;

export const DeleteButton = styled(ActionButton)`
  color: #e74c3c;
`;

export const EmptyState = styled.div`
  background: white;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  color: #7f8c8d;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  
  h4 {
    font-size: 18px;
    margin: 0 0 10px 0;
    color: #2c3e50;
  }
  
  p {
    margin: 0;
    font-size: 1.1rem;
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
  
  border-left: 4px solid ${props => {
    switch (props.$type) {
      case 'success': return '#2ecc71';
      case 'error': return '#e74c3c';
      case 'warning': return '#f39c12';
      case 'info': return '#3498db';
      default: return '#3498db';
    }
  }};
  
  svg {
    width: 20px;
    height: 20px;
    color: ${props => {
      switch (props.$type) {
        case 'success': return '#2ecc71';
        case 'error': return '#e74c3c';
        case 'warning': return '#f39c12';
        case 'info': return '#3498db';
        default: return '#3498db';
      }
    }};
  }
  
  span {
    color: ${props => {
      switch (props.$type) {
        case 'success': return '#27ae60';
        case 'error': return '#c0392b';
        case 'warning': return '#d35400';
        case 'info': return '#2980b9';
        default: return '#2c3e50';
      }
    }};
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Adicionando o ErrorMessage que estava faltando
export const ErrorMessage = styled.div`
  background: linear-gradient(135deg, rgba(231, 76, 60, 0.15), rgba(231, 76, 60, 0.05));
  border: 1px solid rgba(231, 76, 60, 0.3);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  color: #c0392b;
  
  h4 {
    margin: 0 0 10px 0;
    font-size: 16px;
    font-weight: 600;
    color: #e74c3c;
  }
  
  p {
    margin: 0 0 15px 0;
  }
  
  button {
    background: #e74c3c;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    
    &:hover {
      background: #c0392b;
    }
  }
`;