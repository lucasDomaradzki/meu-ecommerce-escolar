import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

const FormContainer = styled.div`
  background-color: var(--color-background-light);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  width: 100%;
  max-width: 500px;
  box-sizing: border-box;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: var(--color-text);
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid var(--color-border);
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px rgba(var(--color-primary-rgb), 0.2);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid var(--color-border);
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
  resize: vertical;
  min-height: 80px;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px rgba(var(--color-primary-rgb), 0.2);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid var(--color-border);
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
  background-color: white;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px rgba(var(--color-primary-rgb), 0.2);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
`;

const UserContactForm = ({ contact, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    primary_phone: '',
    whats_app: '',
    email: '',
    preferable_contact_time: '',
    relationship: '',
    ...contact
  });

  useEffect(() => {
    if (contact) {
      setFormData(contact);
    }
  }, [contact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    if (!contact) {
      setFormData({
        name: '',
        primary_phone: '',
        whats_app: '',
        email: '',
        preferable_contact_time: '',
        relationship: '',
      });
    }
  };

  return (
    <FormContainer>
      <h3>{contact ? 'Editar Contato' : 'Adicionar Novo Contato'}</h3>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Nome:</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="primary_phone">Telefone Principal:</Label>
          <Input
            type="text"
            id="primary_phone"
            name="primary_phone"
            value={formData.primary_phone}
            onChange={handleChange}
            placeholder="(XX)YYYYY-ZZZZ"
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="whats_app">WhatsApp:</Label>
          <Input
            type="text"
            id="whats_app"
            name="whats_app"
            value={formData.whats_app}
            onChange={handleChange}
            placeholder="(XX)YYYYY-ZZZZ"
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Email:</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="preferable_contact_time">Melhor Horário para Contato:</Label>
          <Input
            type="text"
            id="preferable_contact_time"
            name="preferable_contact_time"
            value={formData.preferable_contact_time}
            onChange={handleChange}
            placeholder="Ex: Manhã, Tarde, Comercial"
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="relationship">Relação (Ex: Filho, Cônjuge, Responsável):</Label>
          <Input
            type="text"
            id="relationship"
            name="relationship"
            value={formData.relationship}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <ButtonGroup>
          <Button $outline type="button" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">
            {contact ? 'Salvar Alterações' : 'Adicionar Contato'}
          </Button>
        </ButtonGroup>
      </form>
    </FormContainer>
  );
};

export default UserContactForm;
