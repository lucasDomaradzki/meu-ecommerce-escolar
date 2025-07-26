import React from 'react';
import styled from 'styled-components';
import { useCart } from '../../context/CartContext';
import Button from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';

const CartContainer = styled.div`
  padding: 40px 0;
  color: var(--color-text);
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: var(--color-primary);
  margin-bottom: 30px;
`;

const EmptyCartMessage = styled.p`
  font-size: 1.2rem;
  color: var(--color-text-light);
  margin-top: 50px;
`;

const CartItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 15px;
  background-color: var(--color-background-light);

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
  }
`;

const ItemDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  flex: 2;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    flex-direction: column;
  }
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
  border-radius: 4px;
  border: 1px solid var(--color-border);
`;

const ItemName = styled.h3`
  font-size: 1.1rem;
  color: var(--color-text);
  text-align: left; /* Garante que o nome do item fique alinhado à esquerda */
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const ItemPrice = styled.p`
  font-size: 1rem;
  color: var(--color-text-light);
  font-weight: bold;
  text-align: left; /* Garante que o preço do item fique alinhado à esquerda */
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const ItemQuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  justify-content: center; /* Centraliza os controles */

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 10px;
  }
`;

const QuantityButton = styled.button`
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--color-primary-dark);
  }

  &:disabled {
    background-color: var(--color-gray);
    cursor: not-allowed;
  }
`;

const Quantity = styled.span`
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--color-text);
`;

const RemoveButton = styled(Button)`
  background-color: var(--color-danger);
  color: white;
  border: none;
  padding: 8px 15px;
  font-size: 0.9rem;
  margin-left: 15px;

  &:hover {
    background-color: var(--color-danger-dark);
  }
  
  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 10px;
  }
`;

const ItemSubtotal = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--color-accent);
  flex: 0.5; /* Ajustado para ocupar menos espaço */
  text-align: right;

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    margin-top: 10px;
  }
`;

const CartSummary = styled.div`
  border-top: 2px solid var(--color-border);
  padding-top: 20px;
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
  gap: 30px;
  font-size: 1.4rem;
  font-weight: bold;
  color: var(--color-primary-dark);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 15px;
    text-align: center;
  }
`;

const TotalText = styled.span`
  color: var(--color-text);
`;

const TotalValue = styled.span`
  color: var(--color-accent);
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalItems, getCartTotal } = useCart();
  const navigate = useNavigate();

  const handleUpdateQuantity = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const totalItems = getTotalItems();
  const cartTotal = getCartTotal();

  return (
    <CartContainer>
      <Title>Seu Carrinho de Compras</Title>

      {cartItems.length === 0 ? (
        <EmptyCartMessage>Seu carrinho está vazio. Comece a adicionar produtos!</EmptyCartMessage>
      ) : (
        <>
          <CartItemsList>
            {cartItems.map(item => (
              <CartItem key={item.id}>
                <ItemDetails>
                  <ItemImage src={item.imageUrl} alt={item.name} />
                  <div>
                    <ItemName>{item.name}</ItemName>
                    <ItemPrice>R$ {item.price.toFixed(2).replace('.', ',')}</ItemPrice>
                  </div>
                </ItemDetails>
                <ItemQuantityControls>
                  <QuantityButton onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</QuantityButton>
                  <Quantity>{item.quantity}</Quantity>
                  <QuantityButton onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</QuantityButton>
                  <RemoveButton onClick={() => handleRemoveItem(item.id)}>Remover</RemoveButton>
                </ItemQuantityControls>
                <ItemSubtotal>R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</ItemSubtotal>
              </CartItem>
            ))}
          </CartItemsList>

          <CartSummary>
            <div>
              <TotalText>Total de Itens:</TotalText>
              <TotalValue>{totalItems}</TotalValue>
            </div>
            <div>
              <TotalText>Total do Carrinho:</TotalText>
              <TotalValue>R$ {cartTotal.toFixed(2).replace('.', ',')}</TotalValue>
            </div>
          </CartSummary>

          <ButtonGroup>
            <Button $outline onClick={() => navigate('/pacotes')}>Continuar Comprando</Button>
            <Button $primary onClick={() => navigate('/checkout')}>Finalizar Compra</Button>
          </ButtonGroup>
        </>
      )}
    </CartContainer>
  );
};

export default CartPage;
