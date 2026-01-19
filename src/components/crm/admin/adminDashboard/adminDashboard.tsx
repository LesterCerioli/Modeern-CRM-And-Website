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
  FiShield
} from 'react-icons/fi';

const AdminDashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeNav, setActiveNav] = useState('dashboard');

  
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
      title: 'Tax', 
      description: 'Tax management and compliance',
      icon: <FiBarChart2 size={28} /> 
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

  return (
    <DashboardLayout>
      {/* Sidebar */}
      <Sidebar $collapsed={collapsed}>
        <LogoContainer $collapsed={collapsed}>
          <br />
          <h2>{collapsed ? 'AD' : 'ADMIN'}</h2>
          {!collapsed && <p>Administration Panel</p>}
        </LogoContainer>

        <NavMenu>
          {navItems.map((item) => (
            <NavItem 
              key={item.id}
              $collapsed={collapsed}
              $active={activeNav === item.id}
              onClick={() => setActiveNav(item.id)}
            >
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </NavItem>
          ))}
        </NavMenu>

        <UserInfo $collapsed={collapsed}>
          {!collapsed && (
            <>
              <p>Welcome back,</p>
              <p><strong>Admin User</strong></p>
            </>
          )}
          <ToggleButton onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
          </ToggleButton>
        </UserInfo>
      </Sidebar>

      {/* Main Content */}
      <MainContent $collapsed={collapsed}>
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

        {/* Quick Stats */}
        <QuickStats>
          {quickStats.map((stat, index) => (
            <StatCard key={index}>
              <h4>{stat.title}</h4>
              <p>{stat.value}</p>
            </StatCard>
          ))}
        </QuickStats>

        {/* Department Cards */}
        <h2 style={{ color: '#2c3e50', marginBottom: '15px' }}>Department Management</h2>
        <DashboardGrid>
          {dashboardCards.map((card, index) => (
            <DashboardCard key={index}>
              {card.icon}
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </DashboardCard>
          ))}
        </DashboardGrid>

        {/* Recent Activities Section */}
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
      </MainContent>
    </DashboardLayout>
  );
};

export default AdminDashboard;