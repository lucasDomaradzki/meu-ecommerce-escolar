import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import { allEntities } from '../../data/adminEntities';

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
  textarea,
  select {
    padding: 10px;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    font-size: 1rem;
    background-color: var(--color-white);
  }

  textarea {
    resize: vertical;
    min-height: 80px;
  }

  input[type="checkbox"] {
    margin-right: 10px;
    width: auto; /* Ajusta a largura para o checkbox */
  }

  .checkbox-group {
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
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
`;

const ProductForm = ({ product, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    id: product?.id || '',
    name: product?.name || '',
    product_brand_id: product?.product_brand_id || '',
    description: product?.description || '',
    theme: product?.theme || '',
    color: product?.color || '',
    dimensions: product?.dimensions || '',
    weight: product?.weight || '',
    supplier_id: product?.supplier_id || '',
    supplier_price: product?.supplier_price || '',
    final_price: product?.final_price || '',
    special_price: product?.special_price || false,
    special_price_amount: product?.special_price_amount || '',
    product_category_id: product?.product_category_id || '',
  });

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        name: product.name,
        product_brand_id: product.product_brand_id,
        description: product.description,
        theme: product.theme,
        color: product.color,
        dimensions: product.dimensions,
        weight: product.weight,
        supplier_id: product.supplier_id,
        supplier_price: product.supplier_price,
        final_price: product.final_price,
        special_price: product.special_price,
        special_price_amount: product.special_price_amount,
        product_category_id: product.product_category_id,
      });
    } else {
      setFormData({
        id: '', name: '', product_brand_id: '', description: '', theme: '', color: '',
        dimensions: '', weight: '', supplier_id: '', supplier_price: '', final_price: '',
        special_price: false, special_price_amount: '', product_category_id: '',
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.product_brand_id || !formData.description ||
        !formData.weight || !formData.supplier_id || !formData.supplier_price ||
        !formData.final_price || !formData.product_category_id) {
      alert('Por favor, preencha todos os campos obrigatórios (Nome, Marca, Descrição, Peso, Distribuidor, Preço de Custo, Preço Final, Categoria).');
      return;
    }

    if (formData.special_price && !formData.special_price_amount) {
      alert('Por favor, informe o valor do preço especial.');
      return;
    }
    if (formData.weight <= 0) {
        alert('O peso deve ser maior que zero.');
        return;
    }
    if (formData.supplier_price <= 0 || formData.final_price <= 0) {
        alert('Os preços devem ser maiores que zero.');
        return;
    }
    if (formData.special_price && formData.special_price_amount <= 0) {
        alert('O preço especial deve ser maior que zero.');
        return;
    }


    onSave({
      ...formData,
      weight: parseFloat(formData.weight),
      supplier_price: parseFloat(formData.supplier_price),
      final_price: parseFloat(formData.final_price),
      special_price_amount: formData.special_price ? parseFloat(formData.special_price_amount) : null,
    });
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nome do Produto:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="product_brand_id">Marca:</label>
        <select
          id="product_brand_id"
          name="product_brand_id"
          value={formData.product_brand_id}
          onChange={handleChange}
          required
        >
          <option value="">Selecione uma marca</option>
          {allEntities.productBrand.map(brand => (
            <option key={brand.id} value={brand.id}>{brand.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="description">Descrição:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="theme">Tema (Opcional):</label>
        <input
          type="text"
          id="theme"
          name="theme"
          value={formData.theme}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="color">Cor (Opcional):</label>
        <input
          type="text"
          id="color"
          name="color"
          value={formData.color}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="dimensions">Dimensões (Ex: 10x5x2cm) (Opcional):</label>
        <input
          type="text"
          id="dimensions"
          name="dimensions"
          value={formData.dimensions}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="weight">Peso (kg):</label>
        <input
          type="number"
          id="weight"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          step="0.01"
          min="0.01"
          required
        />
      </div>

      <div>
        <label htmlFor="supplier_id">Distribuidor:</label>
        <select
          id="supplier_id"
          name="supplier_id"
          value={formData.supplier_id}
          onChange={handleChange}
          required
        >
          <option value="">Selecione um distribuidor</option>
          {allEntities.supplier.map(supplier => (
            <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="supplier_price">Preço de Custo (Distribuidor):</label>
        <input
          type="number"
          id="supplier_price"
          name="supplier_price"
          value={formData.supplier_price}
          onChange={handleChange}
          step="0.01"
          min="0.01"
          required
        />
      </div>

      <div>
        <label htmlFor="final_price">Preço Final (Venda):</label>
        <input
          type="number"
          id="final_price"
          name="final_price"
          value={formData.final_price}
          onChange={handleChange}
          step="0.01"
          min="0.01"
          required
        />
      </div>

      <div className="checkbox-group">
        <input
          type="checkbox"
          id="special_price"
          name="special_price"
          checked={formData.special_price}
          onChange={handleChange}
        />
        <label htmlFor="special_price">Preço Especial?</label>
      </div>

      {formData.special_price && (
        <div>
          <label htmlFor="special_price_amount">Valor do Preço Especial:</label>
          <input
            type="number"
            id="special_price_amount"
            name="special_price_amount"
            value={formData.special_price_amount}
            onChange={handleChange}
            step="0.01"
            min="0.01"
            required={formData.special_price}
          />
        </div>
      )}

      <div>
        <label htmlFor="product_category_id">Categoria:</label>
        <select
          id="product_category_id"
          name="product_category_id"
          value={formData.product_category_id}
          onChange={handleChange}
          required
        >
          <option value="">Selecione uma categoria</option>
          {allEntities.productCategory.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>

      <div className="button-group">
        <Button type="button" $outline onClick={onClose}>Cancelar</Button>
        <Button type="submit" $primary>Salvar Produto</Button>
      </div>
    </FormContainer>
  );
};

export default ProductForm;
