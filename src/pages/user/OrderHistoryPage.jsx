// src/pages/user/OrderHistoryPage.jsx
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Dados de pedidos simulados
const mockOrders = [
  {
    id: 'ORD001',
    date: '2025-07-10',
    status: 'Concluído',
    total: 280.00,
    items: [
      { id: 2, name: 'Kit Escolar Completo - Fundamental II', quantity: 1, price: 280.00, imageUrl: '/src/assets/images/kit-escolar-completo-fundamental-ii.jpg' },
    ],
  },
  {
    id: 'ORD002',
    date: '2025-06-25',
    status: 'Concluído',
    total: 155.50,
    items: [
      { id: 1, name: 'Pacote de Material Básico - Fundamental I', quantity: 1, price: 120.50, imageUrl: '/src/assets/images/kit-basico-fundamental-i.jpg' },
      { id: 7, name: 'Borracha Branca Mercur', quantity: 1, price: 5.00, imageUrl: '/src/assets/images/borracha.jpg' },
      { id: 8, name: 'Apontador com Depósito Faber-Castell', quantity: 1, price: 8.00, imageUrl: '/src/assets/images/apontador.jpg' },
      { id: 9, name: 'Tesoura Escolar sem Ponta Tramontina', quantity: 1, price: 12.00, imageUrl: '/src/assets/images/tesoura.jpg' },
      { id: 10, name: 'Cola Bastão Pritt (20g)', quantity: 1, price: 10.00, imageUrl: '/src/assets/images/cola.jpg' },
    ],
  },
  {
    id: 'ORD003',
    date: '2025-05-15',
    status: 'Concluído',
    total: 130.00,
    items: [
      { id: 3, name: 'Mochila Escolar Reforçada', quantity: 1, price: 95.00, imageUrl: '/src/assets/images/mochila-escolar.jpg' },
      { id: 4, name: 'Caderno Universitário 10 Matérias', quantity: 1, price: 35.00, imageUrl: '/src/assets/images/caderno-universitario.jpg' },
    ],
  },
];

const OrderHistoryContainer = styled.div`
  padding: 40px 20px;
  max-width: 900px;
  margin: 0 auto;
  color: var(--color-text);
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: var(--color-primary);
  margin-bottom: 30px;
`;

const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const OrderCard = styled.div`
  background-color: var(--color-background-light);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 25px;
  text-align: left;
  border: 1px solid var(--color-border);
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  border-bottom: 1px dashed var(--color-border);
  padding-bottom: 10px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
`;

const OrderInfo = styled.p`
  font-size: 1rem;
  color: var(--color-text-light);
  span {
    font-weight: bold;
    color: var(--color-text);
  }
`;

const OrderTotal = styled.p`
  font-size: 1.3rem;
  font-weight: bold;
  color: var(--color-accent);
`;

const ItemList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 15px 0 0;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px 0;
  border-bottom: 1px dotted var(--color-border);

  &:last-child {
    border-bottom: none;
  }
`;

const ItemImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
  border-radius: 4px;
  border: 1px solid var(--color-border);
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const ItemName = styled.p`
  font-weight: bold;
  color: var(--color-text);
`;

const ItemQuantityPrice = styled.p`
  font-size: 0.9rem;
  color: var(--color-text-light);
`;

const EmptyOrdersMessage = styled.p`
  font-size: 1.2rem;
  color: var(--color-text-light);
  margin-top: 50px;
`;

const OrderHistoryPage = () => {
  return (
    <OrderHistoryContainer>
      <Title>Meus Pedidos</Title>

      {mockOrders.length === 0 ? (
        <EmptyOrdersMessage>Você ainda não fez nenhum pedido.</EmptyOrdersMessage>
      ) : (
        <OrderList>
          {mockOrders.map(order => (
            <OrderCard key={order.id}>
              <OrderHeader>
                <OrderInfo>
                  Pedido #<span>{order.id}</span>
                </OrderInfo>
                <OrderInfo>
                  Data: <span>{new Date(order.date).toLocaleDateString('pt-BR')}</span>
                </OrderInfo>
                <OrderInfo>
                  Status: <span>{order.status}</span>
                </OrderInfo>
                <OrderTotal>
                  Total: R$ {order.total.toFixed(2).replace('.', ',')}
                </OrderTotal>
              </OrderHeader>
              <ItemList>
                {order.items.map(item => (
                  <Item key={item.id}>
                    <ItemImage src={item.imageUrl} alt={item.name} />
                    <ItemDetails>
                      <ItemName>{item.name}</ItemName>
                      <ItemQuantityPrice>{item.quantity} x R$ {item.price.toFixed(2).replace('.', ',')}</ItemQuantityPrice>
                    </ItemDetails>
                  </Item>
                ))}
              </ItemList>
            </OrderCard>
          ))}
        </OrderList>
      )}
      <p style={{marginTop: '30px', fontSize: '0.9rem', color: 'var(--color-text-light)'}}>
        <Link to="/perfil" style={{color: 'var(--color-primary)', textDecoration: 'none'}}>Voltar ao Perfil</Link>
      </p>
    </OrderHistoryContainer>
  );
};

export default OrderHistoryPage;
