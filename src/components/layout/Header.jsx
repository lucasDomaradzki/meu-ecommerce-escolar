import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaBox } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';

const StyledHeader = styled.header`
  background-color: var(--color-primary);
  color: #fff;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--header-height);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  position: sticky;
  top: 0;
  z-index: 1000;

  @media (max-width: var(--breakpoint-tablet)) {
    padding: 0.8rem 1rem;
    height: var(--header-height-mobile);
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }

  @media (max-width: var(--breakpoint-mobile)) {
    flex-direction: column;
    height: auto;
    padding-bottom: 0.8rem;
  }
`;

const Logo = styled(Link)`
  color: #fff;
  font-size: 2rem;
  font-weight: bold;
  text-decoration: none;
  display: flex;
  align-items: center;

  @media (max-width: var(--breakpoint-tablet)) {
    font-size: 1.6rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;

  @media (max-width: var(--breakpoint-tablet)) {
    gap: 1rem;
  }

  @media (max-width: var(--breakpoint-mobile)) {
    width: 100%;
    justify-content: center;
    margin-top: 10px;
    gap: 0.8rem;
  }
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 1.1rem;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    color: var(--color-accent);
  }

  @media (max-width: var(--breakpoint-tablet)) {
    font-size: 1rem;
  }
`;

const CartLink = styled(NavLink)`
  position: relative;
`;

const CartCount = styled.span`
  background-color: var(--color-danger); /* Bolha vermelha */
  color: white; /* Número em branco */
  border-radius: 50%; /* Transforma em círculo/bolha */
  padding: 2px 7px; /* Ajuste o padding para o tamanho da bolha */
  font-size: 0.75rem; /* Tamanho da fonte menor */
  font-weight: bold;
  position: absolute;
  top: -8px; /* Ajusta a posição verticalmente */
  right: -15px; /* Ajusta a posição horizontalmente sobre o ícone */
  min-width: 20px; /* Garante tamanho mínimo para a bolha */
  height: 20px; /* Garante que seja um círculo */
  display: flex; /* Para centralizar o texto dentro da bolha */
  align-items: center; /* Centraliza verticalmente */
  justify-content: center; /* Centraliza horizontalmente */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3); /* Sombra para dar profundidade */
  line-height: 1; /* Ajuda a centralizar o texto verticalmente */
`;

const Header = () => {
  const { cartItems } = useCart();
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <StyledHeader>
      <Logo to="/">📚SchoolKit</Logo>
      <Nav>
        <NavLink to="/meus-pedidos">
          <FaBox /> Pedidos
        </NavLink>
        <NavLink to="/perfil">
          <FaUser /> Perfil
        </NavLink>
        <CartLink to="/carrinho">
          <FaShoppingCart />
          Carrinho
          {itemCount > 0 && <CartCount>{itemCount}</CartCount>}
        </CartLink>
      </Nav>
    </StyledHeader>
  );
};

export default Header;
