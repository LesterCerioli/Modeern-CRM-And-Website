import styled from "styled-components";

export const Container = styled.section`
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border-radius: 24px;
  padding: 64px 48px;
  margin: 80px 0;
  color: white;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%);
  }
  
  @media (max-width: 768px) {
    padding: 48px 24px;
    margin: 64px 0;
    border-radius: 16px;
  }
`;

export const Content = styled.div`
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

export const Icon = styled.div`
  font-size: 48px;
  margin-bottom: 24px;
  display: inline-block;
  animation: float 3s ease-in-out infinite;
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
  
  @media (max-width: 768px) {
    font-size: 40px;
    margin-bottom: 20px;
  }
`;

export const TextContent = styled.div`
  margin-bottom: 40px;
`;

export const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0 0 16px 0;
  background: linear-gradient(90deg, #60a5fa, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const Description = styled.p`
  font-size: 1.125rem;
  line-height: 1.6;
  color: #cbd5e1;
  max-width: 600px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const Form = styled.form`
  margin-bottom: 32px;
`;

export const InputWrapper = styled.div`
  display: flex;
  max-width: 500px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  
  &:focus-within {
    border-color: #60a5fa;
    box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.2);
    background: rgba(255, 255, 255, 0.15);
  }
  
  @media (max-width: 640px) {
    flex-direction: column;
    background: transparent;
    border: none;
    padding: 0;
    gap: 12px;
    
    &:focus-within {
      border: none;
      box-shadow: none;
      background: transparent;
    }
  }
`;

export const EmailIcon = styled.span`
  display: flex;
  align-items: center;
  padding: 0 12px;
  color: #94a3b8;
  
  @media (max-width: 640px) {
    display: none;
  }
`;

export const Input = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  padding: 16px;
  color: white;
  font-size: 1rem;
  min-width: 0;
  
  &::placeholder {
    color: #94a3b8;
  }
  
  &:focus {
    outline: none;
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  @media (max-width: 640px) {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    padding: 14px;
    
    &:focus {
      border-color: #60a5fa;
      box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.2);
    }
  }
`;

export const SubmitButton = styled.button`
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #2563eb, #7c3aed);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  @media (max-width: 640px) {
    width: 100%;
    min-width: 0;
    padding: 14px 24px;
  }
`;

export const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const ErrorMessage = styled.div`
  color: #f87171;
  font-size: 0.875rem;
  margin-top: 12px;
  padding: 8px 12px;
  background: rgba(248, 113, 113, 0.1);
  border-radius: 6px;
  display: inline-block;
`;

export const SuccessMessage = styled.div`
  color: #4ade80;
  font-size: 0.875rem;
  margin-top: 12px;
  padding: 8px 12px;
  background: rgba(74, 222, 128, 0.1);
  border-radius: 6px;
  display: inline-block;
`;

export const PrivacyNote = styled.p`
  font-size: 0.875rem;
  color: #94a3b8;
  margin-bottom: 32px;
  line-height: 1.6;
`;

export const PrivacyLink = styled.a`
  color: #60a5fa;
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const Stats = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
  flex-wrap: wrap;
  
  @media (max-width: 640px) {
    gap: 24px;
  }
`;

export const Stat = styled.div`
  text-align: center;
`;

export const StatNumber = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #60a5fa;
  margin-bottom: 4px;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

export const StatLabel = styled.div`
  font-size: 0.875rem;
  color: #cbd5e1;
`;

export const StatDivider = styled.div`
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  
  @media (max-width: 640px) {
    height: 20px;
    width: 40px;
    background: transparent;
  }
`;