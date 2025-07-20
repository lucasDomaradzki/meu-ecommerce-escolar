// src/components/admin/ContactForm.jsx
import React, { useState, useEffect, useMemo } from 'react'; // <--- Adicione useMemo aqui
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

// Função auxiliar para gerar um ID único simples (para mocks)
const generateUniqueId = () => `CONTACT-${Date.now()}`;

const ContactForm = ({ contact, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    id: contact ? contact.id : generateUniqueId(), // Garante ID para novos contatos
    name: '',
    email: '',
    phone: '',
    role: '',
    entityType: '',
    entityId: '',
    entityName: '', // Novo campo para armazenar o nome completo da entidade vinculada
  });

  // Use useEffect para inicializar o formulário quando o 'contact' prop muda
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
      // Resetar para novo contato
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

  // Efeito para atualizar `entityName` e `entityId` quando `entityType` muda ou `contact` é carregado
  useEffect(() => {
    if (formData.entityType) {
      const selectedEntities = allEntities[formData.entityType + 's']; // Ex: 'suppliers', 'schools'
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
  }, [formData.entityType, formData.entityId]); // Depende também do entityId para o nome

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));

    if (name === 'entityType') {
      setFormData(prevData => ({
        ...prevData,
        entityId: '', // Resetar entityId ao mudar o tipo de entidade
        entityName: '', // Resetar entityName também
      }));
    }
  };

  const handleEntityIdChange = (e) => {
    const selectedEntityId = e.target.value;
    let selectedEntityName = '';
    
    if (selectedEntityId && formData.entityType) {
      const currentEntityList = allEntities[formData.entityType + 's']; // Ex: allEntities.suppliers
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

    // Validação básica para garantir que tipo e entidade foram selecionados
    if (formData.entityType !== 'user' && (!formData.entityType || !formData.entityId)) {
        alert('Por favor, selecione o tipo e a entidade vinculada.');
        return;
    }
    
    // Se for tipo "user", garantir que entityId e entityName sejam "N/A" ou específicos
    if (formData.entityType === 'user') {
      // Aqui, em um cenário real, você buscaria o ID do usuário logado ou selecionado.
      // Para o mock, vamos definir um valor padrão.
      const userContactData = {
        ...formData,
        entityId: 'USER-CURRENT', // Exemplo de ID para usuário (pode ser o ID do usuário logado)
        entityName: 'Nome do Usuário (Comprador)', // Exemplo de nome para usuário
      };
      onSave(userContactData);
    } else {
      onSave(formData);
    }
  };

  // Mapeia todas as entidades para o dropdown secundário
  const currentEntitiesOptions = useMemo(() => {
    // Adiciona um 's' ao final do entityType para corresponder às chaves em allEntities
    // Ex: 'supplier' -> 'suppliers'
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
        type="tel" // Alterado para 'tel' para melhor semântica
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
        <option value="user">Usuário (Comprador)</option> {/* Opção para Usuário */}
      </select>

      {formData.entityType && formData.entityType !== 'user' && ( // Só mostra se um tipo foi selecionado e NÃO for "usuário"
        <>
          <label htmlFor="entityId">Entidade Vinculada:</label>
          <select
            id="entityId"
            name="entityId"
            value={formData.entityId}
            onChange={handleEntityIdChange} // Nova função de tratamento
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
      {/* Se for tipo "user", podemos mostrar um campo informativo ou ocultar */}
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
