// src/components/admin/AdminSidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FaTachometerAlt, FaBox, FaBoxes, FaTruck, FaBuilding, FaUserCircle, FaCog, FaClipboardList, FaUsers } from 'react-icons/fa';

const SidebarContainer = styled.div`
  width: 250px;
  background-color: var(--color-primary-dark);
  color: var(--color-white);
  padding: 20px;
  box-shadow: var(--shadow-medium);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`;

const AdminPanelTitle = styled.h3`
  color: var(--color-primary);
  text-align: center;
  margin-bottom: 30px;
  font-size: 1.5em;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255,255,255,0.2);
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin-bottom: 10px;

  a {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 15px;
    color: var(--color-white);
    text-decoration: none;
    border-radius: var(--border-radius);
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
    font-size: 1em;

    &:hover {
      background-color: var(--color-primary);
      color: var(--color-white);
    }

    &.active {
      background-color: var(--color-primary);
      color: var(--color-white);
      font-weight: bold;
    }

    svg {
      font-size: 1.2em;
    }
  }
`;

const SectionTitle = styled.h4`
  color: var(--color-text-light);
  margin: 20px 0 10px 15px;
  font-size: 0.9em;
  text-transform: uppercase;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding-bottom: 5px;
`;


const AdminSidebar = () => {
  return (
    <SidebarContainer>
      <AdminPanelTitle>Painel Admin</AdminPanelTitle>
      <NavList>
        <NavItem>
          <NavLink to="/admin/dashboard"> {/* Caminho absoluto */}
            <FaTachometerAlt /> Dashboard
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/admin/produtos"> {/* Caminho absoluto */}
            <FaBox /> Produtos
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/admin/inventario"> {/* Caminho absoluto */}
            <FaBoxes /> Inventário
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/admin/pedidos"> {/* Caminho absoluto */}
            <FaClipboardList /> Pedidos
          </NavLink>
        </NavItem>

        <SectionTitle>Empresas</SectionTitle>
        <NavItem>
          <NavLink to="/admin/distribuidores"> {/* Caminho absoluto */}
            <FaTruck /> Distribuidores
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/admin/empresas-entrega"> {/* Caminho absoluto */}
            <FaBuilding /> Empresas de Entrega
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/admin/escolas"> {/* Caminho absoluto */}
            <FaBuilding /> Escolas
          </NavLink>
        </NavItem>

        <SectionTitle>Contatos</SectionTitle>
        <NavItem>
          <NavLink to="/admin/contatos"> {/* Caminho absoluto */}
            <FaUserCircle /> Contatos
          </NavLink>
        </NavItem>
        {/* Você não tem uma página de 'usuários' ainda no App.jsx,
            então, por enquanto, vamos comentar ou garantir que a rota exista
        <NavItem>
          <NavLink to="/admin/users">
            <FaUsers /> Usuários
          </NavLink>
        </NavItem>
        */}
        
        <SectionTitle>Configurações</SectionTitle>
        {/* Você não tem uma página de 'settings' ainda no App.jsx,
            então, por enquanto, vamos comentar ou garantir que a rota exista
        <NavItem>
          <NavLink to="/admin/settings">
            <FaCog /> Configurações
          </NavLink>
        </NavItem>
        */}
      </NavList>
    </SidebarContainer>
  );
};

export default AdminSidebar;
