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

  /* WhatsApp Float */
  .whatsapp-float {
    position: fixed;
    bottom: 30px;
    right: 30px;
    background-color: #25d366;
    color: #FFF;
    border-radius: 50px;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 2px 2px 3px #999;
    z-index: 100;
    transition: transform 0.3s ease;
  }

  .whatsapp-float:hover {
    transform: scale(1.1);
    background-color: #128c7e;
  }

  .whatsapp-float img {
    width: 35px;
    height: 35px;
    filter: brightness(0) invert(1);
  }
`;
