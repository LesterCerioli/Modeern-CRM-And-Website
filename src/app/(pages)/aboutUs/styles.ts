import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  color: #fff;

  button {
    text-transform: uppercase;
    padding: 14px 28px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 0.08em;
    transition: all 0.2s ease-in-out;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    }
  }
`;

export const MainContent = styled.main`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px;
  color: #fff;

  & > section {
    margin-bottom: 100px;
  }
`;

export const CookiesWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;

export const PageBackground = styled.div`
  background-color: #FFA500;
  color: #320909ff;
  min-height: 100vh;
`;

export const GreenWelcomeWrapper = styled.div`
  background-color: rgba(161, 23, 10, 1);
  color: #860e0eff;
  
  
  padding: 80px 20px;
  
  
  {
    color: #fff !important;
  }
  
  
  h1, h2, h3, h4, h5, h6,
  p, span, div {
    color: #fff;
  }
`;