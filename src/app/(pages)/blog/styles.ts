import styled from "styled-components";

export const Container = styled.div`
  background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
  padding-bottom: 80px;
`;

export const Hero = styled.section`
  text-align: center;
  padding: 72px 24px 48px;

  h1 {
    font-size: 3rem;
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 12px;
  }

  p {
    font-size: 1.125rem;
    color: #64748b;
  }
`;


export const FeaturedGrid = styled.section`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;


export const FeaturedCard = styled.article`
  background: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12);
  }
`;


export const ImageWrapper = styled.div`
  position: relative;
  height: 260px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;


export const Badge = styled.span<{ variant?: "javascript" | "react" | "ai" | "b2b" }>`
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  color: #ffffff;
  background: ${({ variant }) =>
    variant === "react" ? "#3b82f6" : "#2563eb"};
`;


export const CardContent = styled.div`
  padding: 28px;

  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #0f172a;
    margin: 12px 0;
    line-height: 1.3;
  }

  p {
    font-size: 1rem;
    color: #475569;
    line-height: 1.7;
    margin-bottom: 20px;
  }
`;

export const Meta = styled.div`
  font-size: 0.875rem;
  color: #94a3b8;
`;

export const ReadMore = styled.a`
  font-weight: 600;
  color: #2563eb;
  text-decoration: none;
  display: inline-block;
  margin-top: 8px;

  &:hover {
    text-decoration: underline;
  }
`;


export const ReadMoreButton = styled.button`
  display: block;
  width: 100%;
  background: #2563eb;
  color: white;
  border: none;
  padding: 14px 24px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 20px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-align: center;
  
  &:hover {
    background: #1d4ed8;
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(37, 99, 235, 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
`;