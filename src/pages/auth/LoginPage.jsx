// src/pages/auth/LoginPage.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card'; // Para envolver o formulário

const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: var(--color-background);
  padding: 20px;
`;

const AuthCard = styled(Card)`
  width: 100%;
  max-width: 400px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: var(--color-primary);
  margin-bottom: 10px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
`;

const StyledLink = styled(Link)`
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
  margin-top: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de autenticação virá aqui
    console.log('Login attempt:', { email, password });
    alert(`Login com ${email} (Ainda não implementado!)`);
  };

  return (
    <AuthContainer>
      <AuthCard>
        <Title>Login</Title>
        <StyledForm onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Seu Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Sua Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" primary>
            Entrar
          </Button>
        </StyledForm>
        <StyledLink to="/cadastro">Não tem uma conta? Cadastre-se</StyledLink>
      </AuthCard>
    </AuthContainer>
  );
};

export default LoginPage;
