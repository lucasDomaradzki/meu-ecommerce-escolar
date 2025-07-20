// src/components/admin/ContactForm.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import { allEntities } from '../../data/adminEntities'; // Importa todas as entidades mockadas

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  min-width: 350px; /* Garante uma largura mínima para o formulário no modal */

  label {
    font-weight: bold;
    color: var(--color-text);
  }

  input[type="text"],
  input[type="email"],
  input[type="tel"],
  select {
    padding: 10px;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    font-size: 1rem;
    width: 100%;
    box-sizing: border-box;
    background-color: var(--color-white); /* Garante fundo branco para selects */
  }

  .button-group {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
  }
`;

const ContactForm = ({ contact, onSave, onClose }) => { // Removido 'entities' das props, agora importamos diretamente
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    entityType: '',
    entityId: '',
  });

  const [currentEntities, setCurrentEntities] = useState([]);

  useEffect(() => {
    if (contact) {
      setFormData({
        name: contact.name || '',
        email: contact.email || '',
        phone: contact.phone || '',
        role: contact.role || '',
        entityType: contact.entityType || '',
        entityId: contact.entityId || '',
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: '',
        entityType: '',
        entityId: '',
      });
    }
  }, [contact]);

  useEffect(() => {
    if (formData.entityType && allEntities[formData.entityType]) { // Usa allEntities importado
      setCurrentEntities(allEntities[formData.entityType]);
    } else {
      setCurrentEntities([]);
    }
  }, [formData.entityType]); // Removido 'entities' da dependência

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));

    if (name === 'entityType') {
      setFormData(prevData => ({
        ...prevData,
        entityId: '',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.entityType || !formData.entityId) {
      alert('Por favor, selecione o tipo e a entidade vinculada.');
      return;
    }
    onSave({ ...formData, id: contact ? contact.id : null });
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <label htmlFor="name">Nome:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <label htmlFor="phone">Telefone:</label>
      <input
        type="tel"
        id="phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
      />

      <label htmlFor="role">Função/Cargo:</label>
      <input
        type="text"
        id="role"
        name="role"
        value={formData.role}
        onChange={handleChange}
      />

      <label htmlFor="entityType">Tipo de Entidade Vinculada:</label>
      <select
        id="entityType"
        name="entityType"
        value={formData.entityType}
        onChange={handleChange}
        required
      >
        <option value="">Selecione o Tipo</option>
        <option value="supplier">Distribuidor</option>
        <option value="shippingCompany">Empresa de Entrega</option>
        <option value="school">Escola</option>
        <option value="user">Usuário</option> {/* NOVO: Opção para Usuário */}
      </select>

      {formData.entityType && (
        <>
          <label htmlFor="entityId">Entidade Vinculada:</label>
          <select
            id="entityId"
            name="entityId"
            value={formData.entityId}
            onChange={handleChange}
            required
          >
            <option value="">Selecione a Entidade</option>
            {currentEntities.map(entity => (
              <option key={entity.id} value={entity.id}>
                {entity.name}
              </option>
            ))}
          </select>
        </>
      )}

      <div className="button-group">
        <Button $outline type="button" onClick={onClose}>Cancelar</Button>
        <Button $primary type="submit">Salvar</Button>
      </div>
    </FormContainer>
  );
};

export default ContactForm;
