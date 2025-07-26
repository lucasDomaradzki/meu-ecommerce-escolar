import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Card = styled(Link)`
  display: block;
  background-color: var(--color-white);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-small);
  padding: 20px;
  margin-bottom: 15px;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const OrderId = styled.h3`
  font-size: 1.2em;
  color: var(--color-primary-dark);
  margin: 0;
`;

const Status = styled.span`
  background-color: ${props => {
    switch (props.$status) {
      case 'PENDING': return 'var(--color-warning)';
      case 'PROCESSING': return 'var(--color-info)';
      case 'SHIPPED': return 'var(--color-secondary)';
      case 'DELIVERED': return 'var(--color-success)';
      case 'CANCELLED': return 'var(--color-danger)';
      default: return 'var(--color-gray)';
    }
  }};
  color: var(--color-white);
  padding: 5px 10px;
  border-radius: var(--border-radius);
  font-size: 0.8em;
  font-weight: bold;
`;

const Info = styled.p`
  margin: 5px 0;
  color: var(--color-text);
`;

const Total = styled.p`
  font-size: 1.1em;
  font-weight: bold;
  color: var(--color-text-dark);
  margin-top: 15px;
  text-align: right;
`;

const OrderCard = ({ order }) => {
  if (!order) return null;

  return (
    <Card to={`/pedidos/${order.id}`}>
      <Header>
        <OrderId>Pedido #{order.id}</OrderId>
        <Status $status={order.status}>{order.status}</Status>
      </Header>
      <Info>Distribuídor: {order.distributorName || 'N/A'}</Info>
      <Info>Data do Pedido: {order.orderDate || 'N/A'}</Info>
      <Info>Status: {order.status || 'N/A'}</Info>
      <Total>Total: R$ {(order.total || 0).toFixed(2)}</Total>
    </Card>
  );
};

export default OrderCard;
