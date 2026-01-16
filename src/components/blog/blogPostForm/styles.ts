import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 700px;
  margin: 40px auto;
  padding: 32px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  position: relative;
`;

export const SuccessBanner = styled.div`
  background-color: #10b981; // Verde esmeralda
  color: white;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
  margin-bottom: 20px;
  animation: ${fadeIn} 0.3s ease-out;
`;

export const Title = styled.h2`
  font-size: 1.8rem;
  color: #0f172a;
  margin-bottom: 8px;
  text-align: center;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-weight: 600;
    color: #475569;
    font-size: 0.9rem;
  }
`;

export const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #2563eb;
  }
`;

export const TextArea = styled.textarea`
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  outline: none;

  &:focus {
    border-color: #2563eb;
  }
`;

export const SubmitButton = styled.button`
  background: #2563eb;
  color: white;
  border: none;
  padding: 16px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  margin-top: 10px;

  &:hover {
    background: #1d4ed8;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
  }

  &:disabled {
    background: #94a3b8;
    cursor: not-allowed;
  }
`;