import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const OrdersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - var(--header-height) - var(--footer-height));
  padding: 20px;
  background-color: var(--color-background-light);
  text-align: center;
  box-sizing: border-box;

  @media (max-width: var(--breakpoint-tablet)) {
    padding: 15px;
  }
`;

const OrdersBox = styled.div`
  background-color: var(--color-background);
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  max-width: 700px;
  width: 90%;
  box-sizing: border-box;

  @media (max-width: var(--breakpoint-tablet)) {
    padding: 30px 20px;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: var(--color-primary);
  margin-bottom: 25px;

  @media (max-width: var(--breakpoint-tablet)) {
    font-size: 2rem;
    margin-bottom: 20px;
  }
`;

const Message = styled.p`
  font-size: 1.1rem;
  color: var(--color-text-light);
  margin-bottom: 30px;

  @media (max-width: var(--breakpoint-tablet)) {
    font-size: 0.95rem;
    margin-bottom: 25px;
  }
`;

const ActionButton = styled(Button)`
  margin-top: 20px;
`;

const OrderHistoryPage = () => {
  const hasOrders = false;

  return (
    <OrdersContainer>
      <OrdersBox>
        <Title>Seus Pedidos</Title>
        {hasOrders ? (
          <Message>
            Aqui você poderá ver o histórico de seus pedidos.
            <br />
            (Lista de pedidos seria exibida aqui)
          </Message>
        ) : (
          <>
            <Message>
              Você ainda não fez nenhum pedido conosco.
              <br />
              Comece a comprar agora e encontre os pacotes ideais para você!
            </Message>
            <Link to="/">
              <ActionButton $primary>
                Buscar Materiais Agora
              </ActionButton>
            </Link>
          </>
        )}
      </OrdersBox>
    </OrdersContainer>
  );
};

export default OrderHistoryPage;
