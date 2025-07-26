import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { FaSort, FaSortUp, FaSortDown, FaEdit, FaTrash } from 'react-icons/fa';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { allEntities } from '../../data/adminEntities';
import InventoryForm from '../../components/admin/InventoryForm';

const TableContainer = styled.div`
  background-color: var(--color-white);
  padding: 20px;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-small);
  flex-grow: 1;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  color: var(--color-text-dark);
  font-size: 1.8em;
  margin: 0;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th, td {
    padding: 12px 15px;
    border-bottom: 1px solid var(--color-border);
    text-align: left;
    white-space: nowrap;
  }

  th {
    background-color: var(--color-gray-light);
    color: var(--color-text-dark);
    font-weight: bold;
    cursor: pointer;
    svg {
      margin-left: 5px;
    }
  }

  tr:hover {
    background-color: var(--color-background);
  }
`;

const ActionsCell = styled.td`
  display: flex;
  gap: 10px;
  button {
    padding: 8px 12px;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 20px;
  margin-bottom: 20px;
  padding: 15px;
  background-color: var(--color-background);
  border-radius: var(--border-radius);
  align-items: flex-end;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  label {
    font-weight: bold;
    color: var(--color-text-dark);
    font-size: 0.9em;
  }
  input, select {
    padding: 8px;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    font-size: 0.9em;
  }
`;

const AdminInventoryPage = () => {
  const [inventoryItems, setInventoryItems] = useState(allEntities.inventory || []);
  const products = useMemo(() => allEntities.products || [], []);

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const [filterProduct, setFilterProduct] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterStatus, setFilterStatus] = useState('Todos');

  const getProductName = (productId) => {
    const product = Array.isArray(products) ? products.find(p => p.id === productId) : undefined;
    return product ? product.name : 'Produto Desconhecido';
  };

  const filteredAndSortedItems = useMemo(() => {
    let items = [...inventoryItems];

    if (filterProduct) {
      const lowercasedFilter = filterProduct.toLowerCase();
      items = items.filter(item =>
        getProductName(item.productId).toLowerCase().includes(lowercasedFilter)
      );
    }

    if (filterLocation) {
      const lowercasedFilter = filterLocation.toLowerCase();
      items = items.filter(item =>
        (item.location || '').toLowerCase().includes(lowercasedFilter)
      );
    }

    if (filterStatus !== 'Todos') {
      items = items.filter(item => item.status === filterStatus);
    }

    if (sortConfig.key !== null) {
      items.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === 'productName') {
            aValue = getProductName(a.productId);
            bValue = getProductName(b.productId);
        }

        aValue = aValue === undefined || aValue === null ? '' : aValue;
        bValue = bValue === undefined || bValue === null ? '' : bValue;

        if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
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
    return items;
  }, [inventoryItems, products, filterProduct, filterLocation, filterStatus, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort />;
    if (sortConfig.direction === 'ascending') return <FaSortUp />;
    return <FaSortDown />;
  };

  const handleSaveItem = (newOrUpdatedItem) => {
    if (newOrUpdatedItem.id && inventoryItems.some(item => item.id === newOrUpdatedItem.id)) {
      setInventoryItems(prevItems =>
        prevItems.map(item => (item.id === newOrUpdatedItem.id ? newOrUpdatedItem : item))
      );
    } else {
      setInventoryItems(prevItems => [...prevItems, newOrUpdatedItem]);
    }
    setShowModal(false);
  };

  const handleAddItem = () => {
    setModalTitle("Adicionar Novo Item de Inventário");
    setModalContent(
      <InventoryForm
        products={products}
        onSave={handleSaveItem}
        onClose={() => setShowModal(false)}
      />
    );
    setShowModal(true);
  };

  const handleEditItem = (itemToEdit) => {
    setModalTitle("Editar Item de Inventário");
    setModalContent(
      <InventoryForm
        item={itemToEdit}
        products={products}
        onSave={handleSaveItem}
        onClose={() => setShowModal(false)}
      />
    );
    setShowModal(true);
  };

  const handleDeleteItem = (id) => {
    if (window.confirm(`Tem certeza que deseja excluir o item de inventário com ID: ${id}?`)) {
      setInventoryItems(inventoryItems.filter(item => item.id !== id));
      alert("Item de inventário excluído com sucesso!");
    }
  };

  return (
    <TableContainer>
      <HeaderContainer>
        <Title>Gestão de Inventário</Title>
        <Button onClick={handleAddItem}>Adicionar Item</Button>
      </HeaderContainer>

      <FilterContainer>
        <FilterGroup>
          <label htmlFor="filterProduct">Filtrar por Produto:</label>
          <input
            type="text"
            id="filterProduct"
            placeholder="Nome do produto"
            value={filterProduct}
            onChange={(e) => setFilterProduct(e.target.value)}
          />
        </FilterGroup>
        <FilterGroup>
          <label htmlFor="filterLocation">Filtrar por Localização:</label>
          <input
            type="text"
            id="filterLocation"
            placeholder="Identificador de localização"
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
          />
        </FilterGroup>
        <FilterGroup>
          <label htmlFor="filterStatus">Filtrar por Status:</label>
          <select
            id="filterStatus"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="Todos">Todos</option>
            <option value="AVAILABLE">Disponível</option>
            <option value="LOW_STOCK">Baixo Estoque</option>
            <option value="OUT_OF_STOCK">Sem Estoque</option>
          </select>
        </FilterGroup>
      </FilterContainer>

      <StyledTable>
        <thead>
          <tr>
            <th onClick={() => requestSort('id')}>ID {getSortIcon('id')}</th>
            <th onClick={() => requestSort('productName')}>Produto {getSortIcon('productName')}</th>
            <th onClick={() => requestSort('location')}>Localização {getSortIcon('location')}</th>
            <th onClick={() => requestSort('quantityAvailable')}>Qtd. Disponível {getSortIcon('quantityAvailable')}</th>
            <th onClick={() => requestSort('quantityReserved')}>Qtd. Reservada {getSortIcon('quantityReserved')}</th>
            <th onClick={() => requestSort('status')}>Status {getSortIcon('status')}</th>
            <th onClick={() => requestSort('lastUpdate')}>Última Atualização {getSortIcon('lastUpdate')}</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedItems.length > 0 ? (
            filteredAndSortedItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{getProductName(item.productId)}</td>
                <td>{item.location}</td>
                <td>{item.quantityAvailable}</td>
                <td>{item.quantityReserved}</td>
                <td>{item.status}</td>
                <td>{item.lastUpdate}</td>
                <ActionsCell>
                  <Button onClick={() => handleEditItem(item)}><FaEdit /></Button>
                  <Button variant="danger" onClick={() => handleDeleteItem(item.id)}><FaTrash /></Button>
                </ActionsCell>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">Nenhum item de inventário encontrado.</td>
            </tr>
          )}
        </tbody>
      </StyledTable>

      {showModal && (
        <Modal title={modalTitle} onClose={() => setShowModal(false)}>
          {modalContent}
        </Modal>
      )}
    </TableContainer>
  );
};

export default AdminInventoryPage;
