import styled from "styled-components";

interface CollapsibleProps {
  $collapsed: boolean;
}

interface NavItemProps extends CollapsibleProps {
  $active: boolean;
}

export const DashboardLayout = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f5f7fa;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Sidebar = styled.div<CollapsibleProps>`
  width: ${({ $collapsed }) => ($collapsed ? '80px' : '250px')};
  background-color: #2c3e50;
  color: white;
  padding-top: 20px;
  min-height: 100vh; /* Alterado de height para min-height */
  position: fixed;
  transition: all 0.3s ease;
  z-index: 100;
  left: 0;
  display: flex;
  flex-direction: column; /* Adicionado para layout flexível */

  @media (max-width: 768px) {
    width: 100%;
    min-height: auto; /* Reset para mobile */
    position: relative;
    padding: 15px;
    display: ${({ $collapsed }) => ($collapsed ? 'none' : 'flex')};
  }
`;

export const MainContent = styled.div<CollapsibleProps>`
  flex: 1;
  padding: 30px;
  margin-left: ${({ $collapsed }) => ($collapsed ? '80px' : '250px')};
  transition: all 0.3s ease;
  min-height: 100vh; /* Garante altura mínima */

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 20px;
    min-height: auto;
  }
`;

export const LogoContainer = styled.div<CollapsibleProps>`
  padding: 0 15px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 20px;
  text-align: center;
  
  h2 {
    margin: 0;
    color: white;
    font-size: ${({ $collapsed }) => ($collapsed ? '1.5rem' : '1.8rem')};
  }
  
  p {
    margin: 5px 0 0;
    font-size: 0.9rem;
    opacity: 0.8;
    display: ${({ $collapsed }) => ($collapsed ? 'none' : 'block')};
  }
`;

export const NavMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1; /* Permite que o menu ocupe o espaço disponível */
  overflow-y: auto; /* Adiciona scroll se necessário */
  max-height: calc(100vh - 200px); /* Limita a altura máxima */

  @media (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex: none; /* Reset para mobile */
    max-height: none;
    overflow-y: visible;
  }
`;

export const NavItem = styled.li<NavItemProps>`
  padding: 14px 20px;
  margin: 5px 10px;
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 4px;
  display: flex;
  align-items: center;
  color: white;
  background-color: ${({ $active }) => ($active ? 'rgba(255, 255, 255, 0.2)' : 'transparent')};
  font-weight: ${({ $active }) => ($active ? '600' : '400')};
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  svg {
    margin-right: ${({ $collapsed }) => ($collapsed ? '0' : '12px')};
    min-width: 24px;
  }

  @media (max-width: 768px) {
    padding: 10px 15px;
    margin: 5px;
  }
`;

export const UserInfo = styled.div<CollapsibleProps>`
  padding: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  margin-top: auto; /* Empurra para o final do sidebar */
  
  p {
    margin: 0 0 10px 0;
    font-size: 0.9rem;
    display: ${({ $collapsed }) => ($collapsed ? 'none' : 'block')};
  }
`;

export const ToggleButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  width: 100%;
  transition: all 0.3s;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin: 25px 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ActionsSection = styled.section`
  margin: 30px 0;
`;

export const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 15px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const ActivitiesSection = styled.section`
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-top: 30px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

export const TabContent = styled.div`
  border: 2px dashed #4f98a0;
  padding: 30px;
  text-align: center;
  border-radius: 8px;
  margin-top: 20px;
`;

export const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  flex-wrap: wrap;
  gap: 15px;

  h1 {
    margin: 0;
    color: #2c3e50;
    font-size: 2rem;
  }
`;

export const WelcomeMessage = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  margin-bottom: 25px;

  h2 {
    margin: 0 0 10px 0;
    color: #2c3e50;
    font-size: 1.5rem;
  }

  p {
    margin: 0;
    color: #7f8c8d;
    line-height: 1.5;
  }
`;

export const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  margin-top: 30px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const DashboardCard = styled.div`
  background-color: #e67e22;
  color: white;
  padding: 25px 20px;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 120px;

  &:hover {
    background-color: #d35400;
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.15);
  }

  h3 {
    margin: 0 0 10px 0;
    font-size: 1.2rem;
    font-weight: 600;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    opacity: 0.9;
  }
`;

export const QuickStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 30px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);

  h4 {
    margin: 0 0 10px 0;
    color: #7f8c8d;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  p {
    margin: 0;
    color: #2c3e50;
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

/* Adicione esta nova estilização se você tiver um footer */
export const Footer = styled.footer`
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  text-align: center;
  margin-top: auto; /* Empurra o footer para o final */

  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;