import React, { useState, useEffect, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import { allEntities } from '../../data/adminEntities';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  min-width: 400px;
  max-height: 80vh; /* Limita a altura do formulário para caber no modal */
  overflow-y: auto; /* Adiciona scroll se o conteúdo for muito grande */

  label {
    font-weight: bold;
    color: var(--color-text-dark);
  }

  input[type="text"],
  input[type="number"],
  select,
  input[type="date"] { /* Adicionado input[type="date"] */
    padding: 10px;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    font-size: 1rem;
    width: 100%;
    box-sizing: border-box;
    background-color: var(--color-white);
  }

  .item-list {
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    padding: 10px;
    background-color: var(--color-background);
  }

  .item-row {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 10px;
    padding-bottom: 5px;
    border-bottom: 1px dashed var(--color-border);
    &:last-child {
      border-bottom: none;
      margin-bottom: 0;
    }
    button {
        padding: 5px 8px;
        font-size: 0.8em;
    }
  }

  .button-group {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
  }
`;

const generateOrderId = () => `ORD-${Date.now()}`;

const OrderForm = ({ order, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    id: order ? order.id : generateOrderId(),
    distributorId: '',
    contactPersonId: '',
    deliveryAddress: '',
    shippingCompanyId: '',
    status: 'PENDING',
    orderDate: new Date().toISOString().split('T')[0],
    deliveryDate: '',
    items: [],
    trackingCode: '',
    total: 0,
    distributorName: '',
    contactPersonName: '',
    shippingCompanyName: '',
  });

  const availableDistributors = useMemo(() => allEntities.suppliers || [], []);
  const availableShippingCompanies = useMemo(() => allEntities.shippingCompanies || [], []);
  const availableProducts = useMemo(() => allEntities.products || [], []);
  const allContacts = useMemo(() => allEntities.contacts || [], []);

  const [filteredContacts, setFilteredContacts] = useState([]);


  useEffect(() => {
    if (order) {
      setFormData({
        id: order.id || generateOrderId(),
        distributorId: order.distributorId || '',
        contactPersonId: order.contactPersonId || '',
        deliveryAddress: order.deliveryAddress || '',
        shippingCompanyId: order.shippingCompanyId || '',
        status: order.status || 'PENDING',
        orderDate: order.orderDate || new Date().toISOString().split('T')[0],
        deliveryDate: order.deliveryDate || '',
        items: order.items || [],
        trackingCode: order.trackingCode || '',
        total: order.total || 0,
        distributorName: order.distributorName || '',
        contactPersonName: order.contactPersonName || '',
        shippingCompanyName: order.shippingCompanyName || '',
      });
    } else {
      setFormData({
        id: generateOrderId(),
        distributorId: '',
        contactPersonId: '',
        deliveryAddress: '',
        shippingCompanyId: '',
        status: 'PENDING',
        orderDate: new Date().toISOString().split('T')[0],
        deliveryDate: '',
        items: [],
        trackingCode: '',
        total: 0,
        distributorName: '',
        contactPersonName: '',
        shippingCompanyName: '',
      });
    }
  }, [order]);

  useEffect(() => {
    if (formData.distributorId) {
      const distributorRelatedContacts = allContacts.filter(
        c => c.entityType === 'supplier' && c.entityId === formData.distributorId
      );
      setFilteredContacts(distributorRelatedContacts);

      const distributor = availableDistributors.find(d => d.id === formData.distributorId);
      setFormData(prev => ({
        ...prev,
        distributorName: distributor ? distributor.name : '',
        contactPersonId: distributorRelatedContacts.some(c => c.id === prev.contactPersonId) ? prev.contactPersonId : '',
        contactPersonName: ''
      }));
    } else {
      setFilteredContacts([]);
      setFormData(prev => ({
        ...prev,
        distributorName: '',
        contactPersonId: '',
        contactPersonName: ''
      }));
    }
  }, [formData.distributorId, availableDistributors, allContacts]);

  useEffect(() => {
    const selectedContact = filteredContacts.find(c => c.id === formData.contactPersonId);
    setFormData(prev => ({ ...prev, contactPersonName: selectedContact ? selectedContact.name : '' }));

    const selectedCompany = availableShippingCompanies.find(s => s.id === formData.shippingCompanyId);
    setFormData(prev => ({ ...prev, shippingCompanyName: selectedCompany ? selectedCompany.name : '' }));

  }, [formData.contactPersonId, formData.shippingCompanyId, filteredContacts, availableShippingCompanies]);


  useEffect(() => {
    const newTotal = formData.items.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 0);
    setFormData(prev => ({ ...prev, total: newTotal }));
  }, [formData.items]);


  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleItemChange = useCallback((index, e) => {
    const { name, value } = e.target;
    const list = [...formData.items];
    
    list[index] = { ...list[index], [name]: name === 'quantity' ? parseInt(value, 10) || 0 : value };

    if (name === 'productId') {
      const selectedProduct = availableProducts.find(p => p.id === value);
      if (selectedProduct) {
        list[index].price = selectedProduct.price;
        list[index].productName = selectedProduct.name;
      } else {
        list[index].price = 0;
        list[index].productName = '';
      }
    }
    setFormData(prev => ({ ...prev, items: list }));
  }, [formData.items, availableProducts]);

  const handleAddItem = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { productId: '', quantity: 1, price: 0, productName: '' }]
    }));
  }, []);

  const handleRemoveItem = useCallback((index) => {
    const list = [...formData.items];
    list.splice(index, 1);
    setFormData(prev => ({ ...prev, items: list }));
  }, [formData.items]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!formData.distributorId || !formData.contactPersonId || formData.items.length === 0) {
      alert('Por favor, preencha todos os campos obrigatórios e adicione pelo menos um produto.');
      return;
    }
    onSave(formData);
  }, [formData, onSave]);

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h3>Dados do Pedido</h3>
      <label htmlFor="distributorId">Distribuídor:</label>
      <select
        id="distributorId"
        name="distributorId"
        value={formData.distributorId}
        onChange={handleChange}
        required
      >
        <option value="">Selecione um distribuidor</option>
        {availableDistributors.map(dist => (
          <option key={dist.id} value={dist.id}>{dist.name}</option>
        ))}
      </select>

      <label htmlFor="contactPersonId">Contato do Distribuidor:</label>
      <select
        id="contactPersonId"
        name="contactPersonId"
        value={formData.contactPersonId}
        onChange={handleChange}
        required
        disabled={!formData.distributorId || filteredContacts.length === 0}
      >
        <option value="">Selecione um contato</option>
        {filteredContacts.map(contact => (
          <option key={contact.id} value={contact.id}>{contact.name}</option>
        ))}
      </select>

      <label htmlFor="deliveryAddress">Endereço de Entrega:</label>
      <input
        type="text"
        id="deliveryAddress"
        name="deliveryAddress"
        value={formData.deliveryAddress}
        onChange={handleChange}
        required
      />

      <label htmlFor="shippingCompanyId">Empresa de Entrega:</label>
      <select
        id="shippingCompanyId"
        name="shippingCompanyId"
        value={formData.shippingCompanyId}
        onChange={handleChange}
      >
        <option value="">Selecione uma empresa</option>
        {availableShippingCompanies.map(company => (
          <option key={company.id} value={company.id}>{company.name}</option>
        ))}
      </select>

      <label htmlFor="status">Status:</label>
      <select
        id="status"
        name="status"
        value={formData.status}
        onChange={handleChange}
        required
      >
        <option value="PENDING">Pendente</option>
        <option value="PROCESSING">Processando</option>
        <option value="SHIPPED">Enviado</option>
        <option value="DELIVERED">Entregue</option>
        <option value="CANCELLED">Cancelado</option>
      </select>

      <label htmlFor="orderDate">Data do Pedido:</label>
      <input
        type="date"
        id="orderDate"
        name="orderDate"
        value={formData.orderDate}
        onChange={handleChange}
        required
      />

      <label htmlFor="deliveryDate">Data de Entrega Estimada:</label>
      <input
        type="date"
        id="deliveryDate"
        name="deliveryDate"
        value={formData.deliveryDate}
        onChange={handleChange}
      />

      <label htmlFor="trackingCode">Código de Rastreamento:</label>
      <input
        type="text"
        id="trackingCode"
        name="trackingCode"
        value={formData.trackingCode}
        onChange={handleChange}
      />

      <h3>Produtos do Pedido</h3>
      <Button type="button" onClick={handleAddItem} $outline>Adicionar Produto</Button>
      <div className="item-list">
        {formData.items.length === 0 && <p>Nenhum produto adicionado.</p>}
        {formData.items.map((item, index) => (
          <div key={index} className="item-row">
            <select
              name="productId"
              value={item.productId}
              onChange={(e) => handleItemChange(index, e)}
              required
            >
              <option value="">Selecione um Produto</option>
              {availableProducts.map(product => (
                <option key={product.id} value={product.id}>{product.name} (R$ {product.price.toFixed(2)})</option>
              ))}
            </select>
            <input
              type="number"
              name="quantity"
              placeholder="Qtd"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, e)}
              min="1"
              required
            />
            <Button type="button" variant="danger" onClick={() => handleRemoveItem(index)}>Remover</Button>
          </div>
        ))}
      </div>

      <p style={{ marginTop: '20px', fontSize: '1.2em', fontWeight: 'bold' }}>
        Total do Pedido: R$ {formData.total.toFixed(2)}
      </p>

      <div className="button-group">
        <Button type="button" $outline onClick={onClose}>Cancelar</Button>
        <Button type="submit" $primary>Salvar Pedido</Button>
      </div>
    </FormContainer>
  );
};

export default OrderForm;
