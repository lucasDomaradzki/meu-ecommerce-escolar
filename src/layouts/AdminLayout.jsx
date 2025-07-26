import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSideBar';

const AdminLayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: var(--color-background);
`;

const ContentArea = styled.div`
  flex-grow: 1; /* Permite que a área de conteúdo ocupe o espaço restante */
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow-y: auto; /* Permite rolagem dentro da área de conteúdo */
`;

const AdminHeader = styled.header`
  background-color: var(--color-white);
  padding: 15px 20px;
  box-shadow: var(--shadow-small);
  margin-bottom: 20px;
  border-radius: var(--border-radius);
  color: var(--color-text-dark);
  font-size: 1.2em;
  font-weight: bold;
`;

const AdminLayout = () => {
  return (
    <AdminLayoutContainer>
      <AdminSidebar />
      <ContentArea>
        <Outlet />
      </ContentArea>
    </AdminLayoutContainer>
  );
};

export default AdminLayout;
