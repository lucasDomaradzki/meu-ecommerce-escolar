// src/components/user/ChangePasswordModal.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: var(--color-background);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  max-width: 450px;
  width: 90%;
  box-sizing: border-box;
  position: relative;

  @media (max-width: var(--breakpoint-mobile)) {
    padding: 20px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--color-text-light);
  cursor: pointer;
  &:hover {
    color: var(--color-danger);
  }
`;

const FormTitle = styled.h2`
  font-size: 1.8rem;
  color: var(--color-primary);
  margin-bottom: 25px;
  text-align: center;

  @media (max-width: var(--breakpoint-mobile)) {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: var(--color-text);
  font-size: 0.95rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid var(--color-border);
  border-radius: 5px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px rgba(var(--color-primary-rgb), 0.2);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 25px;

  @media (max-width: var(--breakpoint-mobile)) {
    flex-direction: column-reverse;
    button {
      width: 100%;
    }
  }
`;

const ChangePasswordModal = ({ onClose, onSave }) => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prevData => ({
      ...prevData,
      [name]: value
    }));
    setError(''); // Limpa o erro ao digitar
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setError('A nova senha e a confirmação não coincidem.');
      return;
    }

    if (passwordData.newPassword.length < 6) { // Exemplo de validação
      setError('A nova senha deve ter pelo menos 6 caracteres.');
      return;
    }

    // Em uma aplicação real, você enviaria passwordData para o backend
    onSave(passwordData);
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <FormTitle>Alterar Senha</FormTitle>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="currentPassword">Senha Atual:</Label>
            <Input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="newPassword">Nova Senha:</Label>
            <Input
              type="password"
              id="newPassword"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="confirmNewPassword">Confirmar Nova Senha:</Label>
            <Input
              type="password"
              id="confirmNewPassword"
              name="confirmNewPassword"
              value={passwordData.confirmNewPassword}
              onChange={handleChange}
              required
            />
          </FormGroup>
          {error && <p style={{ color: 'var(--color-danger)', marginBottom: '15px', textAlign: 'center' }}>{error}</p>}
          <ButtonContainer>
            <Button $outline type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button $primary type="submit">
              Salvar Nova Senha
            </Button>
          </ButtonContainer>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ChangePasswordModal;
