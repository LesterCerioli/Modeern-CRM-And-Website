import styled from "styled-components";

export const Container = styled.section`
  margin: 64px 0;
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 48px;
`;

export const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 12px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.125rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const PostCard = styled.article`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1);
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  height: 280px;
  overflow: hidden;
`;

export const PostImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${PostCard}:hover & {
    transform: scale(1.05);
  }
`;

export const CategoryBadge = styled.span`
  position: absolute;
  top: 20px;
  left: 20px;
  background: #3b82f6;
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
`;

export const Content = styled.div`
  padding: 32px;
`;

export const PostDate = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const PostTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 16px;
  line-height: 1.4;
`;

export const PostExcerpt = styled.p`
  font-size: 1rem;
  color: #475569;
  line-height: 1.6;
  margin-bottom: 24px;
`;

export const ReadMore = styled.a`
  display: inline-flex;
  align-items: center;
  color: #3b82f6;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: #1d4ed8;
  }
`;