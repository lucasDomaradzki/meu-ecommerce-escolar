// src/styles/GlobalStyles.jsx
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    /* Cores */
    --color-primary: #007bff;
    --color-primary-dark: #0056b3;
    --color-primary-light: #e6f2ff;
    --color-secondary: #6c757d;
    --color-tertiary: #28a745; /* Cor para preços/sucesso */
    --color-danger: #dc3545;
    --color-danger-dark: #c82333;
    --color-warning: #ffc107;
    --color-info: #17a2b8;
    --color-text: #343a40;
    --color-text-light: #6c757d;
    --color-background: #ffffff;
    --color-background-light: #f8f9fa;
    --color-border: #dee2e6;
    --color-light: #f0f2f5; /* Uma cor mais clara para elementos */
    --color-gray-dark: #343a40;
    --color-gray: #6c757d;


    /* Espaçamento */
    --spacing-unit: 8px;

    /* Tipografia */
    --font-family-primary: 'Arial', sans-serif;
    --font-size-base: 16px;
    --font-size-large: 1.25rem;
    --font-size-small: 0.875rem;

    /* Tamanhos de tela para Media Queries */
    --breakpoint-mobile: 576px;
    --breakpoint-tablet: 768px;
    --breakpoint-desktop: 992px;
    --breakpoint-large-desktop: 1200px;

    /* Altura do Header e Footer (exemplo, ajuste conforme necessário) */
    --header-height: 80px; /* Exemplo, ajuste se seu header tiver altura fixa */
    --footer-height: 100px; /* Exemplo, ajuste se seu footer tiver altura fixa */

    /* RGB para sombras/opacidades */
    --color-primary-rgb: 0, 123, 255;
    --color-danger-rgb: 220, 53, 69;
  }

  /* Reset básico */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: var(--font-family-primary);
    font-size: var(--font-size-base);
    color: var(--color-text);
    background-color: var(--color-background-light);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
  }

  main {
    flex-grow: 1; /* Garante que o conteúdo principal ocupe o espaço restante */
  }

  a {
    color: var(--color-primary);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  /* Estilos para rolagem */
  body::-webkit-scrollbar {
    width: 8px;
  }

  body::-webkit-scrollbar-track {
    background: var(--color-background-light);
  }

  body::-webkit-scrollbar-thumb {
    background-color: var(--color-primary-dark);
    border-radius: 10px;
    border: 2px solid var(--color-background-light);
  }
`;

export default GlobalStyles;
