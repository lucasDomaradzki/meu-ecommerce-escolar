// src/pages/user/OrderDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { orders as mockOrders } from '../../data/orders'; 

const OrderDetailPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  min-height: calc(100vh - var(--header-height) - var(--footer-height));
  background-color: var(--color-background-light);
`;

const OrderDetailCard = styled(Card)`
  width: 100%;
  max-width: 900px;
  padding: 30px;
  text-align: left;
  margin-bottom: 30px;

  h1 {
    font-size: 2.5rem;
    color: var(--color-primary);
    margin-bottom: 20px;
    border-bottom: 1px solid var(--color-border);
    padding-bottom: 15px;
  }

  h2 {
    font-size: 1.8rem;
    color: var(--color-primary-dark);
    margin-top: 30px;
    margin-bottom: 15px;
  }

  p {
    font-size: 1.1rem;
    color: var(--color-text);
    margin-bottom: 8px;
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

  .item-list {
    margin-top: 15px;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    overflow: hidden;
  }

  .item-header, .item-row {
    display: grid;
    grid-template-columns: 3fr 1fr 1fr 1fr; /* Nome, Qtd, Preço Unit, Total */
    gap: 15px;
    padding: 12px 20px;
    border-bottom: 1px solid var(--color-border-light);
    align-items: center;

    @media (max-width: var(--breakpoint-tablet)) {
        grid-template-columns: 1fr 1fr; /* Nome e Total para mobile */
        .item-qty, .item-unit-price {
            display: none; /* Esconde Qtd e Preço Unit em mobile */
        }
    }
  }

  .item-header {
    background-color: var(--color-background-light);
    font-weight: bold;
    color: var(--color-primary-dark);
  }

  .item-row:last-child {
    border-bottom: none;
  }

  .item-name {
    display: flex;
    align-items: center;
    gap: 10px;
    img {
      width: 50px;
      height: 50px;
      object-fit: contain;
      border-radius: 4px;
    }
    a {
        color: var(--color-primary);
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
    }
  }

  .order-summary-details {
    margin-top: 25px;
    text-align: right;

    p {
        margin-bottom: 5px;
        font-size: 1.1rem;
    }
    p:last-child {
        font-size: 1.4rem;
        font-weight: bold;
        color: var(--color-tertiary);
        margin-top: 10px;
    }
  }

  @media (max-width: var(--breakpoint-tablet)) {
    padding: 20px;
    h1 {
      font-size: 2rem;
    }
    h2 {
      font-size: 1.6rem;
    }
    p {
      font-size: 1rem;
    }
  }
`;

const OrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const foundOrder = mockOrders.find(o => o.id === id);
    if (foundOrder) {
      setOrder(foundOrder);
    } else {
      navigate('/404'); 
    }
  }, [id, navigate]);

  if (!order) {
    return <OrderDetailPageContainer>Carregando detalhes do pedido...</OrderDetailPageContainer>;
  }

  // CORREÇÃO AQUI: Use 'date' para a data
  const formattedDate = new Date(order.date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <OrderDetailPageContainer>
      <OrderDetailCard $status={order.status}>
        <h1>Detalhes do Pedido #{order.id}</h1>
        <p><strong>Data do Pedido:</strong> {formattedDate}</p>
        <p><strong>Status:</strong> <span className="status">{order.status}</span></p>

        <h2>Endereço de Entrega</h2>
        {/* CORREÇÃO AQUI: Use as propriedades de endereço conforme seu orders.js */}
        <p>{order.shippingAddress.street}</p> {/* Apenas a rua, se não houver outras informações detalhadas */}
        <p>{order.shippingAddress.city} - {order.shippingAddress.state}</p> {/* Cidade e Estado */}
        <p>CEP: {order.shippingAddress.zip}</p> {/* CEP */}

        <h2>Itens do Pedido</h2>
        <div className="item-list">
          <div className="item-header">
            <span>Produto</span>
            <span className="item-qty">Qtd</span>
            <span className="item-unit-price">Preço Unit.</span>
            <span>Total</span>
          </div>
          {order.items.map(item => (
            <div className="item-row" key={item.productId}>
              <span className="item-name">
                {item.imageUrl && <img src={item.imageUrl} alt={item.name} />}
                {item.link ? <Link to={item.link}>{item.name}</Link> : item.name}
              </span>
              <span className="item-qty">{item.quantity}</span>
              <span className="item-unit-price">R$ {item.price.toFixed(2).replace('.', ',')}</span>
              <span>R$ {(item.quantity * item.price).toFixed(2).replace('.', ',')}</span>
            </div>
          ))}
        </div>

        <div className="order-summary-details">
            <p>Subtotal: R$ {order.totalValue.toFixed(2).replace('.', ',')}</p> {/* CORREÇÃO: totalValue */}
            <p>Frete: R$ 0,00 {/* Simulado, adicionar lógica real se houver */}</p>
            <p>Total do Pedido: <strong>R$ {order.totalValue.toFixed(2).replace('.', ',')}</strong></p> {/* CORREÇÃO: totalValue */}
        </div>

      </OrderDetailCard>
      <Button $outline onClick={() => navigate('/meus-pedidos')}>Voltar para Meus Pedidos</Button>
    </OrderDetailPageContainer>
  );
};

export default OrderDetailPage;
