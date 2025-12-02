import { useEffect, useState } from 'react';
import { Hero } from '../components/Hero';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import type { Produto } from '../types';
import { api } from '../services/api';

const FeaturedSection = styled.section`
  padding: 4rem 2rem;
  text-align: center;
  background-color: var(--white);
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 3rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto 3rem;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 15px;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: var(--accent-color);
  }
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
  const [featured, setFeatured] = useState<Produto[]>([]);

  useEffect(() => {
    api.get('/produtos')
      .then(response => {
        // Take first 3 products as featured
        setFeatured(response.data.slice(0, 3));
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <Hero />
      <FeaturedSection>
        <SectionTitle>Nossos Destaques</SectionTitle>

        <Grid>
          {featured.map(produto => (
            <Card key={produto.id}>
              <img src={produto.imagemUrl} alt={produto.nome} />
              <h3>{produto.nome}</h3>
              <p style={{ color: '#888', marginBottom: '1rem' }}>R$ {produto.preco.toFixed(2)}</p>
            </Card>
          ))}
        </Grid>

        <Button to="/menu">Ver Cardápio Completo</Button>
      </FeaturedSection>
    </>
  );
};
