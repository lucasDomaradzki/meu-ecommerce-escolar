// src/components/admin/SchoolForm.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  min-width: 300px; /* Garante uma largura mínima para o formulário no modal */

  label {
    font-weight: bold;
    color: var(--color-text);
  }

  input[type="text"],
  input[type="email"],
  input[type="tel"],
  textarea {
    padding: 10px;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    font-size: 1rem;
    width: 100%;
    box-sizing: border-box; /* Garante que padding não aumente a largura total */
  }

  textarea {
    resize: vertical; /* Permite redimensionar verticalmente */
    min-height: 60px;
  }

  .button-group {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
  }
`;

const SchoolForm = ({ school, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    contactPerson: '',
  });

  // Preenche o formulário se uma escola estiver sendo editada
  useEffect(() => {
    if (school) {
      setFormData({
        name: school.name || '',
        address: school.address || '',
        phone: school.phone || '',
        email: school.email || '',
        contactPerson: school.contactPerson || '',
      });
    } else {
      // Limpa o formulário se for um novo cadastro
      setFormData({
        name: '',
        address: '',
        phone: '',
        email: '',
        contactPerson: '',
      });
    }
  }, [school]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, id: school ? school.id : null }); // Passa o ID se for edição
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <label htmlFor="name">Nome da Escola:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label htmlFor="address">Endereço:</label>
      <textarea
        id="address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        required
      ></textarea>

      <label htmlFor="phone">Telefone:</label>
      <input
        type="tel"
        id="phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />

      <label htmlFor="contactPerson">Pessoa de Contato:</label>
      <input
        type="text"
        id="contactPerson"
        name="contactPerson"
        value={formData.contactPerson}
        onChange={handleChange}
      />

      <div className="button-group">
        <Button $outline type="button" onClick={onClose}>Cancelar</Button>
        <Button $primary type="submit">Salvar</Button>
      </div>
    </FormContainer>
  );
};

export default SchoolForm;
