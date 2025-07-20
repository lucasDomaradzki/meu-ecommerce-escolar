// src/pages/admin/AdminOrdersPage.jsx
import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { FaEye, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import Button from '../../components/common/Button';
import { allEntities } from '../../data/adminEntities';
import Modal from '../../components/common/Modal';
import OrderDetails from './OrderDetails';
import OrderForm from './OrderForm'; // Importa o novo formulário

const PageContainer = styled.div`
  padding: 20px;
  background-color: var(--color-background-light);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-small);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    color: var(--color-text-dark);
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
  padding: 15px;
  background-color: var(--color-white);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-small);

  div {
    display: flex;
    flex-direction: column;
    min-width: 180px;
  }

  label {
    font-weight: bold;
    margin-bottom: 5px;
    color: var(--color-text);
    font-size: 0.9em;
  }

  input[type="text"],
  select {
    padding: 8px;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    font-size: 0.9rem;
    background-color: var(--color-white);
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: var(--color-white);
  border-radius: var(--border-radius);
  overflow: hidden;

  th, td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid var(--color-border);
  }

  th {
    background-color: var(--color-primary-light);
    color: var(--color-white);
    font-weight: bold;
    text-transform: uppercase;
    font-size: 0.85em;
    cursor: pointer;
    position: relative; /* Para posicionar o ícone de ordenação */

    &:hover {
      background-color: var(--color-primary);
    }
  }

  td {
    color: var(--color-text);
    font-size: 0.9em;

    &.status-PROCESSANDO { color: var(--color-warning); font-weight: bold; }
    &.status-ENVIADO { color: var(--color-info); font-weight: bold; }
    &.status-ENTREGUE { color: var(--color-success); font-weight: bold; }
    &.status-CANCELADO { color: var(--color-danger); font-weight: bold; }
  }

  tr:hover {
    background-color: var(--color-background-light);
  }
`;

const SortIcon = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.7em;
`;

const ActionsCell = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled(Button)`
  padding: 6px 10px;
  font-size: 0.8em;
  display: flex;
  align-items: center;
  gap: 5px;

  svg {
    font-size: 1em;
  }
`;

const AdminOrdersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // Novo state para o modal de criação

  const [filters, setFilters] = useState({
    orderId: '',
    orderType: '',
    userName: '',
    shippingCompany: '',
    status: '',
  });

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  // Dados mockados
  const allOrders = useMemo(() => allEntities.order || [], []);
  const orderTypes = useMemo(() => allEntities.order_type || [], []);
  const users = useMemo(() => allEntities.user || [], []);
  const distributors = useMemo(() => allEntities.distributor || [], []);
  const shippingCompanies = useMemo(() => allEntities.shipping_company || [], []);
  const contacts = useMemo(() => allEntities.contact || [], []);
  const addresses = useMemo(() => allEntities.address || [], []);

  // Mapeia IDs para nomes para exibição na tabela
  const getOrderTypeName = (id) => orderTypes.find(type => type.id === id)?.name || 'Desconhecido';
  const getUserOrDistributorName = (order) => {
    if (order.order_type_id === orderTypes.find(t => t.name === 'CLIENTE')?.id) {
      return users.find(u => u.id === order.user_id)?.name || 'N/A';
    } else if (order.order_type_id === orderTypes.find(t => t.name === 'DISTRIBUIDOR')?.id) {
      const contact = contacts.find(c => c.id === order.contact_id);
      return contact ? distributors.find(d => d.id === contact.entity_id)?.name || 'N/A' : 'N/A';
    }
    return 'N/A';
  };
  const getShippingCompanyName = (id) => shippingCompanies.find(company => company.id === id)?.name || 'Desconhecido';


  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <FaSort />;
    }
    return sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />;
  };

  const filteredAndSortedOrders = useMemo(() => {
    let sortableItems = [...allOrders];

    // Aplicar filtros
    sortableItems = sortableItems.filter(order => {
      const orderTypeName = getOrderTypeName(order.order_type_id).toLowerCase();
      const userOrDistName = getUserOrDistributorName(order).toLowerCase();
      const shippingCompName = getShippingCompanyName(order.shipping_company_id).toLowerCase();

      return (
        (filters.orderId === '' || order.id.toLowerCase().includes(filters.orderId.toLowerCase())) &&
        (filters.orderType === '' || orderTypeName === filters.orderType.toLowerCase()) &&
        (filters.userName === '' || userOrDistName.includes(filters.userName.toLowerCase())) &&
        (filters.shippingCompany === '' || shippingCompName.includes(filters.shippingCompany.toLowerCase())) &&
        (filters.status === '' || order.status.toLowerCase() === filters.status.toLowerCase())
      );
    });

    // Aplicar ordenação
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        let aValue, bValue;
        switch (sortConfig.key) {
          case 'id':
            aValue = a.id;
            bValue = b.id;
            break;
          case 'user':
            aValue = getUserOrDistributorName(a);
            bValue = getUserOrDistributorName(b);
            break;
          case 'order_date':
            aValue = new Date(a.created_at || a.order_date).getTime(); // Usa created_at se order_date não for detalhado
            bValue = new Date(b.created_at || b.order_date).getTime();
            break;
          case 'total_amount':
            aValue = a.order_amount + a.shipping_amount;
            bValue = b.order_amount + b.shipping_amount;
            break;
          case 'status':
            aValue = a.status;
            bValue = b.status;
            break;
          case 'type':
            aValue = getOrderTypeName(a.order_type_id);
            bValue = getOrderTypeName(b.order_type_id);
            break;
          case 'shipping_company':
            aValue = getShippingCompanyName(a.shipping_company_id);
            bValue = getShippingCompanyName(b.shipping_company_id);
            break;
          default:
            break;
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return sortableItems;
  }, [allOrders, filters, sortConfig, orderTypes, users, distributors, shippingCompanies, contacts]);

  const handleViewDetails = (order) => {
    // Para garantir que o order.user_name seja preenchido para exibição no modal,
    // embora ele não esteja diretamente na modelagem da tabela, é útil para o mock.
    // Em um cenário real, você buscaria o nome do user/distribuidor.
    const orderTypeName = getOrderTypeName(order.order_type_id);
    const userOrDistName = getUserOrDistributorName(order);
    const shippingCompanyName = getShippingCompanyName(order.shipping_company_id);
    
    setSelectedOrder({
      ...order,
      order_type_name: orderTypeName,
      user_or_dist_name: userOrDistName,
      shipping_company_name: shippingCompanyName,
      address_details: addresses.find(addr => addr.id === order.address_id),
      contact_details: contacts.find(contact => contact.id === order.contact_id),
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleSaveNewOrder = (newOrder) => {
    // Lógica para adicionar o novo pedido ao mock (em um app real, seria uma chamada à API)
    // Para simplificar, adicionamos diretamente ao mock allEntities.order
    allEntities.order.push(newOrder);
    alert('Pedido de estoque criado com sucesso!');
    handleCloseCreateModal();
    // Você pode querer forçar uma re-renderização se estiver usando um estado global,
    // mas para este mock simples, o useMemo já recalculará.
  };

  return (
    <PageContainer>
      <Header>
        <h2>Gestão de Pedidos</h2>
        <Button $primary onClick={handleOpenCreateModal}>
          Criar Pedido de Estoque
        </Button>
      </Header>

      <FiltersContainer>
        <div>
          <label htmlFor="orderId">ID do Pedido:</label>
          <input
            type="text"
            id="orderId"
            name="orderId"
            value={filters.orderId}
            onChange={handleFilterChange}
            placeholder="Buscar por ID"
          />
        </div>
        <div>
          <label htmlFor="orderType">Tipo de Pedido:</label>
          <select
            id="orderType"
            name="orderType"
            value={filters.orderType}
            onChange={handleFilterChange}
          >
            <option value="">Todos</option>
            {orderTypes.map(type => (
              <option key={type.id} value={type.name}>{type.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="userName">Usuário/Distribuidor:</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={filters.userName}
            onChange={handleFilterChange}
            placeholder="Buscar por nome"
          />
        </div>
        <div>
          <label htmlFor="shippingCompany">Empresa de Entrega:</label>
          <input
            type="text"
            id="shippingCompany"
            name="shippingCompany"
            value={filters.shippingCompany}
            onChange={handleFilterChange}
            placeholder="Buscar por empresa"
          />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="">Todos</option>
            <option value="PROCESSANDO">Processando</option>
            <option value="ENVIADO">Enviado</option>
            <option value="ENTREGUE">Entregue</option>
            <option value="CANCELADO">Cancelado</option>
          </select>
        </div>
      </FiltersContainer>

      <Table>
        <thead>
          <tr>
            <th onClick={() => requestSort('id')}>ID do Pedido {getSortIcon('id')}</th>
            <th onClick={() => requestSort('type')}>Tipo {getSortIcon('type')}</th>
            <th onClick={() => requestSort('user')}>Usuário/Distribuidor {getSortIcon('user')}</th>
            <th onClick={() => requestSort('order_date')}>Data do Pedido {getSortIcon('order_date')}</th>
            <th onClick={() => requestSort('total_amount')}>Valor Total {getSortIcon('total_amount')}</th>
            <th onClick={() => requestSort('shipping_company')}>Empresa Entrega {getSortIcon('shipping_company')}</th>
            <th onClick={() => requestSort('status')}>Status {getSortIcon('status')}</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedOrders.length > 0 ? (
            filteredAndSortedOrders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{getOrderTypeName(order.order_type_id)}</td>
                <td>{getUserOrDistributorName(order)}</td>
                <td>{new Date(order.created_at || order.order_date).toLocaleDateString('pt-BR')}</td>
                <td>R$ {(order.order_amount + order.shipping_amount).toFixed(2)}</td>
                <td>{getShippingCompanyName(order.shipping_company_id)}</td>
                <td className={`status-${order.status.replace(/\s/g, '_').toUpperCase()}`}>
                  {order.status}
                </td>
                <td>
                  <ActionsCell>
                    <ActionButton $primary onClick={() => handleViewDetails(order)}>
                      <FaEye /> Ver Detalhes
                    </ActionButton>
                  </ActionsCell>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>
                Nenhum pedido encontrado com os filtros aplicados.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={`Detalhes do Pedido: ${selectedOrder?.id}`}
      >
        {selectedOrder && <OrderDetails order={selectedOrder} />}
      </Modal>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        title="Criar Novo Pedido de Estoque"
      >
        <OrderForm onSave={handleSaveNewOrder} onClose={handleCloseCreateModal} />
      </Modal>
    </PageContainer>
  );
};

export default AdminOrdersPage;
