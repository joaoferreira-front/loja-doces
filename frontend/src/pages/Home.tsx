import { Hero } from '../components/Hero';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FeaturedSection = styled.section`
  padding: 4rem 2rem;
  text-align: center;
  background-color: var(--white);
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;

const Button = styled(Link)`
  display: inline-block;
  background-color: var(--primary-color);
  color: var(--white);
  padding: 1rem 2.5rem;
  border-radius: 30px;
  font-size: 1.1rem;
  margin-top: 2rem;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
    background-color: #c0757e;
  }
`;

export const Home = () => {
    return (
        <>
            <Hero />
            <FeaturedSection>
                <SectionTitle>Nossos Destaques</SectionTitle>
                <p style={{ fontSize: '1.2rem', color: '#888', marginBottom: '2rem' }}>
                    Experimente os doces mais amados da cidade, feitos com ingredientes selecionados e muito amor.
                </p>
                <Button to="/menu">Ver Cardápio Completo</Button>
            </FeaturedSection>
        </>
    );
};
