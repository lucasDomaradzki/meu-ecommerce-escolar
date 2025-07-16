// src/components/common/Button.jsx
import styled from 'styled-components';

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.3s ease;
  white-space: nowrap; /* Impede que o texto quebre */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  // Estilos primários
  ${props => props.$primary && `
    background-color: var(--color-primary);
    color: #fff;
    &:hover {
      background-color: var(--color-primary-dark);
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    &:active {
      transform: translateY(0);
      box-shadow: none;
    }
  `}

  // Estilos de contorno
  ${props => props.$outline && `
    background-color: transparent;
    color: var(--color-primary);
    border: 2px solid var(--color-primary);
    &:hover {
      background-color: var(--color-primary-light);
      color: #fff;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    &:active {
      transform: translateY(0);
      box-shadow: none;
    }
  `}

  // Estilos de perigo (para exclusão, etc.)
  ${props => props.$danger && `
    background-color: var(--color-danger);
    color: #fff;
    &:hover {
      background-color: var(--color-danger-dark);
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    &:active {
      transform: translateY(0);
      box-shadow: none;
    }
  `}

  // Estilos para botões pequenos
  ${props => props.$small && `
    padding: 0.5rem 1rem; // Ajusta o padding para um botão menor
    font-size: 0.85rem; // Diminui o tamanho da fonte
  `}

  // Estilos padrão se nenhuma prop de tipo for passada
  ${props => !props.$primary && !props.$outline && !props.$danger && `
    background-color: var(--color-gray-dark);
    color: #fff;
    &:hover {
      background-color: var(--color-gray);
    }
  `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export default Button;
