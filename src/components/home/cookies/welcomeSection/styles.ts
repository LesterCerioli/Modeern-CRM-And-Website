import styled from "styled-components";

export const Container = styled.section`
  padding: 100px 0;
  text-align: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

export const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const Title = styled.h1`
  font-size: 3rem;
  color: #333;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const Subtitle = styled.h2`
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 30px;
  font-weight: 400;
`;

export const Description = styled.p`
  font-size: 1.1rem;
  color: #777;
  line-height: 1.6;
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
`;

export const PrimaryButton = styled.button`
  background: #667eea;
  color: white;
  
  &:hover {
    background: #5a67d8;
  }
`;

export const SecondaryButton = styled.button`
  background: transparent;
  color: #667eea;
  border: 2px solid #667eea;
  
  &:hover {
    background: rgba(102, 126, 234, 0.1);
  }
`;