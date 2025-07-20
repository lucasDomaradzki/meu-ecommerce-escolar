// src/pages/admin/AdminProductsPage.jsx
import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { FaEye, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal'; // Se você usa um modal para adicionar/editar produtos
import { allEntities } from '../../data/adminEntities'; // <--- Garanta que esta importação existe e está correta

// Você precisará de componentes ProductForm e ProductDetails,
// mas vamos focar no erro do 'map' primeiro.
// import ProductForm from '../../components/admin/ProductForm';
// import ProductDetails from '../../components/admin/ProductDetails';

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
  // Use um estado para armazenar os produtos. Inicialize com os dados mockados de allEntities.
  // Certifique-se de que `allEntities.products` existe e é um array.
  const [products, setProducts] = useState(allEntities.products || []); // <--- Garanta que 'products' é um array
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  // Função de ordenação (similar à que usamos para Pedidos)
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
    // Você precisará de um ProductForm aqui
    // setModalContent(<ProductForm onSubmitSuccess={() => { /* recarregar produtos */ setShowModal(false); }} />);
    setShowModal(true);
  };

  const handleEditItem = (item) => {
    setModalTitle("Editar Produto");
    // Você precisará de um ProductForm aqui, passando o item para edição
    // setModalContent(<ProductForm product={item} onSubmitSuccess={() => { /* recarregar produtos */ setShowModal(false); }} />);
    setShowModal(true);
  };

  const handleDeleteItem = (id) => {
    if (window.confirm(`Tem certeza que deseja excluir o produto com ID: ${id}?`)) {
      // Lógica para deletar produto (ex: filtrar o array, chamar API)
      setProducts(products.filter(product => product.id !== id));
      alert("Produto excluído com sucesso!");
    }
  };

  // Se você tiver uma função para visualizar detalhes, seria algo como:
  // const handleViewDetails = (item) => {
  //   setModalTitle("Detalhes do Produto");
  //   setModalContent(<ProductDetails product={item} />);
  //   setShowModal(true);
  // };

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
          {/* AQUI É ONDE O ERRO 'map' PROVAVELMENTE OCORRE */}
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>R$ {product.price ? product.price.toFixed(2) : 'N/A'}</td>
                <ActionsCell>
                  {/* <Button variant="secondary" onClick={() => handleViewDetails(product)}>
                    <FaEye />
                  </Button> */}
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
