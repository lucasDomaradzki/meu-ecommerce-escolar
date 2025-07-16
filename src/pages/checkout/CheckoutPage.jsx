// src/pages/checkout/CheckoutPage.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import { useCart } from '../../context/CartContext'; // Para limpar o carrinho

const CheckoutContainer = styled.div`
  padding: 40px 0;
  color: var(--color-text);
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: var(--color-primary);
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background-color: var(--color-background-light);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Label = styled.label`
  font-size: 1rem;
  margin-bottom: 5px;
  font-weight: bold;
  color: var(--color-text-light);
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 1rem;
  color: var(--color-text);
  background-color: white;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px rgba(var(--color-primary-rgb), 0.2);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 1rem;
  color: var(--color-text);
  background-color: white;
  resize: vertical;
  min-height: 80px;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px rgba(var(--color-primary-rgb), 0.2);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
  justify-content: center;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart, getCartTotal } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert('Seu carrinho está vazio. Adicione itens antes de finalizar a compra.');
      navigate('/pacotes');
      return;
    }

    // Aqui você enviaria os dados para um backend real
    console.log('Dados do Pedido:', {
      items: cartItems,
      total: getCartTotal(),
      customerInfo: formData
    });

    alert('Compra finalizada com sucesso! Seu pedido foi registrado.');
    clearCart(); // Limpa o carrinho após a compra
    navigate('/'); // Redireciona para a página inicial
  };

  return (
    <CheckoutContainer>
      <Title>Finalizar Compra</Title>

      {cartItems.length === 0 ? (
        <p>Você precisa adicionar itens ao carrinho para finalizar a compra. <Button $primary onClick={() => navigate('/pacotes')}>Ir para Pacotes</Button></p> // Corrigido o comentário
      ) : (
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Nome Completo</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="address">Endereço</Label>
            <TextArea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            ></TextArea>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="city">Cidade</Label>
            <Input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="zip">CEP</Label>
            <Input
              type="text"
              id="zip"
              name="zip"
              value={formData.zip}
              onChange={handleInputChange}
              required
            />
          </FormGroup>

          <ButtonGroup>
            <Button $outline onClick={() => navigate('/carrinho')}>Voltar para o Carrinho</Button>
            <Button $primary type="submit">Confirmar Compra</Button>
          </ButtonGroup>
        </Form>
      )}
    </CheckoutContainer>
  );
};

export default CheckoutPage;
