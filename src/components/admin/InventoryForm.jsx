// src/components/admin/InventoryForm.jsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  min-width: 350px;
  max-height: 80vh; /* Limita a altura do formulário para caber no modal */
  overflow-y: auto; /* Adiciona scroll se o conteúdo for muito grande */

  label {
    font-weight: bold;
    color: var(--color-text-dark);
  }

  input[type="text"],
  input[type="number"],
  select {
    padding: 10px;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    font-size: 1rem;
    width: 100%;
    box-sizing: border-box;
    background-color: var(--color-white);
  }

  .product-search-container {
    position: relative;
    width: 100%;
  }

  .product-suggestions {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: var(--color-white);
    border: 1px solid var(--color-border);
    border-top: none;
    border-radius: 0 0 var(--border-radius) var(--border-radius);
    z-index: 100;
    max-height: 150px;
    overflow-y: auto;
    box-shadow: var(--shadow-small);
  }

  .product-suggestions div {
    padding: 10px;
    cursor: pointer;
    &:hover {
      background-color: var(--color-background);
    }
  }

  .button-group {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
  }
`;

const generateUniqueId = () => `INV-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;

const InventoryForm = ({ item, products, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    id: item ? item.id : generateUniqueId(),
    productId: '',
    location: '',
    quantityAvailable: 0,
    quantityReserved: 0,
    status: 'AVAILABLE',
    lastUpdate: new Date().toLocaleString(),
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // UseEffect para inicializar o formulário quando o 'item' prop muda (para edição)
  useEffect(() => {
    if (item) {
      setFormData({
        id: item.id || generateUniqueId(),
        productId: item.productId || '',
        location: item.location || '',
        quantityAvailable: item.quantityAvailable || 0,
        quantityReserved: item.quantityReserved || 0,
        status: item.status || 'AVAILABLE',
        lastUpdate: item.lastUpdate || new Date().toLocaleString(),
      });
      // Ao editar, preenche o campo de busca com o nome do produto
      const productName = products.find(p => p.id === item.productId)?.name || '';
      setSearchTerm(productName);
    } else {
      // Resetar para um novo item
      setFormData({
        id: generateUniqueId(),
        productId: '',
        location: '',
        quantityAvailable: 0,
        quantityReserved: 0,
        status: 'AVAILABLE',
        lastUpdate: new Date().toLocaleString(),
      });
      setSearchTerm('');
    }
  }, [item, products]);

  // Efeito para ajustar o status com base na quantidade disponível
  useEffect(() => {
    let newStatus = 'AVAILABLE';
    if (formData.quantityAvailable === 0) {
      newStatus = 'OUT_OF_STOCK';
    } else if (formData.quantityAvailable > 0 && formData.quantityAvailable <= 10) { // Exemplo: estoque baixo se <= 10
      newStatus = 'LOW_STOCK';
    }
    if (formData.status !== newStatus) {
      setFormData(prevData => ({ ...prevData, status: newStatus }));
    }
  }, [formData.quantityAvailable, formData.status]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: name.includes('quantity') ? parseInt(value, 10) || 0 : value,
    }));
  }, []);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(true);
    // Limpa o productId se o texto de busca não corresponder a um produto selecionado
    setFormData(prevData => ({ ...prevData, productId: '' }));
  }, []);

  const handleSelectProduct = useCallback((product) => {
    setFormData(prevData => ({ ...prevData, productId: product.id }));
    setSearchTerm(product.name);
    setShowSuggestions(false);
  }, []);

  const filteredProducts = useMemo(() => {
    if (!searchTerm || !Array.isArray(products)) return [];
    return products.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, products]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!formData.productId) {
      alert('Por favor, selecione um produto.');
      return;
    }
    if (!formData.location) {
      alert('Por favor, insira uma localização.');
      return;
    }
    onSave({ ...formData, lastUpdate: new Date().toLocaleString() });
  }, [formData, onSave]);

  return (
    <FormContainer onSubmit={handleSubmit}>
      <label htmlFor="productSearch">Pesquisar e Selecionar Produto:</label>
      <div className="product-search-container">
        <input
          type="text"
          id="productSearch"
          placeholder="Digite para buscar um produto..."
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 100)} // Pequeno delay para permitir clique nas sugestões
          required
        />
        {showSuggestions && filteredProducts.length > 0 && (
          <div className="product-suggestions">
            {filteredProducts.map(product => (
              <div key={product.id} onMouseDown={() => handleSelectProduct(product)}> {/* Usar onMouseDown para capturar o clique antes do onBlur */}
                {product.name}
              </div>
            ))}
          </div>
        )}
        {showSuggestions && searchTerm && filteredProducts.length === 0 && (
          <div className="product-suggestions">
            <div>Nenhum produto encontrado.</div>
          </div>
        )}
      </div>

      {formData.productId && (
        <p style={{ marginTop: '10px', color: 'var(--color-primary-dark)' }}>
          Produto Selecionado: <strong>{products.find(p => p.id === formData.productId)?.name || 'N/A'}</strong>
        </p>
      )}


      <label htmlFor="quantityAvailable">Quantidade Disponível:</label>
      <input
        type="number"
        id="quantityAvailable"
        name="quantityAvailable"
        value={formData.quantityAvailable}
        onChange={handleChange}
        min="0"
        required
      />

      <label htmlFor="quantityReserved">Quantidade Reservada:</label>
      <input
        type="number"
        id="quantityReserved"
        name="quantityReserved"
        value={formData.quantityReserved}
        onChange={handleChange}
        min="0"
        required
      />

      <label htmlFor="location">Identificador de Localização:</label>
      <input
        type="text"
        id="location"
        name="location"
        value={formData.location}
        onChange={handleChange}
        required
      />

      <label htmlFor="status">Status:</label>
      <select
        id="status"
        name="status"
        value={formData.status}
        onChange={handleChange}
        required
        disabled // O status é controlado automaticamente pelo useEffect
      >
        <option value="AVAILABLE">Disponível</option>
        <option value="LOW_STOCK">Baixo Estoque</option>
        <option value="OUT_OF_STOCK">Sem Estoque</option>
      </select>

      <div className="button-group">
        <Button $outline type="button" onClick={onClose}>Cancelar</Button>
        <Button $primary type="submit">Salvar Item</Button>
      </div>
    </FormContainer>
  );
};

export default InventoryForm;
