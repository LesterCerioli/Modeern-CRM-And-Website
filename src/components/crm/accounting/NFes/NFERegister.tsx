'use client';
import React, { useState } from 'react';
import * as S from './styles';

interface InvoiceData {
  invoiceNumber: string;
  emissionDate: string;
  verificationCode: string;
  serviceReason: string;
  serviceProvider: string;
  cnj: string;
  service: string;
  municipalCode: string;
  invoiceAmount: string;
  taxRate: string;
  issValue: string;
  providerName: string;
  amount: string;
  invoiceCode: string;
}

const NFERegister: React.FC = () => {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    invoiceNumber: '15432',
    emissionDate: '2026-01-25',
    verificationCode: '',
    serviceReason: 'MUVZ CONSULTING AND SYSTEMS S.A.',
    serviceProvider: 'LUCAS TECHNOLOGY SERVICES LTD',
    cnj: '123456',
    service: 'Municipal Registration',
    municipalCode: '5.00',
    invoiceAmount: '',
    taxRate: '5.00',
    issValue: '372.73',
    providerName: 'Provider',
    amount: '55482',
    invoiceCode: 'AB12-CD34-EF56',
  });

  const [tableData, setTableData] = useState({
    cnj1: '01.01.02',
    cnj2: '01.01.02',
    cnj3: '01.01.02',
    serviceDesc1: 'Software maintenance services...',
    serviceDesc2: 'Software maintenance services...',
    serviceDesc3: 'Software maintenance services...',
    description1: '5.00',
    description2: '5.00',
    description3: '5.00',
    taxRate1: '5.00',
    taxRate2: '5.00',
    taxRate3: '5.00',
    amount1: '7454.54',
    amount2: '7454.54',
    amount3: '7454.54',
  });

  const handleInputChange = (field: keyof InvoiceData, value: string) => {
    setInvoiceData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTableInputChange = (field: keyof typeof tableData, value: string) => {
    setTableData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving invoice data:', invoiceData);
    console.log('Saving table data:', tableData);
    alert('Invoice data saved successfully!');
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? All changes will be lost.')) {
      // Reset form logic here
      alert('Operation cancelled.');
    }
  };

  return (
    <S.Container>
      <S.Title>Electronic Invoice Registration (NFe)</S.Title>
      
      <S.UploadSection>
        <S.UploadBox>
          <S.UploadText>Drag or click to select NFe PDF file</S.UploadText>
        </S.UploadBox>
        <S.StatusMessage>Status: Data extracted successfully!</S.StatusMessage>
      </S.UploadSection>

      <S.Separator />

      <S.SectionTitle>Invoice Details</S.SectionTitle>

      <S.DetailsGrid>
        <S.DetailRow>
          <S.DetailLabel>Identification</S.DetailLabel>
          <S.InputField 
            type="text" 
            value={invoiceData.invoiceNumber}
            onChange={(e) => handleInputChange('invoiceNumber', e.target.value)}
            placeholder="Enter invoice number"
          />
        </S.DetailRow>
        
        <S.DetailRow>
          <S.DetailLabel>Emission Date</S.DetailLabel>
          <S.InputField 
            type="date" 
            value={invoiceData.emissionDate}
            onChange={(e) => handleInputChange('emissionDate', e.target.value)}
          />
        </S.DetailRow>
        
        <S.DetailRow>
          <S.DetailLabel>Verification Code</S.DetailLabel>
          <S.InputField 
            type="text" 
            value={invoiceData.verificationCode}
            onChange={(e) => handleInputChange('verificationCode', e.target.value)}
            placeholder="Enter verification code"
          />
        </S.DetailRow>
        
        <S.DetailRow>
          <S.DetailLabel>Service Reason</S.DetailLabel>
          <S.InputField 
            type="text" 
            value={invoiceData.serviceReason}
            onChange={(e) => handleInputChange('serviceReason', e.target.value)}
            placeholder="Enter service reason"
          />
        </S.DetailRow>
        
        <S.DetailRow>
          <S.DetailLabel>Service Provider</S.DetailLabel>
          <S.InputField 
            type="text" 
            value={invoiceData.serviceProvider}
            onChange={(e) => handleInputChange('serviceProvider', e.target.value)}
            placeholder="Enter service provider"
          />
        </S.DetailRow>
        
        <S.DetailRow>
          <S.DetailLabel>CNJ</S.DetailLabel>
          <S.InputField 
            type="text" 
            value={invoiceData.cnj}
            onChange={(e) => handleInputChange('cnj', e.target.value)}
            placeholder="Enter CNJ number"
          />
        </S.DetailRow>
        
        <S.DetailRow>
          <S.DetailLabel>Service</S.DetailLabel>
          <S.InputField 
            type="text" 
            value={invoiceData.service}
            onChange={(e) => handleInputChange('service', e.target.value)}
            placeholder="Enter service type"
          />
        </S.DetailRow>
        
        <S.DetailRow>
          <S.DetailLabel>Municipal Code</S.DetailLabel>
          <S.InputField 
            type="text" 
            value={invoiceData.municipalCode}
            onChange={(e) => handleInputChange('municipalCode', e.target.value)}
            placeholder="Enter municipal code"
          />
        </S.DetailRow>
        
        <S.DetailRow>
          <S.DetailLabel>Invoice Amount (R$)</S.DetailLabel>
          <S.InputField 
            type="number" 
            step="0.01"
            value={invoiceData.invoiceAmount}
            onChange={(e) => handleInputChange('invoiceAmount', e.target.value)}
            placeholder="0.00"
          />
        </S.DetailRow>
        
        <S.DetailRow>
          <S.DetailLabel>Tax Rate (%)</S.DetailLabel>
          <S.InputField 
            type="number" 
            step="0.01"
            value={invoiceData.taxRate}
            onChange={(e) => handleInputChange('taxRate', e.target.value)}
            placeholder="0.00"
          />
        </S.DetailRow>
        
        <S.DetailRow>
          <S.DetailLabel>ISS Value (R$)</S.DetailLabel>
          <S.InputField 
            type="number" 
            step="0.01"
            value={invoiceData.issValue}
            onChange={(e) => handleInputChange('issValue', e.target.value)}
            placeholder="0.00"
          />
        </S.DetailRow>
      </S.DetailsGrid>

      <S.InvoiceCard>
        <S.InvoiceHeader>ELECTRONIC SERVICE INVOICE</S.InvoiceHeader>
        <S.InvoiceContent>
          <S.InvoiceNumber>
            <S.InvoiceInput 
              type="text" 
              value={invoiceData.invoiceNumber}
              onChange={(e) => handleInputChange('invoiceNumber', e.target.value)}
            />
          </S.InvoiceNumber>
          <S.InvoiceDate>
            <S.InvoiceInput 
              type="date" 
              value={invoiceData.emissionDate}
              onChange={(e) => handleInputChange('emissionDate', e.target.value)}
            />
          </S.InvoiceDate>
          <S.InvoiceProviderField>
            <S.InputField 
              type="text" 
              value={invoiceData.providerName}
              onChange={(e) => handleInputChange('providerName', e.target.value)}
              placeholder="Provider name"
            />
          </S.InvoiceProviderField>
          <S.InvoiceAmountField>
            <S.InputField 
              type="number" 
              step="0.01"
              value={invoiceData.amount}
              onChange={(e) => handleInputChange('amount', e.target.value)}
              placeholder="0.00"
              prefix="R$ "
            />
          </S.InvoiceAmountField>
          <S.InvoiceCode>
            <S.InputField 
              type="text" 
              value={invoiceData.invoiceCode}
              onChange={(e) => handleInputChange('invoiceCode', e.target.value)}
              placeholder="Invoice code"
            />
          </S.InvoiceCode>
        </S.InvoiceContent>
      </S.InvoiceCard>

      <S.InvoicesTableSection>
        <S.TableTitle>Invoices</S.TableTitle>
        <S.InvoicesTable>
          <thead>
            <tr>
              <S.TableHeader>ELECTRONIC SERVICE INVOICE</S.TableHeader>
              <S.TableHeader>
                <S.InputField 
                  type="text" 
                  value={invoiceData.serviceReason}
                  onChange={(e) => handleInputChange('serviceReason', e.target.value)}
                  placeholder="Service reason"
                />
              </S.TableHeader>
              <S.TableHeader>
                <S.InputField 
                  type="text" 
                  value={invoiceData.serviceReason}
                  onChange={(e) => handleInputChange('serviceReason', e.target.value)}
                  placeholder="Service reason"
                />
              </S.TableHeader>
            </tr>
          </thead>
          <tbody>
            <tr>
              <S.TableCell>CNJ</S.TableCell>
              <S.TableCell>
                <S.InputField 
                  type="text" 
                  value={tableData.cnj1}
                  onChange={(e) => handleTableInputChange('cnj1', e.target.value)}
                />
              </S.TableCell>
              <S.TableCell>
                <S.InputField 
                  type="text" 
                  value={tableData.cnj2}
                  onChange={(e) => handleTableInputChange('cnj2', e.target.value)}
                />
              </S.TableCell>
            </tr>
            <tr>
              <S.TableCell>
                <S.InputField 
                  type="text" 
                  value={tableData.serviceDesc1}
                  onChange={(e) => handleTableInputChange('serviceDesc1', e.target.value)}
                />
              </S.TableCell>
              <S.TableCell>
                <S.InputField 
                  type="text" 
                  value={tableData.serviceDesc2}
                  onChange={(e) => handleTableInputChange('serviceDesc2', e.target.value)}
                />
              </S.TableCell>
              <S.TableCell>
                <S.InputField 
                  type="text" 
                  value={tableData.serviceDesc3}
                  onChange={(e) => handleTableInputChange('serviceDesc3', e.target.value)}
                />
              </S.TableCell>
            </tr>
            <tr>
              <S.TableCell>
                <S.InnerTable>
                  <thead>
                    <tr>
                      <S.InnerTableHeader>Description</S.InnerTableHeader>
                      <S.InnerTableHeader>Tax Rate (%)</S.InnerTableHeader>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <S.InnerTableCell>
                        <S.InputField 
                          type="number" 
                          step="0.01"
                          value={tableData.description1}
                          onChange={(e) => handleTableInputChange('description1', e.target.value)}
                        />
                      </S.InnerTableCell>
                      <S.InnerTableCell>
                        <S.InputField 
                          type="number" 
                          step="0.01"
                          value={tableData.taxRate1}
                          onChange={(e) => handleTableInputChange('taxRate1', e.target.value)}
                        />
                      </S.InnerTableCell>
                    </tr>
                  </tbody>
                </S.InnerTable>
              </S.TableCell>
              <S.TableCell>
                <S.InnerTable>
                  <thead>
                    <tr>
                      <S.InnerTableHeader>Description</S.InnerTableHeader>
                      <S.InnerTableHeader>Tax Rate (%)</S.InnerTableHeader>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <S.InnerTableCell>
                        <S.InputField 
                          type="number" 
                          step="0.01"
                          value={tableData.description2}
                          onChange={(e) => handleTableInputChange('description2', e.target.value)}
                        />
                      </S.InnerTableCell>
                      <S.InnerTableCell>
                        <S.InputField 
                          type="number" 
                          step="0.01"
                          value={tableData.taxRate2}
                          onChange={(e) => handleTableInputChange('taxRate2', e.target.value)}
                        />
                      </S.InnerTableCell>
                    </tr>
                  </tbody>
                </S.InnerTable>
              </S.TableCell>
              <S.TableCell>
                <S.InnerTable>
                  <thead>
                    <tr>
                      <S.InnerTableHeader>Description</S.InnerTableHeader>
                      <S.InnerTableHeader>Tax Rate (%)</S.InnerTableHeader>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <S.InnerTableCell>
                        <S.InputField 
                          type="number" 
                          step="0.01"
                          value={tableData.description3}
                          onChange={(e) => handleTableInputChange('description3', e.target.value)}
                        />
                      </S.InnerTableCell>
                      <S.InnerTableCell>
                        <S.InputField 
                          type="number" 
                          step="0.01"
                          value={tableData.taxRate3}
                          onChange={(e) => handleTableInputChange('taxRate3', e.target.value)}
                        />
                      </S.InnerTableCell>
                    </tr>
                  </tbody>
                </S.InnerTable>
              </S.TableCell>
            </tr>
            <tr>
              <S.TableCell>
                <S.InputField 
                  type="number" 
                  step="0.01"
                  value={tableData.amount1}
                  onChange={(e) => handleTableInputChange('amount1', e.target.value)}
                  prefix="R$ "
                />
              </S.TableCell>
              <S.TableCell>
                <S.InputField 
                  type="number" 
                  step="0.01"
                  value={tableData.amount2}
                  onChange={(e) => handleTableInputChange('amount2', e.target.value)}
                  prefix="R$ "
                />
              </S.TableCell>
              <S.TableCell>
                <S.InputField 
                  type="number" 
                  step="0.01"
                  value={tableData.amount3}
                  onChange={(e) => handleTableInputChange('amount3', e.target.value)}
                  prefix="R$ "
                />
              </S.TableCell>
            </tr>
          </tbody>
        </S.InvoicesTable>
      </S.InvoicesTableSection>

      <S.ActionsContainer>
        <S.SaveButton onClick={handleSave}>Save to Database</S.SaveButton>
        <S.CancelButton onClick={handleCancel}>Cancel</S.CancelButton>
      </S.ActionsContainer>
    </S.Container>
  );
};

export default NFERegister;