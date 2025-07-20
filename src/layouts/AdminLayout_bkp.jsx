// src/layouts/AdminLayout.jsx
import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import styled from 'styled-components';
// Certifique-se de que FaWarehouse está importado
import { FaHome, FaUsers, FaTruck, FaBuilding, FaBox, FaCogs, FaWarehouse } from 'react-icons/fa'; 

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
`;

// Styled NavLink para aplicar os estilos de link ativo
const StyledNavLink = styled(NavLink)`
  color: var(--color-white);
  text-decoration: none;
  font-size: 1.1rem;
  padding: 10px 15px;
  border-radius: var(--border-radius);
  transition: background-color 0.3s ease;
  display: flex; /* Adicionado display flex para alinhar ícone e texto */
  align-items: center; /* Alinha verticalmente */
  gap: 10px; /* Espaço entre ícone e texto */

  &:hover {
    background-color: var(--color-primary); /* Cor de destaque no hover */
  }
  &.active {
    background-color: var(--color-tertiary); /* Cor para o link ativo */
    font-weight: bold;
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
          <li>
            <StyledNavLink to="/admin">
              <FaHome /> Dashboard
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/admin/produtos">
              <FaBox /> Produtos
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/admin/inventario"> {/* NOVO LINK AQUI */}
              <FaWarehouse /> Inventário
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/admin/distribuidores">
              <FaTruck /> Distribuidores
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/admin/empresas-entrega">
              <FaBuilding /> Empresas de Entrega
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/admin/escolas">
              <FaBuilding /> Escolas
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/admin/contatos">
              <FaUsers /> Contatos
            </StyledNavLink>
          </li>
          {/* Adicione mais links conforme necessário */}
          <li>
            <StyledNavLink to="/admin/usuarios">
              <FaUsers /> Usuários
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/admin/configuracoes">
              <FaCogs /> Configurações
            </StyledNavLink>
          </li>
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
