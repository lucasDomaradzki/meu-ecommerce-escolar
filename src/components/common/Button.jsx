import styled from 'styled-components';

const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => !['variant', 'outline', 'primary'].includes(prop)
})`
  padding: 10px 15px;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-size: 1em;
  font-weight: bold;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out, border-color 0.2s ease-in-out;

  /* Estilos padrão (se nenhuma prop específica for usada) */
  background-color: var(--color-primary);
  color: var(--color-white);
  border: 1px solid var(--color-primary);

  &:hover {
    background-color: var(--color-primary-dark);
    border-color: var(--color-primary-dark);
  }

  /* Estilos para variant="secondary" */
  ${props => props.variant === 'secondary' && `
    background-color: var(--color-gray);
    color: var(--color-text-dark);
    border-color: var(--color-gray);
    &:hover {
      background-color: var(--color-gray-dark);
      border-color: var(--color-gray-dark);
    }
  `}

  /* Estilos para variant="danger" */
  ${props => props.variant === 'danger' && `
    background-color: var(--color-danger);
    color: var(--color-white);
    border-color: var(--color-danger);
    &:hover {
      background-color: var(--color-danger-dark);
      border-color: var(--color-danger-dark);
    }
  `}

  /* Estilos para prop $primary (se você quiser um botão primário explícito) */
  ${props => props.$primary && `
    background-color: var(--color-primary);
    color: var(--color-white);
    border-color: var(--color-primary);
    &:hover {
      background-color: var(--color-primary-dark);
      border-color: var(--color-primary-dark);
    }
  `}

  /* Estilos para prop $outline */
  ${props => props.$outline && `
    background-color: transparent;
    color: var(--color-primary); /* Cor do texto quando outline */
    border: 1px solid var(--color-primary);
    &:hover {
      background-color: var(--color-primary-light); /* Fundo leve no hover */
      color: var(--color-primary-dark);
    }
  `}
`;

export default Button;
