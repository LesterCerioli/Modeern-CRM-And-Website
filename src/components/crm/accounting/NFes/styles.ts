import styled from 'styled-components';

export const Container = styled.div`
  font-family: 'Arial', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

export const Title = styled.h1`
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
  font-weight: 600;
`;

export const UploadSection = styled.div`
  margin-bottom: 30px;
`;

export const UploadBox = styled.div`
  border: 2px dashed #4a90e2;
  border-radius: 8px;
  padding: 40px;
  text-align: center;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f0f8ff;
  }
`;

export const UploadText = styled.p`
  color: #4a90e2;
  font-size: 16px;
  margin: 0;
`;

export const StatusMessage = styled.p`
  color: #28a745;
  font-size: 14px;
  margin-top: 10px;
  font-weight: 500;
`;

export const Separator = styled.hr`
  border: none;
  border-top: 2px solid #ddd;
  margin: 30px 0;
`;

export const SectionTitle = styled.h2`
  color: #333;
  font-size: 20px;
  margin-bottom: 20px;
  font-weight: 600;
`;

export const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 30px;
`;

export const DetailRow = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DetailLabel = styled.span`
  font-weight: 600;
  color: #555;
  margin-bottom: 5px;
  font-size: 14px;
`;

export const DetailValue = styled.span`
  color: #333;
  font-size: 14px;
  background-color: #fff;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
  min-height: 36px;
  display: flex;
  align-items: center;
`;

export const InvoiceCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const InvoiceHeader = styled.h3`
  color: #333;
  font-size: 18px;
  margin-bottom: 15px;
  font-weight: 600;
`;

export const InvoiceContent = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
`;

export const InvoiceNumber = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #333;
  grid-column: 1;
  grid-row: 1;
`;

export const InvoiceDate = styled.div`
  font-size: 16px;
  color: #666;
  grid-column: 1;
  grid-row: 2;
`;

export const InvoicePrestador = styled.div`
  font-size: 14px;
  color: #666;
  grid-column: 2;
  grid-row: 1;
`;

export const InvoiceAmount = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #28a745;
  grid-column: 2;
  grid-row: 2;
`;

export const InvoiceCode = styled.div`
  font-size: 14px;
  color: #4a90e2;
  font-family: monospace;
  grid-column: 1 / span 2;
  grid-row: 3;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #eee;
`;

export const InvoicesTableSection = styled.div`
  margin-bottom: 30px;
`;

export const TableTitle = styled.h3`
  color: #333;
  font-size: 18px;
  margin-bottom: 15px;
  font-weight: 600;
`;

export const InvoicesTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const TableHeader = styled.th`
  background-color: #4a90e2;
  color: #fff;
  padding: 15px;
  text-align: left;
  font-weight: 600;
  font-size: 14px;
  border-right: 1px solid #3a80d2;

  &:last-child {
    border-right: none;
  }
`;

export const TableCell = styled.td`
  padding: 15px;
  border: 1px solid #ddd;
  font-size: 14px;
  color: #333;
  vertical-align: top;
`;

export const InnerTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 5px;
`;

export const InnerTableHeader = styled.th`
  background-color: #f8f9fa;
  padding: 8px;
  text-align: left;
  font-weight: 600;
  font-size: 12px;
  color: #555;
  border: 1px solid #ddd;
`;

export const InnerTableCell = styled.td`
  padding: 8px;
  border: 1px solid #ddd;
  font-size: 12px;
  color: #333;
`;

export const ActionsContainer = styled.div`
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 30px;
`;

export const SaveButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;

export const CancelButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c82333;
  }
`;
export const InputField = styled.input<{ prefix?: string }>`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  background-color: #fff;
  transition: border-color 0.3s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.1);
  }

  &::placeholder {
    color: #999;
  }

  &[type="number"] {
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  &[type="date"] {
    &::-webkit-calendar-picker-indicator {
      cursor: pointer;
      opacity: 0.6;
      transition: opacity 0.3s ease;
      
      &:hover {
        opacity: 1;
      }
    }
  }
`;

export const InvoiceInput = styled(InputField)`
  font-size: 16px;
  padding: 6px 10px;
  background: transparent;
  border: 1px solid transparent;
  
  &:focus {
    background-color: #fff;
    border-color: #4a90e2;
  }
`;

export const InvoiceProviderField = styled.div`
  grid-column: 2;
  grid-row: 1;
`;

export const InvoiceAmountField = styled.div`
  grid-column: 2;
  grid-row: 2;
`;