// src/components/admin/OrderDetails.jsx
import React from 'react';
import styled from 'styled-components';

const DetailsContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  color: var(--color-text);
  max-height: 60vh;
  overflow-y: auto;

  h3 {
    color: var(--color-text-dark);
    margin-bottom: 10px;
    border-bottom: 1px solid var(--color-border);
    padding-bottom: 5px;
  }

  p {
    margin: 0;
    line-height: 1.5;
  }

  strong {
    color: var(--color-primary);
  }

  .item-list {
    margin-top: 15px;
    border-top: 1px solid var(--color-border);
    padding-top: 10px;
  }

  .item {
    background-color: var(--color-background-light);
    padding: 10px;
    border-radius: var(--border-radius);
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  .item-info {
      flex: 1;
  }

  .item-quantity-price {
      text-align: right;
      font-weight: bold;
      color: var(--color-text-dark);
  }

  .status-PROCESSANDO { color: var(--color-warning); font-weight: bold; }
  .status-ENVIADO { color: var(--color-info); font-weight: bold; }
  .status-ENTREGUE { color: var(--color-success); font-weight: bold; }
  .status-CANCELADO { color: var(--color-danger); font-weight: bold; }
`;

const OrderDetails = ({ order }) => {
  if (!order) {
    return <p>Selecione um pedido para ver os detalhes.</p>;
  }

  // Prepara os dados do endereço e contato para exibição
  const addressString = order.address_details
    ? `${order.address_details.street}, ${order.address_details.number}${order.address_details.complement ? `, ${order.address_details.complement}` : ''} - ${order.address_details.neighborhood}, ${order.address_details.city}/${order.address_details.state} - ${order.address_details.zipcode}`
    : 'N/A';

  const contactString = order.contact_details
    ? `${order.contact_details.name} (${order.contact_details.function}) - ${order.contact_details.email || 'N/A'}`
    : 'N/A';

  return (
    <DetailsContainer>
      <h3>Informações do Pedido</h3>
      <p><strong>ID do Pedido:</strong> {order.id}</p>
      <p><strong>Número do Pedido:</strong> {order.order_number}</p>
      <p><strong>Tipo de Pedido:</strong> {order.order_type_name}</p>
      <p><strong>Usuário/Distribuidor:</strong> {order.user_or_dist_name}</p>
      <p><strong>Data do Pedido:</strong> {new Date(order.created_at || order.order_date).toLocaleDateString('pt-BR')}</p>
      <p><strong>Valor Total dos Produtos:</strong> R$ {order.order_amount.toFixed(2)}</p>
      <p><strong>Valor do Frete:</strong> R$ {order.shipping_amount.toFixed(2)}</p>
      <p><strong>Valor Total do Pedido:</strong> R$ {(order.order_amount + order.shipping_amount).toFixed(2)}</p>
      <p><strong>Status:</strong> <span className={`status-${order.status.replace(/\s/g, '_').toUpperCase()}`}>{order.status}</span></p>
      <p><strong>Método de Pagamento:</strong> {order.payment_method}</p>
      <p><strong>Empresa de Entrega:</strong> {order.shipping_company_name}</p>
      <p><strong>Data Estimada de Chegada (ETA):</strong> {new Date(order.eta).toLocaleDateString('pt-BR')}</p>
      <p><strong>Endereço de Entrega:</strong> {addressString}</p>
      {order.contact_id && order.order_type_name === 'DISTRIBUIDOR' && (
        <p><strong>Contato do Distribuidor:</strong> {contactString}</p>
      )}

      <div className="item-list">
        <h3>Itens do Pedido</h3>
        {order.items && order.items.length > 0 ? (
          order.items.map((item, index) => (
            <div key={index} className="item">
              <div className="item-info">
                <p><strong>Produto:</strong> {item.product_name}</p>
                <p><strong>Preço Unitário:</strong> R$ {item.unit_price.toFixed(2)}</p>
              </div>
              <div className="item-quantity-price">
                <p><strong>Qtd:</strong> {item.quantity}</p>
                <p><strong>Subtotal:</strong> R$ {(item.quantity * item.unit_price).toFixed(2)}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum item neste pedido.</p>
        )}
      </div>
    </DetailsContainer>
  );
};

export default OrderDetails;
