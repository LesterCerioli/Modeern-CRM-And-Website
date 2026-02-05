'use client';
import React, { useState } from 'react';
import { 
  DashboardLayout, 
  Sidebar, 
  MainContent, 
  LogoContainer, 
  NavMenu, 
  NavItem, 
  UserInfo, 
  ToggleButton,
  DashboardHeader,
  WelcomeMessage,
  DashboardGrid,
  DashboardCard,
  QuickStats,
  StatCard,
  ActivitiesSection
} from './styles';
import { 
  FiHome, 
  FiUsers, 
  FiBarChart2, 
  FiSettings, 
  FiBell, 
  FiHelpCircle,
  FiChevronLeft,
  FiChevronRight,
  FiCalendar,
  FiFileText,
  FiDollarSign,
  FiTrendingUp,
  FiBriefcase,
  FiTarget,
  FiShield,
  FiCpu,
  FiLock 
} from 'react-icons/fi';
import ITDashboard from '@/components/crm/it/itDashboard/itDashboard';
import UserComponent from '../user/user';
import CredentialManagement from '@/components/crm/it/security/password_form/passwordForm';
import AccountingAreas from '@/components/crm/accounting/accountingAreas/accountingAreas';
import CreatePost from '@/components/blog/post_creator/create_post'; 

interface DashboardState {
  collapsed: boolean;
  activeNav: string;
  showITDashboard: boolean; 
  showSecurityDashboard: boolean;
  showAccountingDashboard: boolean; 
  showMarketingDashboard: boolean; // Novo estado para Marketing
}

const AdminDashboard: React.FC = () => {
  
  const [state, setState] = useState<DashboardState>({
    collapsed: false,
    activeNav: 'dashboard',
    showITDashboard: false,
    showSecurityDashboard: false,
    showAccountingDashboard: false,
    showMarketingDashboard: false // Inicialize como false
  });

  const setCollapsed = (collapsed: boolean) => {
    setState(prev => ({ ...prev, collapsed }));
  };

  const setActiveNav = (activeNav: string) => {
    setState(prev => ({ 
      ...prev, 
      activeNav, 
      showITDashboard: false,
      showSecurityDashboard: false,
      showAccountingDashboard: false,
      showMarketingDashboard: false // Resetar ao mudar de navegação
    }));
  };

  const showITDashboard = () => {
    setState(prev => ({ 
      ...prev, 
      showITDashboard: true, 
      showSecurityDashboard: false,
      showAccountingDashboard: false,
      showMarketingDashboard: false,
      activeNav: 'it' 
    }));
  };

  const showSecurityDashboard = () => {
    setState(prev => ({
      ...prev, 
      showSecurityDashboard: true,
      showITDashboard: false,
      showAccountingDashboard: false,
      showMarketingDashboard: false,
      activeNav: 'security' 
    }));
  };

  const showAccountingDashboard = () => {
    setState(prev => ({ 
      ...prev, 
      showAccountingDashboard: true,
      showITDashboard: false,
      showSecurityDashboard: false,
      showMarketingDashboard: false,
      activeNav: 'accounting' 
    }));
  };

  // Nova função para mostrar o dashboard de Marketing
  const showMarketingDashboard = () => {
    setState(prev => ({ 
      ...prev, 
      showMarketingDashboard: true,
      showITDashboard: false,
      showSecurityDashboard: false,
      showAccountingDashboard: false,
      activeNav: 'marketing' 
    }));
  };

  const goBackToMainDashboard = () => {
    setState(prev => ({ 
      ...prev, 
      showSecurityDashboard: false,
      showITDashboard: false,
      showAccountingDashboard: false,
      showMarketingDashboard: false, // Resetar também o marketing
      activeNav: 'dashboard' 
    }));
  };

  const dashboardCards = [
    { 
      title: 'Administrative', 
      description: 'Manage users and system settings',
      icon: <FiUsers size={28} /> 
    },
    { 
      title: 'Financial', 
      description: 'Financial reports and analysis',
      icon: <FiDollarSign size={28} /> 
    },
    { 
      title: 'Sales', 
      description: 'Sales tracking and management',
      icon: <FiTrendingUp size={28} /> 
    },
    { 
      title: 'Accounting', 
      description: 'Accounting and bookkeeping',
      icon: <FiFileText size={28} /> 
    },
    
    { 
      title: 'Marketing', 
      description: 'Marketing campaigns and analytics',
      icon: <FiTarget size={28} /> 
    },
    { 
      title: 'Commercial', 
      description: 'Commercial operations management',
      icon: <FiBriefcase size={28} /> 
    },
    { 
      title: 'Legal', 
      description: 'Legal documentation and compliance',
      icon: <FiShield size={28} /> 
    },
    {
      title: 'IT',
      description: 'Information Technology Dashboard',
      icon: <FiCpu size={28} /> 
    },
    {
      title: 'Security',
      description: 'Access & Credential Management',
      icon: <FiLock size={28} /> 
    }
  ];

  const quickStats = [
    { title: 'Total Users', value: '8,248' },
    { title: 'Active Projects', value: '42' },
    { title: 'Monthly Revenue', value: '$28,560' },
    { title: 'Pending Tasks', value: '18' }
  ];

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <FiHome /> },
    { id: 'users', label: 'Users', icon: <FiUsers /> },
    { id: 'analytics', label: 'Analytics', icon: <FiBarChart2 /> },
    { id: 'calendar', label: 'Calendar', icon: <FiCalendar /> },
    { id: 'reports', label: 'Reports', icon: <FiFileText /> },
    { id: 'settings', label: 'Settings', icon: <FiSettings /> },
    { id: 'notifications', label: 'Notifications', icon: <FiBell /> },
    { id: 'support', label: 'Support', icon: <FiHelpCircle /> }
  ];

  const renderContent = () => {
    // Adicione a condição para mostrar o CreatePost
    if (state.showMarketingDashboard) {
      return (
        <div style={{ 
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          minHeight: 'calc(100vh - 100px)',
          position: 'relative'
        }}>
          <button 
            onClick={goBackToMainDashboard}
            style={{
              backgroundColor: '#9b59b6', // Cor roxa para Marketing
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              margin: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              position: 'absolute',
              top: '10px',
              right: '10px',
              zIndex: 100
            }}
          >
            <FiChevronLeft /> Back to Dashboard
          </button>
          
          <CreatePost />
        </div>
      );
    }
    
    if (state.showAccountingDashboard) {
      return (
        <div style={{ 
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          minHeight: 'calc(100vh - 100px)',
          position: 'relative'
        }}>
          <button 
            onClick={goBackToMainDashboard}
            style={{
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              margin: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              position: 'absolute',
              top: '10px',
              right: '10px',
              zIndex: 100
            }}
          >
            <FiChevronLeft /> Back to Dashboard
          </button>
          
          <AccountingAreas />
        </div>
      );
    }
    
    if (state.showITDashboard) {
      return (
        <div style={{ 
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          minHeight: 'calc(100vh - 100px)',
          position: 'relative'
        }}>
          <button 
            onClick={goBackToMainDashboard}
            style={{
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              margin: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              position: 'absolute',
              top: '10px',
              right: '10px',
              zIndex: 100
            }}
          >
            <FiChevronLeft /> Back to Dashboard
          </button>
          <ITDashboard />
        </div>
      );
    }
    
    if (state.showSecurityDashboard) {
      return (
        <div style={{ 
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          minHeight: 'calc(100vh - 100px)',
          position: 'relative'
        }}>
          <button
            onClick={goBackToMainDashboard}
            style={{
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              margin: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              position: 'absolute',
              top: '10px',
              right: '10px',
              zIndex: 100
            }}
          >
            <FiChevronLeft /> Back to Dashboard
          </button>
          <CredentialManagement />
        </div>
      );
    }

    switch (state.activeNav) {
      case 'dashboard':
        return (
          <>
            <DashboardHeader>
              <h1>Dashboard</h1>
              <div>
                <button style={{
                  backgroundColor: '#e67e22',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  marginRight: '10px'
                }}>
                  New Report
                </button>
                <button style={{
                  backgroundColor: '#2c3e50',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}>
                  Settings
                </button>
              </div>
            </DashboardHeader>

            <WelcomeMessage>
              <h2>Welcome to the Admin Dashboard</h2>
              <p>
                Manage all aspects of your business from this centralized dashboard. 
                View real-time metrics, access department controls, and monitor system activities.
              </p>
            </WelcomeMessage>

            <QuickStats>
              {quickStats.map((stat, index) => (
                <StatCard key={index}>
                  <h4>{stat.title}</h4>
                  <p>{stat.value}</p>
                </StatCard>
              ))}
            </QuickStats>

            <h2 style={{ color: '#2c3e50', marginBottom: '15px' }}>Department Management</h2>
            <DashboardGrid>
              {dashboardCards.map((card, index) => {
                
                // Card de Marketing
                if (card.title === 'Marketing') {
                  return (
                    <DashboardCard 
                      key={index} 
                      onClick={showMarketingDashboard}
                      style={{ 
                        cursor: 'pointer',
                        position: 'relative',
                        transition: 'all 0.3s ease',
                        border: '2px solid transparent'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.borderColor = '#9b59b6'; // Cor roxa para Marketing
                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(155, 89, 182, 0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.borderColor = 'transparent';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      {card.icon}
                      <h3>{card.title}</h3>
                      <p>{card.description}</p>
                      <div style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        backgroundColor: '#9b59b6',
                        color: 'white',
                        fontSize: '10px',
                        fontWeight: '600',
                        padding: '2px 8px',
                        borderRadius: '10px',
                        textTransform: 'uppercase'
                      }}>
                        Click
                      </div>
                    </DashboardCard>
                  );
                }
                
                // Card de IT
                if (card.title === 'IT') {
                  return (
                    <DashboardCard 
                      key={index} 
                      onClick={showITDashboard}
                      style={{ 
                        cursor: 'pointer',
                        position: 'relative',
                        transition: 'all 0.3s ease',
                        border: '2px solid transparent'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.borderColor = '#3498db';
                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(52, 152, 219, 0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.borderColor = 'transparent';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      {card.icon}
                      <h3>{card.title}</h3>
                      <p>{card.description}</p>
                      <div style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        backgroundColor: '#3498db',
                        color: 'white',
                        fontSize: '10px',
                        fontWeight: '600',
                        padding: '2px 8px',
                        borderRadius: '10px',
                        textTransform: 'uppercase'
                      }}>
                        Click
                      </div>
                    </DashboardCard>
                  );
                }
                
                // Card de Security
                if (card.title === 'Security') {
                  return (
                    <DashboardCard 
                      key={index} 
                      onClick={showSecurityDashboard}
                      style={{ 
                        cursor: 'pointer',
                        position: 'relative',
                        transition: 'all 0.3s ease',
                        border: '2px solid transparent'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.borderColor = '#e74c3c';
                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(231, 76, 60, 0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.borderColor = 'transparent';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      {card.icon}
                      <h3>{card.title}</h3>
                      <p>{card.description}</p>
                      <div style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        backgroundColor: '#e74c3c',
                        color: 'white',
                        fontSize: '10px',
                        fontWeight: '600',
                        padding: '2px 8px',
                        borderRadius: '10px',
                        textTransform: 'uppercase'
                      }}>
                        Click
                      </div>
                    </DashboardCard>
                  );
                }
                                
                // Card de Accounting
                if (card.title === 'Accounting') {
                  return (
                    <DashboardCard 
                      key={index} 
                      onClick={showAccountingDashboard}
                      style={{ 
                        cursor: 'pointer',
                        position: 'relative',
                        transition: 'all 0.3s ease',
                        border: '2px solid transparent'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.borderColor = '#2ecc71';
                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(46, 204, 113, 0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.borderColor = 'transparent';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      {card.icon}
                      <h3>{card.title}</h3>
                      <p>{card.description}</p>
                      <div style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        backgroundColor: '#2ecc71',
                        color: 'white',
                        fontSize: '10px',
                        fontWeight: '600',
                        padding: '2px 8px',
                        borderRadius: '10px',
                        textTransform: 'uppercase'
                      }}>
                        Click
                      </div>
                    </DashboardCard>
                  );
                }
                                
                // Cards padrão (sem comportamento especial)
                return (
                  <DashboardCard key={index}>
                    {card.icon}
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </DashboardCard>
                );
              })}
            </DashboardGrid>

            <ActivitiesSection>
              <h2 style={{ marginTop: '0', color: '#2c3e50' }}>Recent Activities</h2>
              <ul style={{ paddingLeft: '20px', color: '#7f8c8d' }}>
                <li style={{ marginBottom: '10px' }}>User "John Doe" updated profile information (10 mins ago)</li>
                <li style={{ marginBottom: '10px' }}>New sales report generated for Q3 (45 mins ago)</li>
                <li style={{ marginBottom: '10px' }}>Financial department uploaded new documents (2 hours ago)</li>
                <li style={{ marginBottom: '10px' }}>Marketing campaign "Summer Sale" launched (5 hours ago)</li>
                <li style={{ marginBottom: '10px' }}>System maintenance completed successfully (Yesterday)</li>
              </ul>
            </ActivitiesSection>
          </>
        );

      case 'users':
        return <UserComponent />;

      default:
        return (
          <div style={{ 
            padding: '40px',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            minHeight: '400px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <h1 style={{ color: '#2c3e50', marginBottom: '20px' }}>
              {state.activeNav.charAt(0).toUpperCase() + state.activeNav.slice(1)}
            </h1>
            <p style={{ color: '#7f8c8d', fontSize: '1.1rem' }}>
              Content for <strong>{state.activeNav}</strong> will be available soon.
            </p>
            <div style={{
              marginTop: '30px',
              padding: '20px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              maxWidth: '500px'
            }}>
              <p style={{ margin: '0', color: '#95a5a6', fontSize: '0.9rem' }}>
                This section is under development. Check back later for updates.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <DashboardLayout>
      <Sidebar $collapsed={state.collapsed}>
        <LogoContainer $collapsed={state.collapsed}>
          <br />
          <h2>{state.collapsed ? 'AD' : 'ADMIN'}</h2>
          {!state.collapsed && <p>Administration Panel</p>}
        </LogoContainer>

        <NavMenu>
          {navItems.map((item) => (
            <NavItem 
              key={item.id}
              $collapsed={state.collapsed}
              $active={state.activeNav === item.id}
              onClick={() => setActiveNav(item.id)}
            >
              {item.icon}
              {!state.collapsed && <span>{item.label}</span>}
            </NavItem>
          ))}
        </NavMenu>

        <UserInfo $collapsed={state.collapsed}>
          {!state.collapsed && (
            <>
              <p>Welcome back,</p>
              <p><strong>Admin User</strong></p>
            </>
          )}
          <ToggleButton onClick={() => setCollapsed(!state.collapsed)}>
            {state.collapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
          </ToggleButton>
        </UserInfo>
      </Sidebar>

      <MainContent $collapsed={state.collapsed}>
        {renderContent()}
      </MainContent>
    </DashboardLayout>
  );
};

export default AdminDashboard;