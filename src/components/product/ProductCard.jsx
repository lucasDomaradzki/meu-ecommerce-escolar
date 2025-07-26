import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import { useCart } from '../../context/CartContext';

const Card = styled.div`
  background-color: var(--color-background);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: center;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  width: 100%; /* Garante que o card ocupe a largura disponível na grid */
  /* Remove largura fixa para que a grid controle */

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px; /* Altura fixa para as imagens dos cards */
  object-fit: cover; /* Recorta a imagem para preencher a área */
  display: block;
  border-bottom: 1px solid var(--color-border-light);
`;

const ProductInfo = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Faz as informações ocuparem o espaço restante */
  justify-content: space-between; /* Empurra o botão para baixo */
`;

const ProductName = styled.h3`
  font-size: 1.3rem;
  color: var(--color-primary-dark);
  margin-bottom: 10px;
  line-height: 1.3;

  @media (max-width: var(--breakpoint-tablet)) {
    font-size: 1.1rem;
  }
`;

const ProductDescription = styled.p`
  font-size: 0.9rem;
  color: var(--color-text-light);
  margin-bottom: 15px;
  flex-grow: 1; /* Permite que a descrição ocupe mais espaço */
`;

const ProductPrice = styled.p`
  font-size: 1.6rem;
  font-weight: bold;
  color: var(--color-accent);
  margin-top: auto; /* Empurra o preço para baixo, acima do botão */
  margin-bottom: 15px;
`;

const CardButton = styled(Button)`
  width: 100%; /* Botão ocupa a largura total do card */
  /* Ajusta padding e font-size para telas menores */
  @media (max-width: var(--breakpoint-tablet)) {
    padding: 8px 10px;
    font-size: 0.9rem;
  }
`;

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <Card>
      <Link to={`/pacotes/${product.id}`}>
        <ProductImage src={product.imageUrl} alt={product.name} />
      </Link>
      <ProductInfo>
        <Link to={`/pacotes/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <ProductName>{product.name}</ProductName>
          <ProductDescription>{product.description}</ProductDescription>
        </Link>
        <ProductPrice>R$ {product.price.toFixed(2).replace('.', ',')}</ProductPrice>
        <CardButton $primary onClick={() => addToCart(product, 1)}>
          Adicionar ao Carrinho
        </CardButton>
      </ProductInfo>
    </Card>
  );
};

export default ProductCard;
