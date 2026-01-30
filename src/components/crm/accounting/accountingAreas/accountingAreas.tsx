'use client';
import React, { useState } from 'react';
import * as S from './styles';

const NFERegister = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', marginTop: '20px' }}>
      <h3>Invoice Registration</h3>
      <p>Formulário para registro de Nota Fiscal Eletrônica</p>
      {/* Adicione o formulário real aqui */}
    </div>
  );
};

const AccountingAreas = () => {
  const [showNFE, setShowNFE] = useState(false);

  const handleNFSeClick = () => {
    setShowNFE(!showNFE);
  };

  const accountingCards = [
    { 
      id: 1, 
      title: 'NFSe', 
      description: 'Services Tax Invoices',
      onClick: handleNFSeClick // Somente NFSe tem onClick
    },
    { 
      id: 2, 
      title: 'Taxes', 
      description: 'Taxes management',
      onClick: null // Sem comportamento de clique
    },
    { 
      id: 3, 
      title: 'Legalization', 
      description: 'Legalization processes',
      onClick: null // Sem comportamento de clique
    },
  ];

  return (
    <div>
      <S.DashboardHeader>
        <h1>Accounting Areas</h1>
        {showNFE && (
          <button 
            onClick={() => setShowNFE(false)}
            style={{
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Close NFSe
          </button>
        )}
      </S.DashboardHeader>

      <S.WelcomeMessage>
        <h2>Welcome to Accounting Module</h2>
        <p>Manage all accounting operations of your company in one place.</p>
      </S.WelcomeMessage>

      {/* Renderiza o componente NFERegister quando o card NFSe for clicado */}
      {showNFE && <NFERegister />}

      {/* Cards das áreas contábeis */}
      <S.DashboardGrid>
        {accountingCards.map((card) => (
          <S.DashboardCard 
            key={card.id}
            style={{ 
              backgroundColor: '#e67e22',
              cursor: card.onClick ? 'pointer' : 'default',
              // Destaque visual para o card NFSe quando ativo
              border: showNFE && card.title === 'NFSe' ? '3px solid #fff' : 'none',
              boxShadow: showNFE && card.title === 'NFSe' ? 
                '0 8px 25px rgba(230, 126, 34, 0.3)' : 
                '0 4px 6px rgba(0,0,0,0.1)'
            }}
            onClick={card.onClick || undefined}
          >
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            {showNFE && card.title === 'NFSe' && (
              <div style={{
                marginTop: '10px',
                fontSize: '0.8rem',
                backgroundColor: 'rgba(255,255,255,0.3)',
                padding: '5px 10px',
                borderRadius: '4px',
                fontWeight: '600'
              }}>
                ACTIVE
              </div>
            )}
          </S.DashboardCard>
        ))}
      </S.DashboardGrid>

      {/* Seção de estatísticas rápidas */}
      <S.QuickStats>
        <S.StatCard>
          <h4>Pending Documents</h4>
          <p>12</p>
        </S.StatCard>
        <S.StatCard>
          <h4>Taxes to Pay</h4>
          <p>R$ 5.430,00</p>
        </S.StatCard>
        <S.StatCard>
          <h4>Next Due Date</h4>
          <p>15/11/2023</p>
        </S.StatCard>
      </S.QuickStats>

      {/* Seção de atividades recentes */}
      <S.ActivitiesSection>
        <h3>Recent Activities</h3>
        <div style={{ 
          border: '2px dashed #4f98a0', 
          padding: '30px', 
          textAlign: 'center', 
          borderRadius: '8px', 
          marginTop: '20px' 
        }}>
          <p>No recent activities to display.</p>
          <p>Click on one of the areas above to start.</p>
        </div>
      </S.ActivitiesSection>
    </div>
  );
};

export default AccountingAreas;