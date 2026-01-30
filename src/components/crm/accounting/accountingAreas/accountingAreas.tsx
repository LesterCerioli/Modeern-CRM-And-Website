import React, { useState } from 'react';
import * as S from './styles'; // Importando seus estilos


const NFERegister = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', marginTop: '20px' }}>
      <h3>Cadastro de NFE</h3>
      <p>Formulário para registro de Nota Fiscal Eletrônica</p>
      {/* Adicione aqui o formulário ou conteúdo do NFERegister */}
    </div>
  );
};

const AccountingAreas = () => {
  const [showNFE, setShowNFE] = useState(false);

  const handleNFEClick = () => {
    setShowNFE(!showNFE);
  };

  const accountingCards = [
    { id: 1, title: 'NFSe', description: 'Nota Fiscal de Serviços' },
    { id: 2, title: 'Taxes', description: 'Gestão de Impostos' },
    { id: 3, title: 'Legalization', description: 'Legalização Empresarial' },
  ];

  return (
    <div>
      <S.DashboardHeader>
        <h1>Áreas Contábeis</h1>
      </S.DashboardHeader>

      <S.WelcomeMessage>
        <h2>Bem-vindo ao Módulo Contábil</h2>
        <p>Gerencie todas as operações contábeis da sua empresa em um só lugar.</p>
      </S.WelcomeMessage>

      {/* Card especial para NFE */}
      <S.DashboardGrid style={{ marginBottom: '30px' }}>
        <S.DashboardCard 
          style={{ backgroundColor: '#e67e22' }}
          onClick={handleNFEClick}
        >
          <h3>NFE</h3>
          <p>Nota Fiscal Eletrônica</p>
        </S.DashboardCard>
      </S.DashboardGrid>

      {/* Renderiza o componente NFERegister quando o card for clicado */}
      {showNFE && <NFERegister />}

      {/* Cards das áreas contábeis */}
      <S.DashboardGrid>
        {accountingCards.map((card) => (
          <S.DashboardCard 
            key={card.id}
            style={{ backgroundColor: '#e67e22' }}
          >
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </S.DashboardCard>
        ))}
      </S.DashboardGrid>

      {/* Seção de estatísticas rápidas */}
      <S.QuickStats>
        <S.StatCard>
          <h4>Documentos Pendentes</h4>
          <p>12</p>
        </S.StatCard>
        <S.StatCard>
          <h4>Impostos a Pagar</h4>
          <p>R$ 5.430,00</p>
        </S.StatCard>
        <S.StatCard>
          <h4>Próximo Vencimento</h4>
          <p>15/11/2023</p>
        </S.StatCard>
      </S.QuickStats>

      {/* Seção de atividades recentes */}
      <S.ActivitiesSection>
        <h3>Atividades Recentes</h3>
        <S.TabContent>
          <p>Nenhuma atividade recente para exibir.</p>
          <p>Clique em uma das áreas acima para começar.</p>
        </S.TabContent>
      </S.ActivitiesSection>
    </div>
  );
};

export default AccountingAreas;