import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  margin: 64px 0 32px;
  padding-top: 32px;
  border-top: 1px solid #f1f5f9;
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const PageButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    border-color: #cbd5e1;
    background: #f8fafc;
    color: #1e293b;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &:focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
`;

export const ChevronLeft = styled.span`
  &::before {
    content: '←';
  }
`;

export const ChevronRight = styled.span`
  &::before {
    content: '→';
  }
`;

export const PageNumbers = styled.div`
  display: flex;
  gap: 4px;
`;

export const PageNumberButton = styled.button<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 40px;
  padding: 0 12px;
  border: 1px solid ${props => props.$isActive ? '#3b82f6' : '#e2e8f0'};
  border-radius: 8px;
  background: ${props => props.$isActive ? '#3b82f6' : 'white'};
  color: ${props => props.$isActive ? 'white' : '#64748b'};
  font-weight: ${props => props.$isActive ? '600' : '500'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    border-color: ${props => props.$isActive ? '#3b82f6' : '#cbd5e1'};
    background: ${props => props.$isActive ? '#2563eb' : '#f8fafc'};
    color: ${props => props.$isActive ? 'white' : '#1e293b'};
  }
  
  &:focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Ellipsis = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: #94a3b8;
  user-select: none;
`;

export const PageInfo = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  text-align: center;
`;

export const CurrentPage = styled.span`
  font-weight: 600;
  color: #1e293b;
`;

// Mobile styles
export const MobilePagination = styled.div`
  display: none;
  
  @media (max-width: 640px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    width: 100%;
  }
`;

export const MobileButtons = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  
  button {
    flex: 1;
  }
`;