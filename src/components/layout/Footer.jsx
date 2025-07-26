import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledFooter = styled.footer`
  background-color: var(--color-primary);
  color: #fff;
  padding: 1.5rem 2rem;
  text-align: center;
  height: var(--footer-height); /* Usa a variável de altura */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;

  @media (max-width: var(--breakpoint-tablet)) {
    padding: 1rem;
    height: var(--footer-height-mobile); /* Altura menor para mobile */
    font-size: 0.8rem;
  }
`;

const FooterNav = styled.nav`
  margin-bottom: 10px;
  display: flex;
  gap: 20px;

  @media (max-width: var(--breakpoint-mobile)) {
    flex-direction: column;
    gap: 5px;
  }
`;

const FooterLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Copyright = styled.p`
  margin-top: 5px;
  font-size: 0.8rem;

  @media (max-width: var(--breakpoint-mobile)) {
    font-size: 0.7rem;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <FooterNav>
        <FooterLink to="/sobre">Sobre Nós</FooterLink>
        <FooterLink to="/contato">Contato</FooterLink>
        <FooterLink to="/politica-privacidade">Política de Privacidade</FooterLink>
        <FooterLink to="/termos-de-uso">Termos de Uso</FooterLink>
      </FooterNav>
      <Copyright>&copy; {new Date().getFullYear()} SchoolKit. Todos os direitos reservados.</Copyright>
    </StyledFooter>
  );
};

export default Footer;
