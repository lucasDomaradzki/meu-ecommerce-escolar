import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import ImageCarousel from '../../components/product/ImageCarousel';
import { useCart } from '../../context/CartContext';

import mochilaRosa from '../../assets/f59585fa6f5daaefae9aeae538c23cd3-mochila-escolar-rosa-plana.webp';

const ProductDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  min-height: calc(100vh - var(--header-height) - var(--footer-height));
  background-color: var(--color-background-light);
`;

const ContentWrapper = styled.div`
  display: flex;
  background-color: var(--color-background);
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  width: 100%;
  overflow: hidden;
  flex-direction: row;

  @media (max-width: var(--breakpoint-tablet)) {
    flex-direction: column;
    align-items: center;
  }
`;

const ImageSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  background-color: var(--color-light);

  @media (max-width: var(--breakpoint-tablet)) {
    width: 100%;
    padding: 20px;
  }
`;

const InfoSection = styled.div`
  flex: 1;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;

  @media (max-width: var(--breakpoint-tablet)) {
    padding: 20px;
    text-align: center;
  }
`;

const ProductName = styled.h1`
  font-size: 2.5rem;
  color: var(--color-primary);
  margin-bottom: 15px;

  @media (max-width: var(--breakpoint-tablet)) {
    font-size: 2rem;
  }
`;

const Price = styled.p`
  font-size: 2.2rem;
  color: var(--color-tertiary);
  font-weight: bold;
  margin-bottom: 20px;

  @media (max-width: var(--breakpoint-tablet)) {
    font-size: 1.8rem;
  }
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: var(--color-text);
  line-height: 1.6;
  margin-bottom: 30px;

  @media (max-width: var(--breakpoint-tablet)) {
    font-size: 1rem;
    margin-bottom: 20px;
  }
`;

const StockInfo = styled.p`
  font-size: 0.95rem;
  color: ${props => props.$lowstock ? 'var(--color-danger)' : 'var(--color-text-light)'};
  margin-bottom: 25px;
  font-weight: ${props => props.$lowstock ? 'bold' : 'normal'};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
  justify-content: center;

  @media (max-width: var(--breakpoint-mobile)) {
    flex-direction: column;
    width: 100%;

    button {
      width: 100%;
    }
  }
`;

const ItemsIncludedSection = styled.div`
  margin-top: 40px;
  padding: 30px;
  background-color: var(--color-background);
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  max-width: 1200px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: var(--breakpoint-tablet)) {
    padding: 20px;
    margin-top: 30px;
  }
`;

const SectionHeader = styled.h2`
  font-size: 2rem;
  color: var(--color-primary);
  margin-bottom: 20px;
  text-align: center;

  @media (max-width: var(--breakpoint-tablet)) {
    font-size: 1.7rem;
    margin-bottom: 15px;
  }
`;

const ItemList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 15px;

  @media (max-width: var(--breakpoint-tablet)) {
    grid-template-columns: 1fr;
  }
`;

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px dashed var(--color-border);
  font-size: 1rem;
  color: var(--color-text);

  &:last-child {
    border-bottom: none;
  }

  a {
    color: var(--color-primary);
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const apiUrl = `http://localhost:8080/v1/product/productlist/${id}`;
        console.log("Chamando API para detalhes do pacote:", apiUrl);
        const response = await fetch(apiUrl);

        if (!response.ok) {
          if (response.status === 404) {
            navigate('/404');
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error("Erro ao buscar detalhes do pacote:", err);
        setError("Não foi possível carregar os detalhes do pacote. Tente novamente mais tarde.");
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetails();
    } else {
      navigate('/404');
    }
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (product) {
      const productWithDefaultStock = { ...product, stock: 0 };
      addToCart(productWithDefaultStock, 1);
    }
  };

  if (loading) {
    return (
      <ProductDetailContainer>
        <p>Carregando detalhes do pacote...</p>
      </ProductDetailContainer>
    );
  }

  if (error) {
    return (
      <ProductDetailContainer>
        <p style={{ color: 'red' }}>{error}</p>
        <Button onClick={() => navigate('/')}>Voltar para Seleção</Button>
      </ProductDetailContainer>
    );
  }

  if (!product) {
      return (
          <ProductDetailContainer>
              <p>Produto não encontrado ou um erro inesperado ocorreu.</p>
              <Button onClick={() => navigate('/')}>Voltar para Seleção</Button>
          </ProductDetailContainer>
      );
  }

  const stock = 0;
  const isLowStock = false;
  const stockMessage = `Em estoque: ${stock} unidades`;

  const formattedPrice = product.price != null
    ? parseFloat(product.price).toFixed(2).replace('.', ',')
    : 'N/A';

  return (
    <ProductDetailContainer>
      <ContentWrapper>
        <ImageSection>
          <ImageCarousel images={[mochilaRosa]} />
        </ImageSection>
        <InfoSection>
          <ProductName>{product.name}</ProductName>
          <Price>
            R$ {formattedPrice}
          </Price>
          <Description>{product.description}</Description>
          <StockInfo $lowstock={isLowStock}>
            {stockMessage} {stock === 0 && "(Esgotado)"}
          </StockInfo>
          <ButtonGroup>
            <Button $primary onClick={handleAddToCart}>
              Adicionar ao Carrinho
            </Button>
            <Button $outline onClick={() => navigate('/')}>
              Voltar para Seleção
            </Button>
          </ButtonGroup>
        </InfoSection>
      </ContentWrapper>

      {product.products && product.products.length > 0 && (
        <ItemsIncludedSection>
          <SectionHeader>Itens Inclusos no Pacote:</SectionHeader>
          <ItemList>
            {product.products.map((item, index) => (
              <Item key={index}>
                {item.quantity}x {item.product.name}
              </Item>
            ))}
          </ItemList>
        </ItemsIncludedSection>
      )}
    </ProductDetailContainer>
  );
};

export default ProductDetailPage;