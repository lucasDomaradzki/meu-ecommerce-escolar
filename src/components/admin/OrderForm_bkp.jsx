// src/components/admin/OrderForm.jsx
import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import { allEntities } from '../../data/adminEntities'; // Importa todas as entidades

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  max-height: 70vh;
  overflow-y: auto;

  div {
    display: flex;
    flex-direction: column;
  }

  label {
    font-weight: bold;
    margin-bottom: 5px;
    color: var(--color-text);
  }

  input[type="text"],
  input[type="number"],
  input[type="date"],
  select {
    padding: 10px;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    font-size: 1rem;
    background-color: var(--color-white);
  }

  .item-entry {
    display: flex;
    align-items: flex-end;
    gap: 10px;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px dashed var(--color-border);
    border-radius: var(--border-radius);
    background-color: var(--color-background-light);

    .product-select {
        flex: 3;
    }
    .quantity-input {
        flex: 1;
        max-width: 100px;
    }
    .remove-button {
        flex-shrink: 0;
        padding: 8px 12px;
        background-color: var(--color-danger);
        color: white;
        border: none;
        border-radius: var(--border-radius);
        cursor: pointer;
        &:hover {
            background-color: #cc0000;
        }
    }
  }

  .add-item-button {
    margin-top: 10px;
    background-color: var(--color-info);
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: var(--border-radius);
    cursor: pointer;
    &:hover {
        background-color: #007bff;
    }
  }

  .button-group {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
    position: sticky;
    bottom: 0;
    background-color: var(--color-background);
    padding-top: 10px;
    border-top: 1px solid var(--color-border);
  }
`;

const OrderForm = ({ onSave, onClose }) => {
  const [formData, setFormData] = useState({
    order_type_id: 2, // Padrão para DISTRIBUIDOR (Estoque)
    user_id: null, // Pedidos de estoque não têm user_id
    address_id: '',
    contact_id: '',
    shipping_company_id: '',
    eta: '',
    items: [{ product_id: '', quantity: 1 }],
    order_amount: 0,
    shipping_amount: 0,
  });

  // State para o distribuidor selecionado no formulário
  const [selectedDistributorId, setSelectedDistributorId] = useState('');

  // Dados mockados
  const distributors = allEntities.distributor || [];
  const products = allEntities.product || [];
  const shippingCompanies = allEntities.shipping_company || [];
  const contacts = allEntities.contact || [];
  const addresses = allEntities.address || [];

  // Filtra produtos pelo distribuidor selecionado
  const productsForSelectedDistributor = useMemo(() => {
    if (!selectedDistributorId) return [];
    return products.filter(p => p.supplier_id === selectedDistributorId);
  }, [selectedDistributorId, products]);

  // Filtra contatos e endereços vinculados ao distribuidor selecionado
  const contactsForSelectedDistributor = useMemo(() => {
    if (!selectedDistributorId) return [];
    return contacts.filter(c => c.entity_type === 'distributor' && c.entity_id === selectedDistributorId);
  }, [selectedDistributorId, contacts]);

  const addressesForSelectedDistributor = useMemo(() => {
    if (!selectedDistributorId) return [];
    return addresses.filter(a => a.distributor_id === selectedDistributorId);
  }, [selectedDistributorId, addresses]);


  // Efeito para calcular o order_amount total quando os itens mudam
  useEffect(() => {
    let total = 0;
    formData.items.forEach(item => {
      const product = products.find(p => p.id === item.product_id);
      if (product) {
        total += product.price * item.quantity;
      }
    });
    setFormData(prev => ({ ...prev, order_amount: total }));
  }, [formData.items, products]);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value
    }));
  };

  const handleDistributorChange = (e) => {
    const distId = e.target.value;
    setSelectedDistributorId(distId);
    // Resetar produtos, contato e endereço quando o distribuidor muda
    setFormData(prev => ({
      ...prev,
      items: [{ product_id: '', quantity: 1 }],
      contact_id: '',
      address_id: '',
    }));
  };

  const handleItemChange = (index, e) => {
    const { name, value, type } = e.target;
    const newItems = [...formData.items];
    newItems[index] = {
      ...newItems[index],
      [name]: type === 'number' ? parseFloat(value) : value
    };
    setFormData(prev => ({ ...prev, items: newItems }));
  };

  const handleAddItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { product_id: '', quantity: 1 }]
    }));
  };

  const handleRemoveItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, items: newItems }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validações básicas
    if (!selectedDistributorId) {
      alert('Por favor, selecione um distribuidor.');
      return;
    }
    if (!formData.address_id) {
      alert('Por favor, selecione um endereço para o distribuidor.');
      return;
    }
    if (!formData.contact_id) {
        alert('Por favor, selecione um contato para o distribuidor.');
        return;
    }
    if (!formData.shipping_company_id) {
      alert('Por favor, selecione uma empresa de entrega.');
      return;
    }
    if (!formData.eta) {
      alert('Por favor, informe a data estimada de chegada (ETA).');
      return;
    }
    if (formData.items.length === 0 || formData.items.some(item => !item.product_id || item.quantity <= 0)) {
      alert('Por favor, adicione ao menos um item válido ao pedido.');
      return;
    }

    // Criar um order_number sequencial mockado para o exemplo
    const lastOrderNumber = allEntities.order.reduce((max, order) => {
        const num = parseInt(order.order_number, 10);
        return num > max ? num : max;
    }, 0);
    const newOrderNumber = String(lastOrderNumber + 1).padStart(4, '0');

    const newOrder = {
      ...formData,
      id: `ORD${newOrderNumber}`, // ID mockado
      order_number: newOrderNumber,
      created_at: new Date().toISOString(),
      updated_at: null,
      status: 'PROCESSANDO', // Status inicial para pedido de estoque
      payment_method: 'Fatura', // Método de pagamento padrão para estoque
      // user_name e order_type_name serão preenchidos na AdminOrdersPage
    };

    onSave(newOrder);
    onClose();
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      {/* Seleção do Distribuidor */}
      <div>
        <label htmlFor="distributor_id">Distribuidor:</label>
        <select
          id="distributor_id"
          name="distributor_id"
          value={selectedDistributorId}
          onChange={handleDistributorChange}
          required
        >
          <option value="">Selecione um distribuidor</option>
          {distributors.map(dist => (
            <option key={dist.id} value={dist.id}>
              {dist.name}
            </option>
          ))}
        </select>
      </div>

      {/* Contato do Distribuidor */}
      <div>
        <label htmlFor="contact_id">Contato do Distribuidor:</label>
        <select
          id="contact_id"
          name="contact_id"
          value={formData.contact_id}
          onChange={handleInputChange}
          required
          disabled={!selectedDistributorId || contactsForSelectedDistributor.length === 0}
        >
          <option value="">Selecione um contato</option>
          {contactsForSelectedDistributor.map(contact => (
            <option key={contact.id} value={contact.id}>
              {contact.name} ({contact.function})
            </option>
          ))}
        </select>
      </div>

      {/* Endereço do Distribuidor */}
      <div>
        <label htmlFor="address_id">Endereço de Entrega (Distribuidor):</label>
        <select
          id="address_id"
          name="address_id"
          value={formData.address_id}
          onChange={handleInputChange}
          required
          disabled={!selectedDistributorId || addressesForSelectedDistributor.length === 0}
        >
          <option value="">Selecione um endereço</option>
          {addressesForSelectedDistributor.map(addr => (
            <option key={addr.id} value={addr.id}>
              {addr.street}, {addr.number} - {addr.neighborhood}, {addr.city}/{addr.state}
            </option>
          ))}
        </select>
      </div>

      {/* Itens do Pedido */}
      <h3>Produtos do Pedido</h3>
      {formData.items.map((item, index) => (
        <div key={index} className="item-entry">
          <div className="product-select">
            <label htmlFor={`product_id_${index}`}>Produto:</label>
            <select
              id={`product_id_${index}`}
              name="product_id"
              value={item.product_id}
              onChange={(e) => handleItemChange(index, e)}
              required
              disabled={!selectedDistributorId}
            >
              <option value="">Selecione um produto</option>
              {productsForSelectedDistributor.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name} (R$ {product.price.toFixed(2)})
                </option>
              ))}
            </select>
          </div>
          <div className="quantity-input">
            <label htmlFor={`quantity_${index}`}>Qtd:</label>
            <input
              type="number"
              id={`quantity_${index}`}
              name="quantity"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, e)}
              min="1"
              required
            />
          </div>
          {formData.items.length > 1 && (
            <button type="button" className="remove-button" onClick={() => handleRemoveItem(index)}>
              Remover
            </button>
          )}
        </div>
      ))}
      <Button type="button" $outline className="add-item-button" onClick={handleAddItem}>
        Adicionar Mais Produto
      </Button>

      {/* Informações da Entrega e Pagamento */}
      <div>
        <label htmlFor="shipping_company_id">Empresa de Entrega:</label>
        <select
          id="shipping_company_id"
          name="shipping_company_id"
          value={formData.shipping_company_id}
          onChange={handleInputChange}
          required
        >
          <option value="">Selecione uma empresa</option>
          {shippingCompanies.map(company => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="shipping_amount">Valor do Frete:</label>
        <input
          type="number"
          id="shipping_amount"
          name="shipping_amount"
          value={formData.shipping_amount}
          onChange={handleInputChange}
          min="0"
          step="0.01"
          required
        />
      </div>

      <div>
        <label htmlFor="eta">Data Estimada de Chegada (ETA):</label>
        <input
          type="date"
          id="eta"
          name="eta"
          value={formData.eta}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <p><strong>Valor Total dos Produtos:</strong> R$ {formData.order_amount.toFixed(2)}</p>
        <p><strong>Valor Total do Pedido (Produtos + Frete):</strong> R$ {(formData.order_amount + formData.shipping_amount).toFixed(2)}</p>
      </div>

      <div className="button-group">
        <Button type="button" $outline onClick={onClose}>Cancelar</Button>
        <Button type="submit" $primary>Criar Pedido de Estoque</Button>
      </div>
    </FormContainer>
  );
};

export default OrderForm;
