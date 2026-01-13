import styled from "styled-components";

export const Container = styled.div`
  margin: 32px 0;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
  
  @media (max-width: 768px) {
    gap: 24px;
  }
`;

export const PostCard = styled.article`
  background: white;
  border-radius: 12px;
  padding: 32px;
  border: 1px solid #f1f5f9;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    border-color: #e0e7ff;
    box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.08);
    transform: translateY(-2px);
    
    &::before {
      transform: translateX(0);
    }
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
    transform: translateX(-4px);
    transition: transform 0.3s ease;
  }
`;

export const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  
  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

export const CategoryTag = styled.span`
  background: #eff6ff;
  color: #1d4ed8;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.2s ease;
  
  ${PostCard}:hover & {
    background: #dbeafe;
  }
`;

export const PostDate = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.875rem;
  color: #64748b;
`;

export const CalendarIcon = styled.span`
  &::before {
    content: '📅';
    font-size: 0.875rem;
  }
`;

export const PostTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 16px 0;
  line-height: 1.4;
  cursor: pointer;
  transition: color 0.2s ease;
  
  &:hover {
    color: #3b82f6;
  }
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

export const PostExcerpt = styled.p`
  font-size: 1rem;
  color: #475569;
  line-height: 1.6;
  margin: 0 0 24px 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const PostFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #f1f5f9;
  
  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

export const ReadTime = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.875rem;
  color: #64748b;
`;

export const ClockIcon = styled.span`
  &::before {
    content: '⏱️';
    font-size: 0.875rem;
  }
`;

export const ReadMoreButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  color: #3b82f6;
  font-weight: 600;
  font-size: 0.9375rem;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    background: #eff6ff;
    color: #1d4ed8;
  }
  
  @media (max-width: 640px) {
    width: 100%;
    justify-content: center;
  }
`;

export const ArrowIcon = styled.span`
  &::before {
    content: '→';
    transition: transform 0.2s ease;
  }
  
  ${ReadMoreButton}:hover &::before {
    transform: translateX(4px);
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 64px 32px;
  background: white;
  border-radius: 12px;
  border: 2px dashed #e2e8f0;
`;

export const EmptyStateIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

export const EmptyStateTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 8px 0;
`;

export const EmptyStateText = styled.p`
  color: #64748b;
  max-width: 400px;
  margin: 0 auto;
  line-height: 1.6;
`;