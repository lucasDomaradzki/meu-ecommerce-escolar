import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { allEntities } from '../../data/adminEntities';
import Button from '../../components/common/Button';

const DetailPageContainer = styled.div`
  background-color: var(--color-white);
  padding: 30px;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-small);
  margin: 20px auto;
  max-width: 900px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
`;

const Title = styled.h2`
  color: var(--color-text-dark);
  font-size: 2em;
  margin: 0;
`;

const OrderInfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px 30px;
  margin-bottom: 30px;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  padding: 20px;
  background-color: var(--color-background);
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.span`
  font-weight: bold;
  color: var(--color-text);
  margin-bottom: 5px;
`;

const Value = styled.span`
  color: var(--color-text-dark);
`;

const SectionTitle = styled.h3`
  color: var(--color-primary-dark);
  font-size: 1.5em;
  margin-bottom: 15px;
  border-bottom: 2px solid var(--color-primary-light);
  padding-bottom: 5px;
`;

const ProductsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  background-color: var(--color-background);
  max-height: 250px; /* Limita a altura para scroll */
  overflow-y: auto;
`;

const ProductItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  border-bottom: 1px solid var(--color-border);
  &:last-child {
    border-bottom: none;
  }
`;

const ProductName = styled.span`
  font-weight: bold;
  color: var(--color-text-dark);
  flex: 1;
`;

const ProductDetails = styled.div`
  display: flex;
  gap: 20px;
  color: var(--color-text);
`;

const OrderSummary = styled.div`
  margin-top: 30px;
  padding-top: 20px;
  border-top: 2px solid var(--color-border);
  text-align: right;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  margin-bottom: 10px;
`;

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = () => {
      setLoading(true);
      const foundOrder = allEntities.orders.find(o => o.id === orderId);
      setOrder(foundOrder);
      setLoading(false);
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return <DetailPageContainer><p>Carregando detalhes do pedido...</p></DetailPageContainer>;
  }

  if (!order) {
    return <DetailPageContainer><p>Pedido não encontrado.</p></DetailPageContainer>;
  }

  return (
    <DetailPageContainer>
      <Header>
        <Title>Detalhes do Pedido #{order.id}</Title>
        <Button onClick={() => navigate('/pedidos')}>Voltar aos Pedidos</Button>
      </Header>

      <OrderInfoGrid>
        <InfoItem>
          <Label>Distribuídor:</Label>
          <Value>{order.distributorName || 'N/A'}</Value>
        </InfoItem>
        <InfoItem>
          <Label>Contato do Distribuidor:</Label>
          <Value>{order.contactPersonName || 'N/A'}</Value>
        </InfoItem>
        <InfoItem>
          <Label>Endereço de Entrega:</Label>
          <Value>{order.deliveryAddress || 'N/A'}</Value>
        </InfoItem>
        <InfoItem>
          <Label>Empresa de Entrega:</Label>
          <Value>{order.shippingCompanyName || 'N/A'}</Value>
        </InfoItem>
        <InfoItem>
          <Label>Status:</Label>
          <Value>{order.status || 'N/A'}</Value>
        </InfoItem>
        <InfoItem>
          <Label>Data do Pedido:</Label>
          <Value>{order.orderDate || 'N/A'}</Value>
        </InfoItem>
        <InfoItem>
          <Label>Data de Entrega:</Label>
          <Value>{order.deliveryDate || 'N/A'}</Value>
        </InfoItem>
        <InfoItem>
          <Label>Código de Rastreamento:</Label>
          <Value>{order.trackingCode || 'N/A'}</Value>
        </InfoItem>
      </OrderInfoGrid>

      <SectionTitle>Produtos no Pedido</SectionTitle>
      <ProductsList>
        {order.items && order.items.length > 0 ? (
          order.items.map(item => (
            <ProductItem key={item.productId}>
              <ProductName>{item.productName || 'Produto Desconhecido'}</ProductName>
              <ProductDetails>
                <span>Qtd: {item.quantity || 0}</span>
                <span>Preço Unitário: R$ {(item.price || 0).toFixed(2)}</span>
              </ProductDetails>
            </ProductItem>
          ))
        ) : (
          <p style={{ padding: '15px' }}>Nenhum item neste pedido.</p>
        )}
      </ProductsList>

      <OrderSummary>
        <SummaryItem>
          <Label>Total do Pedido:</Label>
          <Value>R$ {(order.total || 0).toFixed(2)}</Value>
        </SummaryItem>
      </OrderSummary>
    </DetailPageContainer>
  );
};

export default OrderDetailPage;
