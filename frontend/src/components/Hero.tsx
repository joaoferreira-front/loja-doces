import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeroSection = styled.section`
  background: linear-gradient(135deg, var(--secondary-color) 0%, var(--white) 100%);
  padding: 6rem 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
`;

const Title = styled.h1`
  font-size: 5.5rem;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  
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
