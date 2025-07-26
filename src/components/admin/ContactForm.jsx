import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import { allEntities } from '../../data/adminEntities';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  min-width: 350px; /* Garante uma largura mínima para o formulário no modal */

  label {
    font-weight: bold;
    color: var(--color-text-dark); /* Ajustei para sua variável de cor */
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
    background-color: var(--color-white);
  }

  .button-group {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
  }
`;

const generateUniqueId = () => `CONTACT-${Date.now()}`;

const ContactForm = ({ contact, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    id: contact ? contact.id : generateUniqueId(),
    name: '',
    email: '',
    phone: '',
    role: '',
    entityType: '',
    entityId: '',
    entityName: '',
  });

  useEffect(() => {
    if (contact) {
      setFormData({
        id: contact.id || generateUniqueId(),
        name: contact.name || '',
        email: contact.email || '',
        phone: contact.phone || '',
        role: contact.role || '',
        entityType: contact.entityType || '',
        entityId: contact.entityId || '',
        entityName: contact.entityName || '',
      });
    } else {
      setFormData({
        id: generateUniqueId(),
        name: '',
        email: '',
        phone: '',
        role: '',
        entityType: '',
        entityId: '',
        entityName: '',
      });
    }
  }, [contact]);

  useEffect(() => {
    if (formData.entityType) {
      const selectedEntities = allEntities[formData.entityType + 's'];
      if (selectedEntities) {
        const selectedEntity = selectedEntities.find(e => e.id === formData.entityId);
        setFormData(prevData => ({
          ...prevData,
          entityName: selectedEntity ? `${selectedEntity.name} (${formData.entityType})` : '',
        }));
      }
    } else {
      setFormData(prevData => ({
        ...prevData,
        entityName: '',
      }));
    }
  }, [formData.entityType, formData.entityId]);

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
        entityName: '',
      }));
    }
  };

  const handleEntityIdChange = (e) => {
    const selectedEntityId = e.target.value;
    let selectedEntityName = '';
    
    if (selectedEntityId && formData.entityType) {
      const currentEntityList = allEntities[formData.entityType + 's'];
      const foundEntity = currentEntityList?.find(e => e.id === selectedEntityId);
      if (foundEntity) {
        selectedEntityName = `${foundEntity.name} (${formData.entityType})`;
      }
    }

    setFormData(prevData => ({
      ...prevData,
      entityId: selectedEntityId,
      entityName: selectedEntityName,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.entityType !== 'user' && (!formData.entityType || !formData.entityId)) {
        alert('Por favor, selecione o tipo e a entidade vinculada.');
        return;
    }
    
    if (formData.entityType === 'user') {
      const userContactData = {
        ...formData,
        entityId: 'USER-CURRENT',
        entityName: 'Nome do Usuário (Comprador)',
      };
      onSave(userContactData);
    } else {
      onSave(formData);
    }
  };

  const currentEntitiesOptions = useMemo(() => {
    const key = formData.entityType ? formData.entityType + 's' : null;
    return key && allEntities[key] ? allEntities[key] : [];
  }, [formData.entityType]);

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
        <option value="user">Usuário (Comprador)</option>
      </select>

      {formData.entityType && formData.entityType !== 'user' && (
        <>
          <label htmlFor="entityId">Entidade Vinculada:</label>
          <select
            id="entityId"
            name="entityId"
            value={formData.entityId}
            onChange={handleEntityIdChange}
            required
          >
            <option value="">Selecione a Entidade</option>
            {currentEntitiesOptions.map(entity => (
              <option key={entity.id} value={entity.id}>
                {entity.name}
              </option>
            ))}
          </select>
        </>
      )}
      {formData.entityType === 'user' && (
        <p style={{marginTop: '10px', color: 'var(--color-text-dark)'}}>
          Este contato será associado a um usuário (comprador).
        </p>
      )}

      <div className="button-group">
        <Button $outline type="button" onClick={onClose}>Cancelar</Button>
        <Button $primary type="submit">Salvar</Button>
      </div>
    </FormContainer>
  );
};

export default ContactForm;
