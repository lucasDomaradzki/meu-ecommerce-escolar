// src/layouts/AdminLayout.jsx
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import styled from 'styled-components';

// Estilos básicos para o layout do admin
const AdminLayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: var(--color-background-light); /* Fundo claro para o admin */
`;

const Sidebar = styled.nav`
  width: 250px;
  background-color: var(--color-primary-dark); /* Cor principal escura para o sidebar */
  padding: 20px;
  color: var(--color-white);
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); /* Sombra para o sidebar */

  h2 {
    color: var(--color-white);
    text-align: center;
    margin-bottom: 30px;
    font-size: 1.8rem;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 15px;
  }

  a {
    color: var(--color-white);
    text-decoration: none;
    font-size: 1.1rem;
    padding: 10px 15px;
    border-radius: var(--border-radius);
    transition: background-color 0.3s ease;
    display: block; /* Para que o padding e hover funcionem em toda a área do link */

    &:hover {
      background-color: var(--color-primary); /* Cor de destaque no hover */
    }
    &.active {
      background-color: var(--color-tertiary); /* Cor para o link ativo */
      font-weight: bold;
    }
  }
`;

const Content = styled.main`
  flex-grow: 1; /* Permite que o conteúdo ocupe o espaço restante */
  padding: 30px;
`;

const AdminLayout = () => {
  return (
    <AdminLayoutContainer>
      <Sidebar>
        <h2>Painel Admin</h2>
        <ul>
          <li><Link to="/admin">Dashboard</Link></li>
          <li><Link to="/admin/produtos">Produtos</Link></li>
          <li><Link to="/admin/distribuidores">Distribuidores</Link></li>
          <li><Link to="/admin/empresas-entrega">Empresas de Entrega</Link></li>
          <li><Link to="/admin/escolas">Escolas</Link></li>
          <li><Link to="/admin/contatos">Contatos</Link></li> {/* NOVO LINK AQUI */}
          {/* Adicione mais links conforme necessário */}
        </ul>
      </Sidebar>
      <Content>
        {/* O Outlet renderizará os componentes filhos da rota, como AdminDashboard */}
        <Outlet />
      </Content>
    </AdminLayoutContainer>
  );
};

export default AdminLayout;
