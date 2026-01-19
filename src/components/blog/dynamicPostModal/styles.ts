import styled from "styled-components";

export const Overlay = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  padding: 20px;
`;

export const ModalContent = styled.div`
  background: white;
  width: 100%;
  max-width: 900px;
  border-radius: 20px;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`;

// ESTE ESTAVA FALTANDO:
export const HeaderImage = styled.img`
  width: 100%;
  height: 350px;
  object-fit: cover;
  border-radius: 20px 20px 0 0;
`;

// ESTE TAMBÉM É NECESSÁRIO PARA O ESPAÇAMENTO DO TEXTO:
export const ContentBody = styled.div`
  padding: 40px;

  h2 {
    font-size: 2.5rem;
    color: #0f172a;
    margin-bottom: 16px;
  }

  .meta {
    color: #64748b;
    margin-bottom: 20px;
    font-size: 0.875rem;
  }

  .text-content {
    line-height: 1.8;
    color: #475569;
    white-space: pre-wrap;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  
  &:hover {
    background: #f1f5f9;
  }
`;