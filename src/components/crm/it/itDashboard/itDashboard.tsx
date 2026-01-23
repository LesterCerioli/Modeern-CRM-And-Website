'use client';

import React, { useState } from 'react';
import { 
  FiUsers, FiBarChart2, FiCalendar, FiFileText, FiSettings, 
  FiBell, FiHelpCircle, FiFolder, FiDatabase, FiHeadphones,
  FiTrendingUp, FiDollarSign, FiShoppingBag, FiBook, FiShield
} from 'react-icons/fi';
import * as S from './styles';
import ProjectForm from '../project/add_new_project/add_new_project'

type DashboardSection = 'dashboard' | 'users' | 'analytics' | 'calendar' | 'reports' | 'settings' | 'notifications' | 'support' | 'projects' | 'repositories' | 'it';

interface DashboardCard {
  id: DashboardSection;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const Dashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<DashboardSection>('dashboard');
  const [recentActivities] = useState([
    'User "John Doe" updated profile information (10 mins ago)',
    'New project "Website Redesign" was created (25 mins ago)',
    'Monthly financial report generated (1 hour ago)',
    'System backup completed successfully (2 hours ago)'
  ]);

  const dashboardCards: DashboardCard[] = [
    {
      id: 'users',
      title: 'Users',
      description: 'Manage user accounts and permissions',
      icon: <FiUsers size={24} />,
      color: '#3498db',
      bgColor: 'rgba(52, 152, 219, 0.1)'
    },
    {
      id: 'analytics',
      title: 'Analytics',
      description: 'View system statistics and metrics',
      icon: <FiBarChart2 size={24} />,
      color: '#2ecc71',
      bgColor: 'rgba(46, 204, 113, 0.1)'
    },
    {
      id: 'calendar',
      title: 'Calendar',
      description: 'Schedule and manage events',
      icon: <FiCalendar size={24} />,
      color: '#9b59b6',
      bgColor: 'rgba(155, 89, 182, 0.1)'
    },
    {
      id: 'reports',
      title: 'Reports',
      description: 'Generate and view reports',
      icon: <FiFileText size={24} />,
      color: '#e67e22',
      bgColor: 'rgba(230, 126, 34, 0.1)'
    },
    {
      id: 'settings',
      title: 'Settings',
      description: 'Configure system settings',
      icon: <FiSettings size={24} />,
      color: '#34495e',
      bgColor: 'rgba(52, 73, 94, 0.1)'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Manage alerts and messages',
      icon: <FiBell size={24} />,
      color: '#f39c12',
      bgColor: 'rgba(243, 156, 18, 0.1)'
    },
    {
      id: 'support',
      title: 'Support',
      description: 'Get help and assistance',
      icon: <FiHelpCircle size={24} />,
      color: '#e74c3c',
      bgColor: 'rgba(231, 76, 60, 0.1)'
    },
    {
      id: 'projects',
      title: 'Projects',
      description: 'Manage ongoing projects',
      icon: <FiFolder size={24} />,
      color: '#1abc9c',
      bgColor: 'rgba(26, 188, 156, 0.1)'
    },
    {
      id: 'repositories',
      title: 'Repositories',
      description: 'Code and document storage',
      icon: <FiDatabase size={24} />,
      color: '#d35400',
      bgColor: 'rgba(211, 84, 0, 0.1)'
    },
    {
      id: 'it',
      title: 'IT',
      description: 'IT management and infrastructure',
      icon: <FiHeadphones size={24} />,
      color: '#8e44ad',
      bgColor: 'rgba(142, 68, 173, 0.1)'
    }
  ];

  const managementItems = [
    { icon: <FiDollarSign />, text: 'Tax Management and compliance' },
    { icon: <FiTrendingUp />, text: 'Financial reports and analysis' },
    { icon: <FiBarChart2 />, text: 'Marketing Campaigns and analytics' },
    { icon: <FiShoppingBag />, text: 'Sales tracking and management' },
    { icon: <FiBook />, text: 'Accounting and bookkeeping' },
    { icon: <FiShield />, text: 'Legal documentation and compliance' }
  ];

  const renderSectionContent = () => {
    if (activeSection === 'projects') {
      return <ProjectForm />;
    }

    switch (activeSection) {
      case 'dashboard':
        return (
          <>
            <S.SectionHeader>
              <h2>Dashboard Overview</h2>
              <p>Welcome to your administration panel</p>
            </S.SectionHeader>

            <S.StatsGrid>
              <S.StatCard>
                <S.StatIcon $color="#3498db">
                  <FiUsers />
                </S.StatIcon>
                <S.StatInfo>
                  <S.StatValue>1,245</S.StatValue>
                  <S.StatLabel>Active Users</S.StatLabel>
                </S.StatInfo>
              </S.StatCard>

              <S.StatCard>
                <S.StatIcon $color="#2ecc71">
                  <FiFolder />
                </S.StatIcon>
                <S.StatInfo>
                  <S.StatValue>89</S.StatValue>
                  <S.StatLabel>Projects</S.StatLabel>
                </S.StatInfo>
              </S.StatCard>

              <S.StatCard>
                <S.StatIcon $color="#9b59b6">
                  <FiTrendingUp />
                </S.StatIcon>
                <S.StatInfo>
                  <S.StatValue>98.5%</S.StatValue>
                  <S.StatLabel>System Uptime</S.StatLabel>
                </S.StatInfo>
              </S.StatCard>

              <S.StatCard>
                <S.StatIcon $color="#e67e22">
                  <FiBarChart2 />
                </S.StatIcon>
                <S.StatInfo>
                  <S.StatValue>24/7</S.StatValue>
                  <S.StatLabel>Support Available</S.StatLabel>
                </S.StatInfo>
              </S.StatCard>
            </S.StatsGrid>

            <S.ContentGrid>
              <S.ManagementSection>
                <S.SectionTitle>
                  <h3>Manage users and system settings</h3>
                </S.SectionTitle>
                <S.ManagementList>
                  {managementItems.map((item, index) => (
                    <S.ManagementItem key={index}>
                      <S.ManagementIcon>{item.icon}</S.ManagementIcon>
                      <span>{item.text}</span>
                    </S.ManagementItem>
                  ))}
                </S.ManagementList>
              </S.ManagementSection>

              <S.ActivitiesSection>
                <S.SectionTitle>
                  <h3>Recent Activities</h3>
                </S.SectionTitle>
                <S.ActivitiesList>
                  {recentActivities.map((activity, index) => (
                    <S.ActivityItem key={index}>
                      <S.ActivityDot />
                      <S.ActivityText>{activity}</S.ActivityText>
                    </S.ActivityItem>
                  ))}
                </S.ActivitiesList>
              </S.ActivitiesSection>
            </S.ContentGrid>
          </>
        );

      case 'repositories':
        return (
          <S.SectionContent>
            <S.SectionHeader>
              <h2>Repositories</h2>
              <p>Manage code repositories and documents</p>
            </S.SectionHeader>
            <S.CardGrid>
              <S.FeatureCard>
                <S.FeatureIcon $color="#d35400">
                  <FiDatabase />
                </S.FeatureIcon>
                <S.FeatureTitle>Code Repositories</S.FeatureTitle>
                <S.FeatureDescription>
                  Store and version control your code with Git integration and collaboration tools.
                </S.FeatureDescription>
              </S.FeatureCard>
              <S.FeatureCard>
                <S.FeatureIcon $color="#8e44ad">
                  <FiFileText />
                </S.FeatureIcon>
                <S.FeatureTitle>Document Storage</S.FeatureTitle>
                <S.FeatureDescription>
                  Securely store and organize documents with search and retrieval capabilities.
                </S.FeatureDescription>
              </S.FeatureCard>
              <S.FeatureCard>
                <S.FeatureIcon $color="#27ae60">
                  <FiShield />
                </S.FeatureIcon>
                <S.FeatureTitle>Security & Backup</S.FeatureTitle>
                <S.FeatureDescription>
                  Automatic backups, encryption, and security protocols for your data.
                </S.FeatureDescription>
              </S.FeatureCard>
            </S.CardGrid>
          </S.SectionContent>
        );

      case 'it':
        return (
          <S.SectionContent>
            <S.SectionHeader>
              <h2>IT Management</h2>
              <p>IT infrastructure, support, and maintenance</p>
            </S.SectionHeader>
            <S.CardGrid>
              <S.FeatureCard>
                <S.FeatureIcon $color="#8e44ad">
                  <FiHeadphones />
                </S.FeatureIcon>
                <S.FeatureTitle>IT Support</S.FeatureTitle>
                <S.FeatureDescription>
                  24/7 technical support, ticket management, and issue resolution.
                </S.FeatureDescription>
              </S.FeatureCard>
              <S.FeatureCard>
                <S.FeatureIcon $color="#3498db">
                  <FiSettings />
                </S.FeatureIcon>
                <S.FeatureTitle>Infrastructure</S.FeatureTitle>
                <S.FeatureDescription>
                  Manage servers, networks, and cloud infrastructure with monitoring tools.
                </S.FeatureDescription>
              </S.FeatureCard>
              <S.FeatureCard>
                <S.FeatureIcon $color="#e74c3c">
                  <FiShield />
                </S.FeatureIcon>
                <S.FeatureTitle>Security</S.FeatureTitle>
                <S.FeatureDescription>
                  Security monitoring, threat detection, and compliance management.
                </S.FeatureDescription>
              </S.FeatureCard>
            </S.CardGrid>
          </S.SectionContent>
        );

      case 'support':
        return (
          <S.SectionContent>
            <S.SectionHeader>
              <h2>Support Center</h2>
              <p>Get help and assistance for any issues</p>
            </S.SectionHeader>
            <S.CardGrid>
              <S.FeatureCard>
                <S.FeatureIcon $color="#e74c3c">
                  <FiHelpCircle />
                </S.FeatureIcon>
                <S.FeatureTitle>Help Desk</S.FeatureTitle>
                <S.FeatureDescription>
                  Submit support tickets, track issues, and get help from our support team.
                </S.FeatureDescription>
              </S.FeatureCard>
              <S.FeatureCard>
                <S.FeatureIcon $color="#f39c12">
                  <FiFileText />
                </S.FeatureIcon>
                <S.FeatureTitle>Documentation</S.FeatureTitle>
                <S.FeatureDescription>
                  Access guides, tutorials, and documentation for all features.
                </S.FeatureDescription>
              </S.FeatureCard>
              <S.FeatureCard>
                <S.FeatureIcon $color="#3498db">
                  <FiBell />
                </S.FeatureIcon>
                <S.FeatureTitle>Live Chat</S.FeatureTitle>
                <S.FeatureDescription>
                  Real-time chat support with our technical team for immediate assistance.
                </S.FeatureDescription>
              </S.FeatureCard>
            </S.CardGrid>
          </S.SectionContent>
        );

      default:
        return (
          <S.SectionContent>
            <S.SectionHeader>
              <h2>{dashboardCards.find(card => card.id === activeSection)?.title}</h2>
              <p>{dashboardCards.find(card => card.id === activeSection)?.description}</p>
            </S.SectionHeader>
            <S.EmptySection>
              <S.EmptyIcon>
                {dashboardCards.find(card => card.id === activeSection)?.icon}
              </S.EmptyIcon>
              <h3>Coming Soon</h3>
              <p>This section is under development and will be available soon.</p>
            </S.EmptySection>
          </S.SectionContent>
        );
    }
  };

  return (
    <S.DashboardContainer>
      <S.DashboardHeader>
        <S.HeaderContent>
          <h1>IT</h1>
          <p>Administration Panel</p>
        </S.HeaderContent>
      </S.DashboardHeader>

      <S.DashboardLayout>
        <S.Sidebar>
          <S.NavigationCards>
            {dashboardCards.map((card) => (
              <S.NavCard
                key={card.id}
                $isActive={activeSection === card.id}
                $bgColor={card.bgColor}
                onClick={() => setActiveSection(card.id)}
              >
                <S.NavCardIcon $color={card.color}>
                  {card.icon}
                </S.NavCardIcon>
                <S.NavCardContent>
                  <S.NavCardTitle>{card.title}</S.NavCardTitle>
                  <S.NavCardDescription>{card.description}</S.NavCardDescription>
                </S.NavCardContent>
              </S.NavCard>
            ))}
          </S.NavigationCards>
        </S.Sidebar>

        <S.MainContent>
          {renderSectionContent()}
        </S.MainContent>
      </S.DashboardLayout>

      <S.DashboardFooter>
        <div>
          <strong>Lucas Technology Service</strong>
          <p>All rights reserved</p>
        </div>
      </S.DashboardFooter>
    </S.DashboardContainer>
  );
};

export default Dashboard;