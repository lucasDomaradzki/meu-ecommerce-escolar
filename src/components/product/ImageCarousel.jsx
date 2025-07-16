// src/components/product/ImageCarousel.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px; /* Limita a largura do carrossel */
  height: 400px; /* Altura fixa para o carrossel */
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0; /* Impede que o carrossel encolha */
  box-sizing: border-box;

  @media (max-width: var(--breakpoint-tablet)) {
    max-width: 90%; /* Ocupa mais largura em tablets */
    height: 300px; /* Ajusta a altura para telas menores */
    margin-bottom: 20px;
  }

  @media (max-width: var(--breakpoint-mobile)) {
    max-width: 100%; /* Ocupa a largura total em celulares muito pequenos */
    height: 250px;
  }
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain; /* Garante que a imagem se ajuste sem cortar ou distorcer */
  display: block;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 10;
  font-size: 1.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.left {
    left: 10px;
  }

  &.right {
    right: 10px;
  }

  @media (max-width: var(--breakpoint-mobile)) {
    width: 30px;
    height: 30px;
    font-size: 1.2rem;
    padding: 5px; /* Ajusta padding do botão */
  }
`;

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) {
    return <CarouselContainer>Nenhuma imagem disponível.</CarouselContainer>;
  }

  return (
    <CarouselContainer>
      <CarouselImage src={images[currentIndex]} alt={`Imagem do produto ${currentIndex + 1}`} />
      {images.length > 1 && (
        <>
          <NavButton className="left" onClick={goToPrevious}>
            <FaChevronLeft />
          </NavButton>
          <NavButton className="right" onClick={goToNext}>
            <FaChevronRight />
          </NavButton>
        </>
      )}
    </CarouselContainer>
  );
};

export default ImageCarousel;
