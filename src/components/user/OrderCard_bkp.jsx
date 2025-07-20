// src/components/user/OrderCard.jsx
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import Card from '../common/Card'; // Reutilizando o Card comum

const OrderCardContainer = styled(Card)`
  /* Herda os estilos do Card, adicionando específicos para pedidos */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  text-align: left;
  cursor: pointer; /* Indica que é clicável */
  border: 1px solid var(--color-border); /* Adiciona uma borda mais visível */

  &:hover {
    border-color: var(--color-primary); /* Destaca no hover */
  }

  h4 {
    font-size: 1.3rem;
    color: var(--color-primary);
    margin-bottom: 10px;
  }

  p {
    font-size: 0.95rem;
    color: var(--color-text);
    margin-bottom: 5px;
  }

  strong {
    color: var(--color-tertiary);
  }

  .status {
    font-weight: bold;
    color: ${props => {
      switch (props.$status) {
        case 'Entregue': return 'var(--color-success)';
        case 'Processando': return 'var(--color-primary-dark)';
        case 'Cancelado': return 'var(--color-danger)';
        default: return 'var(--color-text)';
      }
    }};
  }

  .order-summary {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    flex-wrap: wrap; /* Permite quebrar linha em telas pequenas */
    gap: 10px; /* Espaçamento entre os itens do resumo */
  }

  .order-summary-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .order-actions {
    margin-top: 15px;
    width: 100%;
  }
`;

const OrderCard = ({ order }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/meus-pedidos/${order.id}`); 
  };

  // CORREÇÃO AQUI: Use 'date' e 'totalValue' como em src/data/orders.js
  const formattedDate = new Date(order.date).toLocaleDateString('pt-BR', { // Acessa 'order.date'
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <OrderCardContainer $status={order.status} onClick={handleViewDetails}>
      <h4>Pedido #{order.id}</h4>
      <div className="order-summary">
        <div className="order-summary-item">
          <p>Data:</p>
          <strong>{formattedDate}</strong>
        </div>
        <div className="order-summary-item">
          <p>Valor Total:</p>
          <strong>R$ {order.totalValue.toFixed(2).replace('.', ',')}</strong> {/* Acessa 'order.totalValue' */}
        </div>
        <div className="order-summary-item">
          <p>Status:</p>
          <strong className="status">{order.status}</strong>
        </div>
      </div>
      {/* Botão opcional, pois o Card em si já é clicável */}
      <div className="order-actions">
        <Button $outline $small="true" onClick={handleViewDetails}>Ver Detalhes</Button> {/* Garante $small="true" */}
      </div>
    </OrderCardContainer>
  );
};

export default OrderCard;
