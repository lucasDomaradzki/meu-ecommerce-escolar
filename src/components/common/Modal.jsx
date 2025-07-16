// src/components/common/Modal.jsx
import React from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Garante que o modal esteja acima de outros elementos */
`;

const ModalContent = styled.div`
  background-color: var(--color-background);
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
  width: 90%;
  max-width: 600px;
  max-height: 90vh; /* Limita a altura para modais grandes em telas pequenas */
  overflow-y: auto; /* Adiciona scroll se o conteúdo for muito grande */
  position: relative; /* Para posicionamento do botão de fechar */
  box-sizing: border-box;

  @media (max-width: var(--breakpoint-tablet)) {
    padding: 20px;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 15px;
`;

const ModalTitle = styled.h3`
  font-size: 1.8rem;
  color: var(--color-primary);
  margin: 0;

  @media (max-width: var(--breakpoint-tablet)) {
    font-size: 1.5rem;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  color: var(--color-text-light);
  cursor: pointer;
  padding: 0;
  line-height: 1;
  transition: color 0.2s ease;

  &:hover {
    color: var(--color-danger);
  }
`;

const Modal = ({ title, onClose, children }) => {
  return createPortal(
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}> {/* Impede que cliques no conteúdo fechem o modal */}
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        {children}
      </ModalContent>
    </ModalOverlay>,
    document.body // Anexa o modal diretamente ao body para evitar problemas de z-index
  );
};

export default Modal;
