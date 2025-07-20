// src/components/admin/InventoryForm.jsx
import React, { useState, useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import { allEntities } from '../../data/adminEntities'; // Importa todas as entidades para as seleções

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  max-height: 70vh; /* Limita a altura do formulário para rolagem se for muito longo */
  overflow-y: auto; /* Adiciona rolagem vertical se o conteúdo exceder a altura */

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
  select {
    padding: 10px;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    font-size: 1rem;
    background-color: var(--color-white);
  }

  .button-group {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
    position: sticky; /* Mantém os botões visíveis ao rolar */
    bottom: 0;
    background-color: var(--color-background); /* Garante que os botões não fiquem transparentes */
    padding-top: 10px;
    border-top: 1px solid var(--color-border);
  }

  .product-select-wrapper {
    position: relative; /* Contêiner para posicionamento absoluto da lista */
    /* Z-index no wrapper não é estritamente necessário se o dropdown tiver um Z-index alto */
    /* z-index: 1002; */
  }

  .product-search-input {
    width: 100%;
  }

  .product-options-dropdown {
    position: absolute; /* Permite que a lista "flutue" */
    top: calc(100% + 5px); /* Inicia logo abaixo do input com um pequeno espaçamento */
    left: 0;
    right: 0;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    background-color: var(--color-white); /* Fundo sólido DEFINITIVO para cobrir o que está por baixo */
    max-height: 150px; /* Limite de altura para a rolagem */
    overflow-y: auto;
    z-index: 1001; /* Z-index ALTO para garantir sobreposição total */
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }

  .product-options-dropdown div {
    padding: 10px; /* Aumenta o padding para dar mais espaço ao texto */
    cursor: pointer;
    background-color: var(--color-white); /* Garante que cada item tenha fundo branco */
    &:hover {
      background-color: var(--color-background-light);
    }
    &.selected {
      background-color: var(--color-primary); /* Destaque para o item selecionado */
      color: var(--color-white);
    }
  }

  .selected-product-info {
    margin-top: 5px;
    font-size: 0.9em;
    color: var(--color-text-light);
  }

`;

const InventoryForm = ({ item, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    product_id: item?.product_id || '',
    quantity_available: item?.quantity_available || 0,
    quantity_reserved: item?.quantity_reserved || 0,
    location_identifier: item?.location_identifier || '',
    status: item?.status || 'AVAILABLE',
  });
  const [productSearchTerm, setProductSearchTerm] = useState('');
  const [showProductOptions, setShowProductOptions] = useState(false);
  const productInputRef = useRef(null); // Ref para o container do campo de input de produto

  // Define o limite de itens a serem exibidos no dropdown
  const MAX_DISPLAY_ITEMS = 8;

  // Atualiza o formulário se o item a ser editado mudar
  useEffect(() => {
    if (item) {
      setFormData({
        product_id: item.product_id,
        quantity_available: item.quantity_available,
        quantity_reserved: item.quantity_reserved,
        location_identifier: item.location_identifier,
        status: item.status,
      });
      // Ao editar, pré-popula o termo de busca com o nome do produto atual
      const currentProductName = allEntities.product.find(p => p.id === item.product_id)?.name || '';
      setProductSearchTerm(currentProductName);
    } else {
      // Limpa o formulário para um novo item
      setFormData({
        product_id: '', quantity_available: 0, quantity_reserved: 0,
        location_identifier: '', status: 'AVAILABLE',
      });
      setProductSearchTerm(''); // Limpa o termo de busca
    }
  }, [item]);

  // Handle para mudança nos inputs numéricos e de texto (exceto busca de produto)
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value, 10) : value
    }));
  };

  // Handle para a mudança no input de busca de produto
  const handleProductSearchChange = (e) => {
    const value = e.target.value;
    setProductSearchTerm(value);
    // Se o campo de busca estiver vazio, limpa o product_id selecionado
    if (!value) {
      setFormData(prev => ({ ...prev, product_id: '' }));
    }
    setShowProductOptions(true); // Sempre mostra as opções ao digitar
  };

  // Handle para quando uma opção de produto é selecionada
  const handleProductSelect = (product) => {
    setFormData(prev => ({ ...prev, product_id: product.id }));
    setProductSearchTerm(product.name); // Seta o nome no campo de busca
    setShowProductOptions(false); // Esconde as opções
  };

  // Filtra os produtos com base no termo de busca e limita a quantidade
  const filteredProducts = useMemo(() => {
    const lowerCaseSearchTerm = productSearchTerm.toLowerCase();
    const results = allEntities.product.filter(product =>
      product.name.toLowerCase().includes(lowerCaseSearchTerm)
    );
    return results.slice(0, MAX_DISPLAY_ITEMS); // Limita aos primeiros MAX_DISPLAY_ITEMS
  }, [productSearchTerm]);

  // Efeito para fechar as opções quando o clique é fora do componente
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Verifica se o clique foi fora do ref do container de pesquisa
      if (productInputRef.current && !productInputRef.current.contains(event.target)) {
        setShowProductOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [productInputRef]);


  const handleSubmit = (e) => {
    e.preventDefault();

    // Validações básicas
    if (!formData.product_id) {
      alert('Por favor, selecione um produto.');
      return;
    }
    if (!formData.location_identifier) {
      alert('Por favor, informe o identificador de localização.');
      return;
    }
    if (formData.quantity_available < 0 || formData.quantity_reserved < 0) {
        alert('As quantidades disponíveis e reservadas não podem ser negativas.');
        return;
    }

    onSave({
      ...formData,
      id: item ? item.id : null, // Passa o ID se for edição
    });
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <div className="product-select-wrapper" ref={productInputRef}> {/* Ref aplicado ao wrapper */}
        <label htmlFor="product_search">Pesquisar e Selecionar Produto:</label>
        <input
          type="text"
          id="product_search"
          className="product-search-input"
          value={productSearchTerm}
          onChange={handleProductSearchChange}
          onFocus={() => setShowProductOptions(true)} // Mostra opções ao focar
          placeholder="Digite para buscar um produto..."
          required // Campo obrigatório
        />
        {showProductOptions && filteredProducts.length > 0 && (
          <div className="product-options-dropdown">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                onClick={() => handleProductSelect(product)}
                className={formData.product_id === product.id ? 'selected' : ''}
              >
                {product.name}
              </div>
            ))}
          </div>
        )}
        {/* Exibe o nome do produto selecionado para confirmação, se um produto foi realmente selecionado */}
        {formData.product_id && !showProductOptions && ( /* Exibe apenas quando a lista não está aberta */
          <p className="selected-product-info">Produto selecionado: <strong>{productSearchTerm}</strong></p>
        )}
      </div>

      {/* Os campos abaixo SEMPRE visíveis, mas a lista de produtos flutuará por cima */}
      <div>
        <label htmlFor="quantity_available">Quantidade Disponível:</label>
        <input
          type="number"
          id="quantity_available"
          name="quantity_available"
          value={formData.quantity_available}
          onChange={handleChange}
          min="0"
          required
        />
      </div>

      <div>
        <label htmlFor="quantity_reserved">Quantidade Reservada:</label>
        <input
          type="number"
          id="quantity_reserved"
          name="quantity_reserved"
          value={formData.quantity_reserved}
          onChange={handleChange}
          min="0"
          required
        />
      </div>

      <div>
        <label htmlFor="location_identifier">Identificador de Localização:</label>
        <input
          type="text"
          id="location_identifier"
          name="location_identifier"
          value={formData.location_identifier}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="AVAILABLE">Disponível</option>
          <option value="LOW_STOCK">Estoque Baixo</option>
          <option value="OUT_OF_STOCK">Fora de Estoque</option>
        </select>
      </div>

      <div className="button-group">
        <Button type="button" $outline onClick={onClose}>Cancelar</Button>
        <Button type="submit" $primary>Salvar Item</Button>
      </div>
    </FormContainer>
  );
};

export default InventoryForm;
