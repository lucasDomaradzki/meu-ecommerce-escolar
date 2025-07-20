// src/pages/admin/AdminProductsPage.jsx
import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import ProductForm from '../../components/admin/ProductForm'; // Vamos criar este componente em seguida
import { v4 as uuidv4 } from 'uuid'; // Para gerar IDs únicos
import { allEntities } from '../../data/adminEntities'; // Importa todas as entidades mockadas
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa'; // Importa ícones de ordenação

// Dados mockados de produtos
const initialMockProducts = [
  {
    id: uuidv4(),
    name: 'Caneta Esferográfica Azul',
    product_brand_id: 'BRD002', // BIC
    description: 'Caneta esferográfica de ponta fina, tinta azul.',
    theme: 'Básico',
    color: 'Azul',
    dimensions: '14x1x1cm',
    weight: 0.01,
    supplier_id: 'SUP001', // Distribuidora Alfa
    supplier_price: 0.80,
    final_price: 2.50,
    special_price: false,
    special_price_amount: null,
    product_category_id: 'CAT001', // Material Escolar
  },
  {
    id: uuidv4(),
    name: 'Caderno Universitário 10 Matérias',
    product_brand_id: 'BRD003', // Tilibra
    description: 'Caderno universitário com capa dura, 10 matérias, 200 folhas.',
    theme: 'Estudantil',
    color: 'Variado',
    dimensions: '20x27x2cm',
    weight: 0.5,
    supplier_id: 'SUP002', // Beta Suprimentos
    supplier_price: 12.00,
    final_price: 25.00,
    special_price: true,
    special_price_amount: 20.00,
    product_category_id: 'CAT001', // Material Escolar
  },
  {
    id: uuidv4(),
    name: 'Mochila Escolar Reforçada',
    product_brand_id: 'BRD004', // Maped
    description: 'Mochila resistente e espaçosa, ideal para carregar todos os materiais com conforto.',
    theme: 'Viagem',
    color: 'Preto',
    dimensions: '30x45x15cm',
    weight: 0.8,
    supplier_id: 'SUP001', // Distribuidora Alfa
    supplier_price: 80.00,
    final_price: 150.00,
    special_price: false,
    special_price_amount: null,
    product_category_id: 'CAT001', // Material Escolar
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
    th:nth-child(2), td:nth-child(2) { width: 200px; max-width: 200px; } /* Nome */
    th:nth-child(3), td:nth-child(3) { width: 120px; max-width: 120px; } /* Marca */
    th:nth-child(4), td:nth-child(4) { width: 100px; max-width: 100px; } /* Cor */
    th:nth-child(5), td:nth-child(5) { width: 100px; max-width: 100px; } /* Peso */
    th:nth-child(6), td:nth-child(6) { width: 150px; max-width: 150px; } /* Distribuidor */
    th:nth-child(7), td:nth-child(7) { width: 100px; max-width: 100px; } /* Preço Final */
    th:nth-child(8), td:nth-child(8) { width: 100px; max-width: 100px; } /* Preço Especial */
    th:nth-child(9), td:nth-child(9) { width: 150px; max-width: 150px; } /* Categoria */
    th:nth-child(10), td:nth-child(10) { width: 150px; max-width: 150px; min-width: 150px; } /* Ações */

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

const AdminProductsPage = () => {
  const [products, setProducts] = useState(initialMockProducts);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Estados para Filtragem
  const [filterName, setFilterName] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterBrand, setFilterBrand] = useState('');
  const [filterSupplier, setFilterSupplier] = useState('');

  // Estados para Ordenação
  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  // Funções auxiliares para obter nomes de entidades
  const getBrandName = (id) => allEntities.productBrand.find(b => b.id === id)?.name || 'N/A';
  const getCategoryName = (id) => allEntities.productCategory.find(c => c.id === id)?.name || 'N/A';
  const getSupplierName = (id) => allEntities.supplier.find(s => s.id === id)?.name || 'N/A';

  // Lógica de Filtragem
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesName = product.name.toLowerCase().includes(filterName.toLowerCase());
      const matchesCategory = filterCategory === '' || product.product_category_id === filterCategory;
      const matchesBrand = filterBrand === '' || product.product_brand_id === filterBrand;
      const matchesSupplier = filterSupplier === '' || product.supplier_id === filterSupplier;

      return matchesName && matchesCategory && matchesBrand && matchesSupplier;
    });
  }, [products, filterName, filterCategory, filterBrand, filterSupplier]);

  // Lógica de Ordenação
  const sortedProducts = useMemo(() => {
    const sortableProducts = [...filteredProducts];

    if (sortColumn) {
      sortableProducts.sort((a, b) => {
        let valA, valB;

        if (sortColumn === 'brand') {
          valA = getBrandName(a.product_brand_id).toLowerCase();
          valB = getBrandName(b.product_brand_id).toLowerCase();
        } else if (sortColumn === 'category') {
          valA = getCategoryName(a.product_category_id).toLowerCase();
          valB = getCategoryName(b.product_category_id).toLowerCase();
        } else if (sortColumn === 'supplier') {
          valA = getSupplierName(a.supplier_id).toLowerCase();
          valB = getSupplierName(b.supplier_id).toLowerCase();
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
    return sortableProducts;
  }, [filteredProducts, sortColumn, sortDirection, getBrandName, getCategoryName, getSupplierName]);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      setProducts(products.filter(product => product.id !== id));
      alert('Produto excluído com sucesso (simulado)!');
    }
  };

  const handleSaveProduct = (newProduct) => {
    if (editingProduct) {
      setProducts(products.map(prod => prod.id === newProduct.id ? newProduct : prod));
      alert('Produto atualizado com sucesso (simulado)!');
    } else {
      const id = uuidv4();
      setProducts([...products, { ...newProduct, id }]);
      alert('Produto cadastrado com sucesso (simulado)!');
    }
    setShowModal(false);
  };

  const handleSort = (column) => {
    if (['name', 'brand', 'supplier', 'final_price', 'category', 'weight'].includes(column)) { // Colunas ordenáveis
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
        <h1>Gestão de Produtos</h1>
        <Button $primary onClick={handleAddProduct}>Adicionar Produto</Button>
      </Header>

      <FilterSortContainer>
        <div className="filter-group">
          <label htmlFor="filterName">Filtrar por Nome:</label>
          <input
            type="text"
            id="filterName"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            placeholder="Nome do produto"
          />
        </div>
        <div className="filter-group">
          <label htmlFor="filterCategory">Filtrar por Categoria:</label>
          <select
            id="filterCategory"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">Todas</option>
            {allEntities.productCategory.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="filterBrand">Filtrar por Marca:</label>
          <select
            id="filterBrand"
            value={filterBrand}
            onChange={(e) => setFilterBrand(e.target.value)}
          >
            <option value="">Todas</option>
            {allEntities.productBrand.map(brand => (
              <option key={brand.id} value={brand.id}>{brand.name}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="filterSupplier">Filtrar por Distribuidor:</label>
          <select
            id="filterSupplier"
            value={filterSupplier}
            onChange={(e) => setFilterSupplier(e.target.value)}
          >
            <option value="">Todos</option>
            {allEntities.supplier.map(sup => (
              <option key={sup.id} value={sup.id}>{sup.name}</option>
            ))}
          </select>
        </div>
      </FilterSortContainer>

      <TableContainer>
        <table>
          <thead>
            <tr>
              <th><div>ID</div></th>
              <th onClick={() => handleSort('name')}><div>Nome {getSortIcon('name')}</div></th>
              <th onClick={() => handleSort('brand')}><div>Marca {getSortIcon('brand')}</div></th>
              <th><div>Cor</div></th>
              <th onClick={() => handleSort('weight')}><div>Peso {getSortIcon('weight')}</div></th>
              <th onClick={() => handleSort('supplier')}><div>Distribuidor {getSortIcon('supplier')}</div></th>
              <th onClick={() => handleSort('final_price')}><div>Preço Final {getSortIcon('final_price')}</div></th>
              <th><div>Preço Especial</div></th>
              <th onClick={() => handleSort('category')}><div>Categoria {getSortIcon('category')}</div></th>
              <th><div>Ações</div></th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{getBrandName(product.product_brand_id)}</td>
                <td>{product.color || 'N/A'}</td>
                <td>{product.weight} kg</td>
                <td>{getSupplierName(product.supplier_id)}</td>
                <td>R$ {product.final_price.toFixed(2).replace('.', ',')}</td>
                <td>{product.special_price ? `R$ ${product.special_price_amount?.toFixed(2).replace('.', ',')}` : 'Não'}</td>
                <td>{getCategoryName(product.product_category_id)}</td>
                <td className="actions">
                  <Button $outline $small onClick={() => handleEditProduct(product)}>Editar</Button>
                  <Button $danger $small onClick={() => handleDeleteProduct(product.id)}>Excluir</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableContainer>

      {showModal && (
        <Modal 
          title={editingProduct ? "Editar Produto" : "Adicionar Novo Produto"} 
          onClose={() => setShowModal(false)}
        >
          <ProductForm 
            product={editingProduct} 
            onSave={handleSaveProduct} 
            onClose={() => setShowModal(false)} 
          />
        </Modal>
      )}
    </PageContainer>
  );
};

export default AdminProductsPage;
