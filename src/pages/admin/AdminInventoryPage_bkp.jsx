// src/pages/admin/AdminInventoryPage.jsx
import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import InventoryForm from '../../components/admin/InventoryForm'; // Vamos criar este componente em seguida
import { v4 as uuidv4 } from 'uuid'; // Para gerar IDs únicos
import { allEntities } from '../../data/adminEntities'; // Importa todas as entidades mockadas
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa'; // Importa ícones de ordenação

// Dados mockados de inventário
const initialMockInventory = [
  {
    id: uuidv4(),
    product_id: 'PROD001', // Caneta Esferográfica Azul
    quantity_available: 100,
    quantity_reserved: 10,
    location_identifier: 'A1-01',
    status: 'AVAILABLE',
    created_at: '2024-01-15T10:00:00Z',
    last_updated_at: '2024-07-10T14:30:00Z',
  },
  {
    id: uuidv4(),
    product_id: 'PROD002', // Caderno Universitário
    quantity_available: 20,
    quantity_reserved: 5,
    location_identifier: 'B2-05',
    status: 'LOW_STOCK',
    created_at: '2024-02-20T11:00:00Z',
    last_updated_at: '2024-07-14T09:00:00Z',
  },
  {
    id: uuidv4(),
    product_id: 'PROD003', // Mochila Escolar
    quantity_available: 5,
    quantity_reserved: 5,
    location_identifier: 'C3-10',
    status: 'OUT_OF_STOCK', // Exemplo: todo o estoque disponível está reservado
    created_at: '2024-03-01T09:00:00Z',
    last_updated_at: '2024-07-15T16:00:00Z',
  },
];

const PageContainer = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;

  h1 {
    font-size: 2.2rem;
    color: var(--color-primary-dark);
  }
`;

const FilterSortContainer = styled(Card)`
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: flex-end;

  .filter-group {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 180px;
  }

  label {
    font-weight: bold;
    color: var(--color-text);
    margin-bottom: 5px;
  }

  input, select {
    padding: 8px;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    font-size: 0.9rem;
    background-color: var(--color-white);
  }

  button {
    height: 38px;
  }
`;

const TableContainer = styled(Card)`
  padding: 20px;
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    table-layout: fixed; /* Crucial para alinhar cabeçalhos e células */

    th, td {
      text-align: left;
      padding: 12px 15px;
      border-bottom: 1px solid var(--color-border);
      font-size: 0.95rem;
    }

    th {
      background-color: var(--color-background-light);
      color: var(--color-primary-dark);
      font-weight: bold;
      text-transform: uppercase;
      cursor: pointer;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      &:hover {
        background-color: var(--color-border);
      }

      & > div { /* Para alinhar texto e ícone dentro do th */
          display: flex;
          align-items: center;
          gap: 5px;
          height: 100%;
      }
    }

    td {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 150px; /* Limita a largura da célula para o ellipsis funcionar */
    }

    /* Definindo larguras para colunas específicas */
    th:nth-child(1), td:nth-child(1) { width: 80px; max-width: 80px; } /* ID */
    th:nth-child(2), td:nth-child(2) { width: 200px; max-width: 200px; } /* Produto */
    th:nth-child(3), td:nth-child(3) { width: 100px; max-width: 100px; } /* Disponível */
    th:nth-child(4), td:nth-child(4) { width: 100px; max-width: 100px; } /* Reservado */
    th:nth-child(5), td:nth-child(5) { width: 150px; max-width: 150px; } /* Localização */
    th:nth-child(6), td:nth-child(6) { width: 100px; max-width: 100px; } /* Status */
    th:nth-child(7), td:nth-child(7) { width: 150px; max-width: 150px; } /* Última Atualização */
    th:nth-child(8), td:nth-child(8) { width: 150px; max-width: 150px; min-width: 150px; } /* Ações */

    .actions {
      display: flex;
      gap: 10px;
      button {
        padding: 6px 10px;
        font-size: 0.8rem;
      }
    }
  }
`;

const AdminInventoryPage = () => {
  const [inventoryItems, setInventoryItems] = useState(initialMockInventory);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Estados para Filtragem
  const [filterProductName, setFilterProductName] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Estados para Ordenação
  const [sortColumn, setSortColumn] = useState('product'); // Coluna padrão
  const [sortDirection, setSortDirection] = useState('asc');

  // Função auxiliar para obter nome do produto
  const getProductName = (id) => allEntities.product.find(p => p.id === id)?.name || 'N/A';

  // Lógica de Filtragem
  const filteredInventory = useMemo(() => {
    return inventoryItems.filter(item => {
      const productName = getProductName(item.product_id).toLowerCase();
      const matchesProduct = productName.includes(filterProductName.toLowerCase());
      const matchesLocation = item.location_identifier.toLowerCase().includes(filterLocation.toLowerCase());
      const matchesStatus = filterStatus === '' || item.status === filterStatus;
      return matchesProduct && matchesLocation && matchesStatus;
    });
  }, [inventoryItems, filterProductName, filterLocation, filterStatus, getProductName]);

  // Lógica de Ordenação
  const sortedInventory = useMemo(() => {
    const sortableItems = [...filteredInventory];

    if (sortColumn) {
      sortableItems.sort((a, b) => {
        let valA, valB;

        if (sortColumn === 'product') {
          valA = getProductName(a.product_id).toLowerCase();
          valB = getProductName(b.product_id).toLowerCase();
        } else if (sortColumn === 'last_updated_at' || sortColumn === 'created_at') {
          valA = new Date(a[sortColumn]).getTime();
          valB = new Date(b[sortColumn]).getTime();
        } else {
          valA = String(a[sortColumn])?.toLowerCase() || '';
          valB = String(b[sortColumn])?.toLowerCase() || '';
        }
        
        if (valA < valB) {
          return sortDirection === 'asc' ? -1 : 1;
        }
        if (valA > valB) {
          return sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredInventory, sortColumn, sortDirection, getProductName]);

  const handleAddItem = () => {
    setEditingItem(null);
    setShowModal(true);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const handleDeleteItem = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este item de inventário?')) {
      setInventoryItems(inventoryItems.filter(item => item.id !== id));
      alert('Item de inventário excluído com sucesso (simulado)!');
    }
  };

  const handleSaveItem = (newItem) => {
    const now = new Date().toISOString(); // Data e hora atual
    if (editingItem) {
      setInventoryItems(inventoryItems.map(item =>
        item.id === newItem.id ? { ...newItem, last_updated_at: now } : item
      ));
      alert('Item de inventário atualizado com sucesso (simulado)!');
    } else {
      const id = uuidv4();
      setInventoryItems([...inventoryItems, { ...newItem, id, created_at: now, last_updated_at: now }]);
      alert('Item de inventário cadastrado com sucesso (simulado)!');
    }
    setShowModal(false);
  };

  const handleSort = (column) => {
    if (['product', 'quantity_available', 'quantity_reserved', 'location_identifier', 'status', 'last_updated_at'].includes(column)) {
      if (sortColumn === column) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
        setSortColumn(column);
        setSortDirection('asc');
      }
    }
  };

  const getSortIcon = (column) => {
    if (sortColumn === column) {
      return sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
  };

  return (
    <PageContainer>
      <Header>
        <h1>Gestão de Inventário</h1>
        <Button $primary onClick={handleAddItem}>Adicionar Item</Button>
      </Header>

      <FilterSortContainer>
        <div className="filter-group">
          <label htmlFor="filterProductName">Filtrar por Produto:</label>
          <input
            type="text"
            id="filterProductName"
            value={filterProductName}
            onChange={(e) => setFilterProductName(e.target.value)}
            placeholder="Nome do produto"
          />
        </div>
        <div className="filter-group">
          <label htmlFor="filterLocation">Filtrar por Localização:</label>
          <input
            type="text"
            id="filterLocation"
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
            placeholder="Identificador de localização"
          />
        </div>
        <div className="filter-group">
          <label htmlFor="filterStatus">Filtrar por Status:</label>
          <select
            id="filterStatus"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="AVAILABLE">Disponível</option>
            <option value="LOW_STOCK">Estoque Baixo</option>
            <option value="OUT_OF_STOCK">Fora de Estoque</option>
          </select>
        </div>
      </FilterSortContainer>

      <TableContainer>
        <table>
          <thead>
            <tr>
              <th><div>ID</div></th>
              <th onClick={() => handleSort('product')}><div>Produto {getSortIcon('product')}</div></th>
              <th onClick={() => handleSort('quantity_available')}><div>Disponível {getSortIcon('quantity_available')}</div></th>
              <th onClick={() => handleSort('quantity_reserved')}><div>Reservado {getSortIcon('quantity_reserved')}</div></th>
              <th onClick={() => handleSort('location_identifier')}><div>Localização {getSortIcon('location_identifier')}</div></th>
              <th onClick={() => handleSort('status')}><div>Status {getSortIcon('status')}</div></th>
              <th onClick={() => handleSort('last_updated_at')}><div>Última Atualização {getSortIcon('last_updated_at')}</div></th>
              <th><div>Ações</div></th>
            </tr>
          </thead>
          <tbody>
            {sortedInventory.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{getProductName(item.product_id)}</td>
                <td>{item.quantity_available}</td>
                <td>{item.quantity_reserved}</td>
                <td>{item.location_identifier}</td>
                <td>{item.status}</td>
                <td>{new Date(item.last_updated_at).toLocaleString('pt-BR')}</td>
                <td className="actions">
                  <Button $outline $small onClick={() => handleEditItem(item)}>Editar</Button>
                  <Button $danger $small onClick={() => handleDeleteItem(item.id)}>Excluir</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableContainer>

      {showModal && (
        <Modal 
          title={editingItem ? "Editar Item de Inventário" : "Adicionar Novo Item de Inventário"} 
          onClose={() => setShowModal(false)}
        >
          <InventoryForm 
            item={editingItem} 
            onSave={handleSaveItem} 
            onClose={() => setShowModal(false)} 
          />
        </Modal>
      )}
    </PageContainer>
  );
};

export default AdminInventoryPage;
