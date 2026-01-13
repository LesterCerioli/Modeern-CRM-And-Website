import styled from "styled-components";

export const ArticleModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const ArticleOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
`;

export const ArticleContent = styled.div`
  position: relative;
  background: white;
  border-radius: 20px;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 40px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: slideUp 0.3s ease;
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @media (max-width: 768px) {
    padding: 24px;
    border-radius: 16px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: #f1f5f9;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.5rem;
  color: #64748b;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background: #e2e8f0;
    color: #475569;
  }
`;

export const ArticleHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

// REMOVA A PROP variant E DEIXE FIXO
export const ArticleBadge = styled.span`
  display: inline-block;
  background: #2563eb; /* Azul fixo para React */
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 700;
  margin-bottom: 16px;
`;

export const ArticleTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 16px;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const ArticleMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #64748b;
  font-size: 0.9375rem;
`;

export const DotDivider = styled.span`
  color: #cbd5e1;
`;

export const ArticleBody = styled.div`
  font-size: 1.125rem;
  line-height: 1.8;
  color: #334155;
  
  p {
    margin-bottom: 24px;
  }
  
  strong {
    color: #0f172a;
    font-weight: 600;
  }
`;

export const LeadParagraph = styled.p`
  font-size: 1.25rem;
  color: #475569;
  font-weight: 500;
  margin-bottom: 32px !important;
`;

export const Section = styled.div`
  margin: 48px 0;
  
  &:first-of-type {
    margin-top: 0;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 2px solid #e2e8f0;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const Subsection = styled.div`
  margin-top: 20px;
`;

export const Subtitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
`;

export const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 20px 0;
`;

export const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #475569;
  
  &::before {
    content: "✓";
    color: #2563eb;
    font-weight: bold;
  }
`;

export const BulletList = styled.ul`
  margin: 16px 0 24px 24px;
  
  li {
    margin-bottom: 12px;
    color: #475569;
    line-height: 1.6;
    
    code {
      background: #f1f5f9;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
      font-size: 0.875rem;
      color: #dc2626;
    }
  }
`;

export const CalloutBox = styled.div`
  background: #eff6ff;
  border-left: 4px solid #2563eb;
  padding: 20px;
  border-radius: 8px;
  margin: 24px 0;
  
  strong {
    color: #1e40af;
  }
`;

// ADICIONE ESTE COMPONENTE QUE ESTÁ FALTANDO
export const WarningBox = styled.div`
  background: #fef3c7;
  border-left: 4px solid #f59e0b;
  padding: 20px;
  border-radius: 8px;
  margin: 24px 0;
  color: #92400e;
  
  strong {
    color: #b45309;
  }
`;

export const Highlight = styled.span`
  background: linear-gradient(120deg, #dbeafe 0%, #dbeafe 100%);
  background-repeat: no-repeat;
  background-size: 100% 40%;
  background-position: 0 90%;
  padding: 0 2px;
  color: #1e40af;
  font-weight: 600;
`;

export const CodeBlock = styled.pre`
  background: #1e293b;
  color: #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  margin: 24px 0;
  font-family: 'Courier New', monospace;
  font-size: 0.9375rem;
  line-height: 1.5;
  overflow-x: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  
  code {
    background: transparent;
    color: inherit;
    padding: 0;
    font-family: inherit;
  }
`;

export const FinalCallout = styled.div`
  background: linear-gradient(135deg, #dbeafe, #eff6ff);
  border: 2px solid #3b82f6;
  padding: 24px;
  border-radius: 12px;
  margin: 40px 0;
  text-align: center;
  
  strong {
    font-size: 1.125rem;
    color: #1e40af;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid #e2e8f0;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ShareButton = styled.button<{ linkedin?: boolean }>`
  padding: 12px 24px;
  border-radius: 8px;
  border: 2px solid ${({ linkedin }) => linkedin ? '#0a66c2' : '#1da1f2'};
  background: white;
  color: ${({ linkedin }) => linkedin ? '#0a66c2' : '#1da1f2'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ linkedin }) => linkedin ? '#f0f7ff' : '#f0f9ff'};
  }
`;

export const CloseArticleButton = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  border: 2px solid #64748b;
  background: white;
  color: #64748b;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-left: auto;
  
  &:hover {
    background: #f8fafc;
  }
  
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;