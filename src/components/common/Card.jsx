import styled from 'styled-components';

const Card = styled.div`
  background-color: var(--color-background);
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-sizing: border-box;
  position: relative; // Para posicionar itens dentro, se necessário

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  // Estilos condicionais para a prop $hoverable
  ${props => props.$hoverable && `
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }
  `}

  // Caso você tenha estilos específicos para lowstock, adicione-os aqui
  ${props => props.$lowstock && `
    border: 2px solid var(--color-danger);
    box-shadow: 0 0 10px rgba(var(--color-danger-rgb), 0.5);
  `}

  @media (max-width: var(--breakpoint-tablet)) {
    padding: 20px;
  }
`;

export default Card;
