import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import Input from '../common/Input';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-size: 0.95rem;
    color: var(--color-text);
    font-weight: bold;
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 20px;

  @media (max-width: var(--breakpoint-mobile)) {
    flex-direction: column;
    button {
      width: 100%;
    }
  }
`;

const ChangePasswordForm = ({ onSave, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmNewPassword) {
      setError('A nova senha e a confirmação da nova senha não coincidem.');
      return;
    }
    if (newPassword.length < 6) {
      setError('A nova senha deve ter no mínimo 6 caracteres.');
      return;
    }
    onSave({ currentPassword, newPassword });
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormGroup>
        <label htmlFor="currentPassword">Senha Atual</label>
        <Input
          type="password"
          id="currentPassword"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Digite sua senha atual"
          required
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="newPassword">Nova Senha</label>
        <Input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Digite sua nova senha"
          required
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="confirmNewPassword">Confirme a Nova Senha</label>
        <Input
          type="password"
          id="confirmNewPassword"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          placeholder="Confirme sua nova senha"
          required
        />
      </FormGroup>

      {error && <p style={{ color: 'var(--color-danger)', fontSize: '0.9rem' }}>{error}</p>}

      <ActionsContainer>
        <Button $outline type="button" onClick={onClose}>Cancelar</Button>
        <Button $primary type="submit">Alterar Senha</Button>
      </ActionsContainer>
    </FormContainer>
  );
};

export default ChangePasswordForm;
