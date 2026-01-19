"use client";
import React from 'react';

import { PageWrapper } from "./styles";
import AdminDashboard from '@/components/crm/admin/adminDashboard/adminDashboard';


const AdminPage: React.FC = () => {
  return (
    <PageWrapper>
      
      <AdminDashboard />
    </PageWrapper>
  );
};

export default AdminPage;
