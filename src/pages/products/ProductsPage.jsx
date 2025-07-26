// src/pages/products/ProductsPage.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { useCart } from '../../context/CartContext';

// Importa a imagem fixa temporariamente
import mochilaRosa from '../../assets/f59585fa6f5daaefae9aeae538c23cd3-mochila-escolar-rosa-plana.webp';

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
  const navigate = useNavigate();
  const location = useLocation();
  const { schoolId, gradeId } = location.state || {};

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchPackages = async () => {
      if (!schoolId || !gradeId) {
        setError("Escola ou série não selecionadas. Por favor, volte e selecione.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const apiUrl = `http://localhost:8080/v1/product/school/${schoolId}/grade/${gradeId}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPackages(data);
      } catch (err) {
        console.error("Erro ao buscar pacotes:", err);
        setError("Não foi possível carregar os pacotes para esta escola/série. Tente novamente mais tarde.");
        setPackages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [schoolId, gradeId]);

  const handleAddToCart = (product, quantity = 1) => {
    // Para adicionar ao carrinho, vamos passar o produto com um estoque padrão de 0,
    // já que o backend ainda não fornece essa informação para este endpoint.
    const productWithDefaultStock = { ...product, stock: 0 };
    addToCart(productWithDefaultStock, quantity);
  };

  if (loading) {
    return (
      <ProductsPageContainer>
        <p>Carregando pacotes...</p>
      </ProductsPageContainer>
    );
  }

  if (error) {
    return (
      <ProductsPageContainer>
        <p style={{ color: 'red' }}>{error}</p>
        <Button onClick={() => navigate('/')}>Voltar para Seleção</Button>
      </ProductsPageContainer>
    );
  }

  if (packages.length === 0) {
    return (
      <ProductsPageContainer>
        {/* Mantém o header fixo mesmo sem pacotes */}
        <HeaderContainer>
          <PageTitle>Nossos Pacotes e Produtos</PageTitle>
          <PageSubtitle>Descubra a variedade de kits escolares e produtos individuais que oferecemos.</PageSubtitle>
        </HeaderContainer>
        <p>Não encontramos pacotes para a seleção feita. Por favor, tente outra escola ou série.</p>
        <Button $primary onClick={() => navigate('/')}>Voltar para Seleção de Escola/Série</Button>
      </ProductsPageContainer>
    );
  }

  return (
    <ProductsPageContainer>
      <HeaderContainer>
        {/* HEADER FIXO - CONFORME SOLICITADO */}
        <PageTitle>Nossos Pacotes e Produtos</PageTitle>
        <PageSubtitle>Descubra a variedade de kits escolares e produtos individuais que oferecemos.</PageSubtitle>
      </HeaderContainer>

      <ProductGrid>
        {packages.map(pkg => {
          const formattedPrice = pkg.price != null
            ? parseFloat(pkg.price).toFixed(2).replace('.', ',')
            : 'N/A';

          // A API ainda não retorna 'stock', então ele será sempre 0
          // Removida a condição do botão para sempre exibi-lo
          const stock = pkg.stock != null ? pkg.stock : 0;
          const isLowStock = stock > 0 && stock <= 10; // Esta lógica de estilo permanece para quando o stock for adicionado
          const stockMessage = `Em estoque: ${stock} unidades`; // A mensagem permanece "0 unidades"

          return (
            <Card key={pkg.id} $hoverable={true}>
              <ProductImage src={mochilaRosa} alt={pkg.name} />
              <h3>{pkg.name}</h3>
              <Price>R$ {formattedPrice}</Price>
              <StockInfo $lowstock={isLowStock}>
                {stockMessage}
              </StockInfo>
              <ButtonGroup>
                {/* BOTÃO "ADICIONAR AO CARRINHO" AGORA SEMPRE VISÍVEL */}
                <Button $primary onClick={() => handleAddToCart(pkg)}>
                  Adicionar ao Carrinho
                </Button>
                {/* Botão "Ver Detalhes" mantido */}
                <Button $outline onClick={() => navigate(`/pacotes/${pkg.id}`)}>
                  Ver Detalhes
                </Button>
              </ButtonGroup>
            </Card>
          );
        })}
      </ProductGrid>
    </ProductsPageContainer>
  );
};

export default ProductsPage;