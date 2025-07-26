import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { FaEye, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { allEntities } from '../../data/adminEntities';

const TableContainer = styled.div`
  background-color: var(--color-white);
  padding: 20px;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-small);
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
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th, td {
    padding: 12px 15px;
    border-bottom: 1px solid var(--color-border);
    text-align: left;
  }

  th {
    background-color: var(--color-gray-light);
    color: var(--color-text-dark);
    font-weight: bold;
    cursor: pointer; /* Indica que a coluna pode ser clicada para ordenação */

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

const AdminProductsPage = () => {
  const [products, setProducts] = useState(allEntities.products || []);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const sortedProducts = useMemo(() => {
    let sortableItems = [...products];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [products, sortConfig]);

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

  const handleAddItem = () => {
    setModalTitle("Adicionar Novo Produto");
    setShowModal(true);
  };

  const handleEditItem = (item) => {
    setModalTitle("Editar Produto");
    setShowModal(true);
  };

  const handleDeleteItem = (id) => {
    if (window.confirm(`Tem certeza que deseja excluir o produto com ID: ${id}?`)) {
      setProducts(products.filter(product => product.id !== id));
      alert("Produto excluído com sucesso!");
    }
  };

  return (
    <TableContainer>
      <HeaderContainer>
        <Title>Gestão de Produtos</Title>
        <Button onClick={handleAddItem}>Adicionar Produto</Button>
      </HeaderContainer>

      <StyledTable>
        <thead>
          <tr>
            <th onClick={() => requestSort('id')}>ID {getSortIcon('id')}</th>
            <th onClick={() => requestSort('name')}>Nome {getSortIcon('name')}</th>
            <th onClick={() => requestSort('category')}>Categoria {getSortIcon('category')}</th>
            <th onClick={() => requestSort('price')}>Preço {getSortIcon('price')}</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>R$ {product.price ? product.price.toFixed(2) : 'N/A'}</td>
                <ActionsCell>
                  <Button onClick={() => handleEditItem(product)}>Editar</Button>
                  <Button variant="danger" onClick={() => handleDeleteItem(product.id)}>Excluir</Button>
                </ActionsCell>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Nenhum produto encontrado.</td>
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

export default AdminProductsPage;
