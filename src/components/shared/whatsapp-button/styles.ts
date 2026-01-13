import styled from "styled-components";

export const WhatsAppButtonContainer = styled.a`
  position: fixed;
  bottom: 100px;
  right: 30px;
  background-color: #25D366;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 20px;
  border-radius: 50px;
  text-decoration: none;
  box-shadow: 0 4px 20px rgba(37, 211, 102, 0.3);
  transition: all 0.3s ease;
  z-index: 999;
  
  &:hover {
    background-color: #128C7E;
    transform: translateY(-3px);
    box-shadow: 0 6px 25px rgba(37, 211, 102, 0.4);
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;

export const WhatsAppIcon = styled.div`
  width: 28px;
  height: 28px;
  margin-right: 10px;
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

export const ButtonText = styled.span`
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 0.5px;
`;