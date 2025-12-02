import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeroSection = styled.section`
  background-color: var(--secondary-color); /* Cor de fundo de fallback */
  padding: 6rem 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  position: relative;
  overflow: hidden;

  /* Efeito Cascata Suave */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 200%; /* Altura dobrada para o loop */
    background: url('/images/hero-bg.png');
    background-size: cover;
    background-position: center;
    opacity: 1; /* Totalmente visível */
    animation: waterfall 40s linear infinite; /* Um pouco mais rápido */
    z-index: 0; /* No nível do container, mas atrás do conteúdo (que terá z-index maior) */
  }

  /* Overlay para garantir leitura */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.3); /* Camada branca translúcida mais leve */
    z-index: 1;
  }

  /* Conteúdo deve ficar acima do background e overlay */
  & > * {
    position: relative;
    z-index: 2;
  }

  @keyframes waterfall {
    0% {
      transform: translateY(-50%);
    }
    100% {
      transform: translateY(0);
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Title = styled.h1`
  font-size: 5.5rem;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  animation: fadeInUp 0.8s ease-out forwards;
  animation-delay: 0.3s;
  opacity: 0; /* Começa invisível */
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  margin-bottom: 2.5rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  font-weight: 300;
  animation: fadeInUp 0.8s ease-out forwards;
  animation-delay: 0.1s;
  opacity: 0; /* Começa invisível */
`;

const Button = styled(Link)`
  background-color: var(--primary-color);
  color: var(--white);
  padding: 1.2rem 3.5rem;
  font-size: 1.1rem;
  border-radius: 50px;
  text-transform: uppercase;
  letter-spacing: 2px;
  box-shadow: 0 10px 20px rgba(212, 140, 149, 0.3);
  transition: transform 0.2s, background-color 0.3s;
  cursor: pointer;
  text-decoration: none;
  animation: fadeInUp 0.8s ease-out forwards;
  animation-delay: 0.5s;
  opacity: 0; /* Começa invisível */

  &:hover {
    background-color: #c0757e;
    transform: scale(1.05);
  }
`;

export const Hero = () => {
  return (
    <HeroSection>
      <Subtitle>Feito à Mão com Amor</Subtitle>
      <Title>Uma Mordida<br />de Felicidade</Title>
      <Button to="/menu">Peça Agora</Button>
    </HeroSection>
  );
};
