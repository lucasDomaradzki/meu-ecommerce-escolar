import React from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh; /* Ajuste conforme necessário para o conteúdo principal */
  text-align: center;
  color: var(--color-text);
`;

const Title = styled.h1`
  font-size: 3rem;
  color: var(--color-primary);
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: var(--color-text-light);
  max-width: 600px;
  line-height: 1.6;
`;

const HomePage = () => {
  return (
    <HomeContainer>
      <Title>Bem-vindo ao E-commerce Escolar</Title>
      <Subtitle>
        Descubra os melhores pacotes e materiais para o seu ano letivo.
        Tudo o que você precisa em um só lugar!
      </Subtitle>
    </HomeContainer>
  );
};

export default HomePage;
