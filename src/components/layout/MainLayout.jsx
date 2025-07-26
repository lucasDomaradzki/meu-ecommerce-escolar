import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import Header from './Header';
import Footer from './Footer';

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Garante que o layout ocupe a altura total da viewport */
  background-color: var(--color-background);
`;

const MainContent = styled.main`
  flex-grow: 1; /* Permite que o conteúdo principal ocupe o espaço disponível */
  padding: 20px;
  max-width: 1200px; /* Largura máxima para o conteúdo */
  margin: 0 auto; /* Centraliza o conteúdo */
  width: 100%;
`;

const MainLayout = () => {
  return (
    <LayoutWrapper>
      <Header />
      <MainContent>
        <Outlet />
      </MainContent>
      <Footer />
    </LayoutWrapper>
  );
};

export default MainLayout;
