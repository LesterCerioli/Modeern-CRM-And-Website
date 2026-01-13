import styled from "styled-components";

export const Container = styled.section`
  padding: 100px 0;
  background: #f8fafc;
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
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

export const TimelineWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  padding: 0 20px;
  
  &:before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 3px;
    height: 100%;
    background: linear-gradient(to bottom, #667eea, #764ba2);
    
    @media (max-width: 768px) {
      left: 30px;
    }
  }
`;

export const TimelineItem = styled.div<{ $isEven: boolean }>`
  display: flex;
  margin-bottom: 60px;
  position: relative;
  align-items: center;
  flex-direction: ${props => props.$isEven ? 'row' : 'row-reverse'};
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    margin-left: 60px;
    margin-bottom: 40px;
  }
`;

export const YearCircle = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
    position: absolute;
    left: -60px;
  }
`;

export const Year = styled.div`
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

export const ContentCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  width: calc(50% - 80px);
  margin: 0 40px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
    margin-top: 20px;
  }
`;

export const ItemTitle = styled.h3`
  color: #1a202c;
  font-size: 1.5rem;
  margin-bottom: 10px;
  font-weight: 600;
`;

export const ItemDescription = styled.p`
  color: #4a5568;
  line-height: 1.6;
  font-size: 1rem;
`;