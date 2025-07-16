// src/pages/products/ProductDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import { products as allProducts } from '../../data/products';
import ImageCarousel from '../../components/product/ImageCarousel';
import { useCart } from '../../context/CartContext'; // Importa o contexto do carrinho

// --- Styled Components (Mantenha como estão, exceto Price) ---
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

// Condicionalmente esconda o Price se não for um kit
const Price = styled.p`
  font-size: 2.2rem;
  color: var(--color-tertiary);
  font-weight: bold;
  margin-bottom: 20px;
  ${props => props.$isHidden && 'display: none;'} /* Nova propriedade para esconder */

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
  const [returnPath, setReturnPath] = useState('/pacotes');
  const [returnButtonText, setReturnButtonText] = useState('Voltar para Pacotes');
  const { addToCart } = useCart(); // Usa o hook do carrinho

  useEffect(() => {
    const foundProduct = allProducts.find(p => p.id === id);
    setProduct(foundProduct);

    if (foundProduct) {
      if (foundProduct.parentPackageId) {
        const parentPackage = allProducts.find(p => p.id === foundProduct.parentPackageId && p.isKit);
        if (parentPackage) {
          setReturnPath(`/pacotes/${parentPackage.id}`);
          setReturnButtonText(`Voltar para ${parentPackage.name}`);
        } else {
          setReturnPath('/pacotes');
          setReturnButtonText('Voltar para Pacotes');
        }
      } else {
        setReturnPath('/pacotes');
        setReturnButtonText('Voltar para Pacotes');
      }
    } else {
      navigate('/404');
    }
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, 1); // Adiciona 1 unidade do produto
      alert(`${product.name} adicionado ao carrinho!`); // Feedback simples
    }
  };

  if (!product) {
    return <ProductDetailContainer>Carregando...</ProductDetailContainer>;
  }

  const isLowStock = product.stock > 0 && product.stock <= 10;

  return (
    <ProductDetailContainer>
      <ContentWrapper>
        <ImageSection>
          <ImageCarousel images={product.galleryImages && product.galleryImages.length > 0 ? product.galleryImages : [product.imageUrl]} />
        </ImageSection>
        <InfoSection>
          <ProductName>{product.name}</ProductName>
          {/* Apenas exibe o preço se for um kit ou se não tiver parentPackageId (ou seja, não é um item de kit) */}
          <Price $isHidden={!product.isKit && product.parentPackageId}> {/* Esconde se não for kit E tiver parentPackageId */}
            R$ {product.price.toFixed(2).replace('.', ',')}
          </Price>
          <Description>{product.description}</Description>
          <StockInfo $lowstock={isLowStock}>
            Em estoque: {product.stock} unidades {product.stock === 0 && "(Esgotado)"}
          </StockInfo>
          <ButtonGroup>
            {product.stock > 0 && ( // Adiciona o botão de adicionar ao carrinho apenas se houver estoque
              <Button $primary onClick={handleAddToCart} disabled={product.stock === 0}>
                Adicionar ao Carrinho
              </Button>
            )}
            <Button $outline onClick={() => navigate(returnPath)}>
              {returnButtonText}
            </Button>
          </ButtonGroup>
        </InfoSection>
      </ContentWrapper>

      {product.items && product.items.length > 0 && (
        <ItemsIncludedSection>
          <SectionHeader>Itens Inclusos no Pacote:</SectionHeader>
          <ItemList>
            {product.items.map((item, index) => (
              <Item key={index}>
                {/* Removido a exibição do preço do item individual aqui */}
                {item.quantity}x {item.link ? <Link to={item.link}>{item.name}</Link> : item.name}
              </Item>
            ))}
          </ItemList>
        </ItemsIncludedSection>
      )}
    </ProductDetailContainer>
  );
};

export default ProductDetailPage;
