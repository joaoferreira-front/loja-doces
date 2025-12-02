import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import type { Produto } from '../types';
import { useCart } from '../context/CartContext';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ $active: boolean }>`
  background-color: ${props => props.$active ? 'var(--primary-color)' : 'transparent'};
  color: ${props => props.$active ? 'var(--white)' : 'var(--accent-color)'};
  border: 2px solid var(--primary-color);
  padding: 0.5rem 1.5rem;
  border-radius: 25px;
  font-family: var(--font-body);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--primary-color);
    color: var(--white);
    transform: translateY(-2px);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
`;

const Card = styled.div`
  background: var(--white);
  border-radius: 25px;
  padding: 2.5rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(212, 140, 149, 0.25);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: var(--gold-color);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
  }

  &:hover::before {
    transform: scaleX(1);
  }

  img {
    width: 100%;
    height: 220px;
    object-fit: cover;
    border-radius: 20px;
    margin-bottom: 1.5rem;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }

  h3 {
    font-size: 1.4rem;
    margin-bottom: 0.5rem;
    font-family: var(--font-heading);
    color: var(--accent-color);
  }

  p {
    color: #888;
    font-size: 0.95rem;
    margin-bottom: 1.5rem;
    line-height: 1.5;
  }
`;

const Price = styled.span`
  font-size: 1.5rem;
  color: var(--gold-color);
  font-weight: 700;
  display: block;
  margin-bottom: 1.5rem;
`;

const Button = styled.button`
  background-color: var(--primary-color);
  color: var(--white);
  padding: 1rem 2rem;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-weight: 600;
  width: 100%;
  transition: all 0.3s ease;
  font-family: var(--font-body);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;

  &:hover {
    background-color: var(--accent-color);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(139, 94, 99, 0.3);
  }

  &:disabled {
    background-color: #e0e0e0;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const ProductList = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [filteredProdutos, setFilteredProdutos] = useState<Produto[]>([]);
  const [filter, setFilter] = useState('Todos');
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get('http://localhost:8080/api/produtos')
      .then(response => {
        setProdutos(response.data);
        setFilteredProdutos(response.data);
      })
      .catch(error => console.error("Erro ao buscar produtos:", error));
  }, []);

  useEffect(() => {
    if (filter === 'Todos') {
      setFilteredProdutos(produtos);
    } else {
      // Simple keyword filtering for MVP
      const lowerFilter = filter.toLowerCase().slice(0, -1); // Remove 's' roughly
      setFilteredProdutos(produtos.filter(p =>
        p.nome.toLowerCase().includes(lowerFilter) ||
        p.descricao.toLowerCase().includes(lowerFilter)
      ));
    }
  }, [filter, produtos]);

  const handleAddToCart = (produto: Produto) => {
    addToCart(produto);
    alert(`Delícia! ${produto.nome} foi adicionado ao carrinho. 🍬`);
  };

  return (
    <Container id="menu">
      <FilterContainer>
        {['Todos', 'Bolos', 'Doces', 'Tortas'].map(cat => (
          <FilterButton
            key={cat}
            $active={filter === cat}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </FilterButton>
        ))}
      </FilterContainer>

      <Grid>
        {filteredProdutos.map(produto => (
          <Card key={produto.id}>
            <img src={produto.imagemUrl} alt={produto.nome} />
            <h3>{produto.nome}</h3>
            <p>{produto.descricao}</p>
            <Price>R$ {produto.preco.toFixed(2)}</Price>
            <Button
              disabled={produto.quantidade === 0}
              onClick={() => handleAddToCart(produto)}
            >
              {produto.quantidade === 0 ? 'Esgotado' : 'Adicionar à Sacola'}
            </Button>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};
