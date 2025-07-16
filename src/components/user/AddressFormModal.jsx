// src/components/user/AddressFormModal.jsx
import React, { useState, useEffect } from 'react'; // Importe useEffect
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
  max-width: 500px;
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

// Adicionado novo FormGroup para o Label/Tipo de Endereço
const LabelTypeInput = styled(Input)`
  text-transform: capitalize; /* Capitaliza a primeira letra */
`;

const AddressFormModal = ({ onClose, onSave, initialData }) => {
  const [addressData, setAddressData] = useState(initialData || {
    id: null, // Adicione id para rastrear se é uma edição
    label: '', // Adicione um campo para o rótulo do endereço
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: ''
  });

  // Use useEffect para atualizar o estado interno se initialData mudar
  useEffect(() => {
    if (initialData) {
      setAddressData(initialData);
    } else {
      setAddressData({
        id: null,
        label: '',
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
        zipCode: ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(addressData); // Passa o addressData (com ID se for edição)
    // onClose(); // Será fechado pelo ProfilePage após o save
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <FormTitle>{addressData.id ? 'Editar Endereço' : 'Adicionar Novo Endereço'}</FormTitle> {/* Título dinâmico */}
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="label">Tipo de Endereço (ex: Casa, Trabalho):</Label>
            <LabelTypeInput
              type="text"
              id="label"
              name="label"
              value={addressData.label}
              onChange={handleChange}
              placeholder="Ex: Casa, Trabalho, etc."
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="street">Rua/Avenida:</Label>
            <Input
              type="text"
              id="street"
              name="street"
              value={addressData.street}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="number">Número:</Label>
            <Input
              type="text"
              id="number"
              name="number"
              value={addressData.number}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="complement">Complemento (opcional):</Label>
            <Input
              type="text"
              id="complement"
              name="complement"
              value={addressData.complement}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="neighborhood">Bairro:</Label>
            <Input
              type="text"
              id="neighborhood"
              name="neighborhood"
              value={addressData.neighborhood}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="city">Cidade:</Label>
            <Input
              type="text"
              id="city"
              name="city"
              value={addressData.city}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="state">Estado (UF):</Label>
            <Input
              type="text"
              id="state"
              name="state"
              maxLength="2"
              value={addressData.state}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="zipCode">CEP:</Label>
            <Input
              type="text"
              id="zipCode"
              name="zipCode"
              value={addressData.zipCode}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <ButtonContainer>
            <Button $outline type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button $primary type="submit">
              {addressData.id ? 'Salvar Alterações' : 'Salvar Endereço'} {/* Texto do botão dinâmico */}
            </Button>
          </ButtonContainer>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AddressFormModal;
