// src/pages/admin/AdminDashboard.jsx
import React from 'react';
import styled from 'styled-components';
import Card from '../../components/common/Card'; // Reutiliza o componente Card

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  padding: 20px;
`;

const DashboardCard = styled(Card)`
  padding: 25px;
  text-align: center;

  h3 {
    font-size: 1.5rem;
    color: var(--color-primary);
    margin-bottom: 15px;
  }

  p {
    font-size: 2.5rem;
    font-weight: bold;
    color: var(--color-tertiary);
  }
`;

const AdminDashboard = () => {
  // Dados mockados para o dashboard (substituir por dados reais da API futuramente)
  const stats = {
    totalOrders: 150,
    pendingOrders: 12,
    totalProducts: 85,
    newUsers: 5,
  };

  return (
    <DashboardContainer>
      <DashboardCard>
        <h3>Pedidos Totais</h3>
        <p>{stats.totalOrders}</p>
      </DashboardCard>
      <DashboardCard>
        <h3>Pedidos Pendentes</h3>
        <p>{stats.pendingOrders}</p>
      </DashboardCard>
      <DashboardCard>
        <h3>Produtos Cadastrados</h3>
        <p>{stats.totalProducts}</p>
      </DashboardCard>
      <DashboardCard>
        <h3>Novos Usuários (Mês)</h3>
        <p>{stats.newUsers}</p>
      </DashboardCard>
    </DashboardContainer>
  );
};

export default AdminDashboard;
