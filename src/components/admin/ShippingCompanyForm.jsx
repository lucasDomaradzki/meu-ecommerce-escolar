// src/components/admin/ShippingCompanyForm.jsx
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
    min-height: 80px;
  }

  .button-group {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
  }
`;

const ShippingCompanyForm = ({ company, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    contactPerson: '',
    phone: '',
    email: '',
    serviceAreas: '',
  });

  // Preenche o formulário se uma empresa estiver sendo editada
  useEffect(() => {
    if (company) {
      setFormData({
        name: company.name || '',
        contactPerson: company.contactPerson || '',
        phone: company.phone || '',
        email: company.email || '',
        serviceAreas: company.serviceAreas || '',
      });
    } else {
      // Limpa o formulário se for um novo cadastro
      setFormData({
        name: '',
        contactPerson: '',
        phone: '',
        email: '',
        serviceAreas: '',
      });
    }
  }, [company]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, id: company ? company.id : null }); // Passa o ID se for edição
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <label htmlFor="name">Nome da Empresa:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label htmlFor="contactPerson">Pessoa de Contato:</label>
      <input
        type="text"
        id="contactPerson"
        name="contactPerson"
        value={formData.contactPerson}
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

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />

      <label htmlFor="serviceAreas">Áreas de Atuação:</label>
      <textarea
        id="serviceAreas"
        name="serviceAreas"
        value={formData.serviceAreas}
        onChange={handleChange}
        placeholder="Ex: Nacional, São Paulo, Rio de Janeiro"
      ></textarea>

      <div className="button-group">
        <Button $outline type="button" onClick={onClose}>Cancelar</Button>
        <Button $primary type="submit">Salvar</Button>
      </div>
    </FormContainer>
  );
};

export default ShippingCompanyForm;
