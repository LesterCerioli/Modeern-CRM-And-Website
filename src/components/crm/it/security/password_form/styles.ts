// /src/components/crm/it/security/password_form/styles.ts
import styled from 'styled-components';

export const CredentialSection = styled.section`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 25px;
  margin: 20px 0;
  max-width: 1000px;
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  color: #2c3e50;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormRow = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

export const FormGroup = styled.div`
  flex: 1;
  min-width: 200px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #2c3e50;
  font-weight: 500;
  font-size: 14px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  box-sizing: border-box;
  background-color: white;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 10px;
  padding-top: 20px;
  border-top: 1px solid #eee;
`;

export const PrimaryButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  
  &:hover {
    background-color: #2980b9;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export const SecondaryButton = styled.button`
  background-color: #95a5a6;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  
  &:hover {
    background-color: #7f8c8d;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export const TableContainer = styled.div`
  margin-top: 30px;
  border-top: 1px solid #eee;
  padding-top: 25px;
`;

export const TableTitle = styled.h3`
  font-size: 18px;
  color: #2c3e50;
  margin-bottom: 20px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #eee;
`;

export const TableHeader = styled.thead`
  background-color: #f8f9fa;
`;

export const TableHeaderCell = styled.th`
  padding: 15px;
  text-align: left;
  color: #2c3e50;
  font-weight: 600;
  font-size: 14px;
  border-bottom: 2px solid #eee;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #eee;
  
  &:hover {
    background-color: #f9f9f9;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

export const TableCell = styled.td`
  padding: 15px;
  color: #555;
  font-size: 14px;
`;

export const PasswordDisplay = styled.span`
  letter-spacing: 3px;
  font-family: monospace;
  font-size: 14px;
  color: #333;
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 5px 8px;
  border-radius: 3px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f0f0f0;
  }
`;

export const AddButton = styled(ActionButton)`
  color: #27ae60;
  margin-right: 10px;
`;

export const DeleteButton = styled(ActionButton)`
  color: #e74c3c;
`;