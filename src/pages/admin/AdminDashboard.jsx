import React from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  background-color: var(--color-white);
  padding: 20px;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-small);
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 500px; /* Garante uma altura mínima para visualização */
`;

const Title = styled.h2`
  color: var(--color-primary-dark);
  font-size: 2.5em;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  color: var(--color-text-light);
  font-size: 1.2em;
  text-align: center;
`;

const AdminDashboardPage = () => {
  return (
    <DashboardContainer>
      <Title>Bem-vindo ao Painel Administrativo!</Title>
      <Subtitle>
        Aqui você terá uma visão geral do sistema e acessará as principais funcionalidades.
      </Subtitle>
      <div style={{ marginTop: '40px', fontSize: '1.1em', color: 'var(--color-text-dark)' }}>
        <p>Use o menu lateral para navegar entre as seções:</p>
        <ul>
          <li>Gerenciar Produtos</li>
          <li>Gerenciar Inventário</li>
          <li>Gerenciar Distribuidores</li>
          <li>Gerenciar Empresas de Entrega</li>
          <li>Gerenciar Escolas</li>
          <li>Gerenciar Contatos</li>
          <li>Gerenciar Pedidos</li>
        </ul>
      </div>
    </DashboardContainer>
  );
};

export default AdminDashboardPage;
