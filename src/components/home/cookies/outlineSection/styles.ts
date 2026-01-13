import styled from "styled-components";

export const Container = styled.section`
  padding: 100px 0;
  background: white;
  position: relative;
`;

export const Title = styled.h2`
  text-align: center;
  font-size: 3rem;
  color: #1a202c;
  margin-bottom: 15px;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

export const Subtitle = styled.p`
  text-align: center;
  color: #4a5568;
  font-size: 1.2rem;
  margin-bottom: 60px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const OutlineCard = styled.div`
  background: #f8fafc;
  border-radius: 15px;
  padding: 40px 30px;
  text-align: center;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  height: 100%;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border-color: #667eea;
    background: white;
  }
`;

export const IconWrapper = styled.div`
  margin-bottom: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(102, 126, 234, 0.1);
  
  svg {
    stroke-width: 1.5;
  }
`;

export const CardTitle = styled.h3`
  color: #1a202c;
  font-size: 1.5rem;
  margin-bottom: 15px;
  font-weight: 600;
`;

export const CardDescription = styled.p`
  color: #4a5568;
  line-height: 1.6;
  font-size: 1rem;
`;