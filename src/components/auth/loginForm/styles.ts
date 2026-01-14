import styled from "styled-components";
import * as Select from "@radix-ui/react-select";

export const PageContainer = styled.div`
  min-height: 100vh;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

export const Card = styled.div`
  width: 100%;
  max-width: 28rem;
  border: none;
  box-shadow: none;
`;

export const CardHeader = styled.div`
  text-align: center;
  padding-bottom: 0.5rem;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #022b3a;
  margin-bottom: 0.25rem;
`;

export const Description = styled.p`
  color: #5c6b73;
  margin-bottom: 1.5rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #022b3a;
`;

export const Input = styled.input`
  border: 1px solid #bfdbf7;
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  width: 100%;
  outline: none;

  &:focus {
    border-color: #1f7a8c;
    box-shadow: 0 0 0 1px #bfdbf7;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  background-color: #1f7a8c;
  color: white;
  padding: 0.5rem 0;
  border-radius: 0.375rem;
  font-weight: 500;

  &:hover {
    background-color: #022b3a;
  }
`;

export const SelectTrigger = styled(Select.Trigger)`
  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  line-height: 1;
  height: 2.5rem;
  gap: 0.5rem;
  background-color: white;
  border: 1px solid #bfdbf7;
  width: 100%;
  margin-top: 0.25rem;

  &:focus {
    border-color: #1f7a8c;
    box-shadow: 0 0 0 1px #bfdbf7;
  }
`;

export const SelectContent = styled(Select.Content)`
  overflow: hidden;
  background-color: white;
  border-radius: 0.375rem;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2);
  z-index: 1000;
`;

export const SelectViewport = styled(Select.Viewport)`
  padding: 0.25rem;
`;

export const SelectItem = styled(Select.Item)`
  font-size: 1rem;
  line-height: 1;
  color: #022b3a;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  height: 2.25rem;
  padding: 0 2rem 0 1.5rem;
  position: relative;
  user-select: none;

  &[data-highlighted] {
    outline: none;
    background-color: #f0f7fa;
    color: #022b3a;
  }
`;

export const SelectIcon = styled(Select.Icon)`
  color: #5c6b73;
`;