import { useEffect, useState } from 'react';
import styled from 'styled-components';
import type { Produto } from '../types';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: flex-start;
    overflow-x: auto;
    flex-wrap: nowrap;
    padding-bottom: 1rem;
    -webkit-overflow-scrolling: touch;
    
    &::-webkit-scrollbar {
      display: none;
    }
  }
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
  white-space: nowrap;

  &:hover {
    background-color: var(--primary-color);
    color: var(--white);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 0.4rem 1rem;
    font-size: 0.9rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
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

  @media (max-width: 768px) {
    padding: 1rem;
    border-radius: 15px;
  }

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

    @media (max-width: 768px) {
      height: 120px;
      border-radius: 10px;
      margin-bottom: 0.5rem;
    }
  }

  h3 {
    font-size: 1.4rem;
    margin-bottom: 0.5rem;
    font-family: var(--font-heading);
    color: var(--accent-color);

    @media (max-width: 768px) {
      font-size: 1rem;
      margin-bottom: 0.2rem;
    }
  }

  p {
    color: #888;
    font-size: 0.95rem;
    margin-bottom: 1.5rem;
    line-height: 1.5;

    @media (max-width: 768px) {
      font-size: 0.8rem;
      margin-bottom: 0.5rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
`;

const Price = styled.span`
  font-size: 1.5rem;
  color: var(--gold-color);
  font-weight: 700;
  display: block;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }
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

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.7rem;
  }
`;

export const ProductList = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [filteredProdutos, setFilteredProdutos] = useState<Produto[]>([]);
  const [filter, setFilter] = useState('Todos');
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { user } = useAuth(); // Get user to check for ADMIN role

  const isAdmin = user?.role === 'ADMIN' || user?.email === 'admin@doces.com'; // Fallback check

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    api.get('/produtos')
      .then(response => {
        setProdutos(response.data);
        setFilteredProdutos(response.data);
      })
      .catch(error => console.error("Erro ao buscar produtos:", error));
  };

  useEffect(() => {
    if (filter === 'Todos') {
      setFilteredProdutos(produtos);
    } else {
      const lowerFilter = filter.toLowerCase().slice(0, -1);
      setFilteredProdutos(produtos.filter(p =>
        p.nome.toLowerCase().includes(lowerFilter) ||
        p.descricao.toLowerCase().includes(lowerFilter)
      ));
    }
  }, [filter, produtos]);

  const handleAddToCart = (produto: Produto) => {
    addToCart(produto);
    showToast(`Delícia! ${produto.nome} foi adicionado ao carrinho. 🍬`, 'success');
  };

  const handleImageUpload = async (produtoId: number, file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      await api.post(`/produtos/${produtoId}/imagem`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      showToast('Imagem atualizada com sucesso!', 'success');
      loadProducts(); // Reload to see changes
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      showToast('Erro ao atualizar imagem.', 'error');
    }
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
        {filteredProdutos.map((produto, index) => (
          <Card key={produto.id}>
            <div style={{ position: 'relative' }}>
              <img src={index === 0 ? "/teste-bolo.jpg" : produto.imagemUrl} alt={produto.nome} />
              {isAdmin && (
                <label style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: 'white',
                  borderRadius: '50%',
                  padding: '0.5rem',
                  cursor: 'pointer',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                }}>
                  ✏️
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleImageUpload(produto.id, e.target.files[0]);
                      }
                    }}
                  />
                </label>
              )}
            </div>
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
