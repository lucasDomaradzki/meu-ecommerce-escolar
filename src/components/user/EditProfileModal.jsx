import React, { useState, useEffect } from 'react';
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

const EditProfileModal = ({ onClose, onSave, initialData }) => {
  const [profileData, setProfileData] = useState(initialData || { name: '', email: '' });

  useEffect(() => {
    if (initialData) {
      setProfileData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(profileData);
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <FormTitle>Editar Perfil</FormTitle>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Nome:</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={profileData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">E-mail:</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <ButtonContainer>
            <Button $outline type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button $primary type="submit">
              Salvar Alterações
            </Button>
          </ButtonContainer>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default EditProfileModal;
