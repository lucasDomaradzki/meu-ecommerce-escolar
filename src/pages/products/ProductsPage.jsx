// src/pages/products/ProductsPage.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { products as allProducts } from '../../data/products';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { useCart } from '../../context/CartContext'; // Importa o contexto do carrinho

const ProductsPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  min-height: calc(100vh - var(--header-height) - var(--footer-height));
  background-color: var(--color-background-light);
`;

const HeaderContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  text-align: left;
  margin-bottom: 30px;
`;

const PageTitle = styled.h1`
  font-size: 2.8rem;
  color: var(--color-primary);
  margin-bottom: 10px;

  @media (max-width: var(--breakpoint-tablet)) {
    font-size: 2.2rem;
    text-align: center;
  }
`;

const PageSubtitle = styled.p`
  font-size: 1.2rem;
  color: var(--color-text-light);
  margin-bottom: 20px;

  @media (max-width: var(--breakpoint-tablet)) {
    font-size: 1rem;
    text-align: center;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  max-width: 1200px;
  width: 100%;

  @media (max-width: var(--breakpoint-mobile)) {
    grid-template-columns: 1fr;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  max-height: 180px;
  object-fit: contain;
  margin-bottom: 15px;
`;

const Price = styled.p`
  font-size: 1.5rem;
  color: var(--color-tertiary);
  font-weight: bold;
  margin-top: auto; /* Empurra para baixo */
  margin-bottom: 10px;
`;

const StockInfo = styled.p`
  font-size: 0.9rem;
  color: ${props => props.$lowstock ? 'var(--color-danger)' : 'var(--color-text-light)'};
  margin-bottom: 15px;
  font-weight: ${props => props.$lowstock ? 'bold' : 'normal'};
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const ProductsPage = () => {
  const { schoolId, gradeId } = useParams();
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { addToCart } = useCart(); // Usa o hook do carrinho

  useEffect(() => {
    // Simula a filtragem baseada na escola e série, ou mostra todos os kits/produtos se não especificado
    let tempProducts = [];
    if (schoolId && gradeId) {
      // Lógica para filtrar produtos por escola e série (apenas kits, no seu caso atual)
      tempProducts = allProducts.filter(p => p.isKit && p.availableFor.some(
        sf => sf.schoolId === schoolId && sf.gradeId === gradeId
      ));
    } else {
      // Se não houver schoolId/gradeId, mostra todos os kits e produtos individuais que não são parte de kits
      tempProducts = allProducts.filter(p => p.isKit || (!p.isKit && !p.parentPackageId));
    }
    setFilteredProducts(tempProducts);
  }, [schoolId, gradeId]);

  const handleAddToCart = (product, quantity = 1) => {
    addToCart(product, quantity);
    alert(`${product.name} adicionado ao carrinho!`); // Feedback simples
  };

  return (
    <ProductsPageContainer>
      <HeaderContainer>
        <PageTitle>
          {schoolId && gradeId ? `Pacotes para sua escola e série` : `Nossos Pacotes e Produtos`}
        </PageTitle>
        <PageSubtitle>
          {schoolId && gradeId
            ? `Confira os kits de materiais disponíveis para sua ${gradeId} na Escola ${schoolId}.`
            : `Descubra a variedade de kits escolares e produtos individuais que oferecemos.`}
        </PageSubtitle>
      </HeaderContainer>

      <ProductGrid>
        {filteredProducts.map(product => (
          <Card key={product.id} $hoverable={true}> {/* Usando $hoverable */}
            <ProductImage src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            {/* Exibe o preço se não for um item de um kit (para kits e produtos avulsos) */}
            {!product.parentPackageId && (
              <Price>R$ {product.price.toFixed(2).replace('.', ',')}</Price>
            )}
            <StockInfo $lowstock={product.stock > 0 && product.stock <= 10}> {/* Usando $lowstock */}
              Em estoque: {product.stock} unidades
              {product.stock === 0 && " (Esgotado)"}
            </StockInfo>
            <ButtonGroup>
              {product.stock > 0 && ( // Adiciona o botão de adicionar ao carrinho apenas se houver estoque
                <Button $primary onClick={() => handleAddToCart(product)} disabled={product.stock === 0}>
                  Adicionar ao Carrinho
                </Button>
              )}
              <Button $outline onClick={() => navigate(`/pacotes/${product.id}`)}>
                Ver Detalhes
              </Button>
            </ButtonGroup>
          </Card>
        ))}
      </ProductGrid>
    </ProductsPageContainer>
  );
};

export default ProductsPage;
