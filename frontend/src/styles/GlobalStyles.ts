import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    /* ================================================================================== */
    /* PALETA DE CORES DA MARCA */
    /* ================================================================================== */
    /* Mude aqui para alterar as cores de todo o site de uma vez só! */
    
    --primary-color: #D48C95; /* Cor Principal (Botões, Destaques) - Rosa Antigo */
    --secondary-color: #FDF0F0; /* Cor de Fundo Suave - Rosa Bem Clarinho */
    --accent-color: #8B5E63; /* Cor de Texto Forte / Títulos - Vinho Suave */
    --gold-color: #C5A059; /* Cor Premium (Detalhes, Preços) - Dourado */
    --text-color: #555; /* Texto Comum - Cinza Escuro */
    --white: #FFF9F9; /* Branco Leitoso (Melhor que branco puro para os olhos) */
    
    --font-heading: 'Pacifico', cursive; /* Fonte dos Títulos (Estilo Manuscrito) */
    --font-body: 'Poppins', sans-serif; /* Fonte do Texto (Leitura Fácil) */
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: var(--font-body);
    background-color: var(--secondary-color);
    color: var(--text-color);
    line-height: 1.6;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
    color: var(--accent-color);
    font-weight: 400;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul {
    list-style: none;
  }

  /* Global Fade In Animation */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  #root > * {
    animation: fadeIn 0.6s ease-out;
  }

  /* Scrollbar Customization */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: var(--secondary-color);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--primary-color);
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--accent-color);
  }
`;
