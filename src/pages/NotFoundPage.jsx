// src/pages/NotFoundPage.jsx
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; /* Ocupa a tela inteira */
  text-align: center;
  background-color: var(--color-background);
  color: var(--color-text);
`;

const Title = styled.h1`
  font-size: 4rem;
  color: var(--color-primary);
  margin-bottom: 1rem;
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

const Message = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
`;

const HomeLink = styled(Link)`
  background-color: var(--color-primary);
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--color-primary-dark);
  }
`;

function NotFoundPage() {
  return (
    <NotFoundContainer>
      <Title>404</Title>
      <Subtitle>Página Não Encontrada</Subtitle>
      <Message>
        A página que você está procurando pode ter sido removida, ter seu nome alterado ou está temporariamente indisponível.
      </Message>
      <HomeLink to="/">Ir para a Página Inicial</HomeLink>
    </NotFoundContainer>
  );
}

export default NotFoundPage;
