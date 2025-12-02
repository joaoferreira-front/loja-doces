import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const HeaderContainer = styled.header`
  background-color: var(--white);
  padding: 1rem 2rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  
  img {
    height: 60px;
    border-radius: 50%;
  }

  span {
    font-family: var(--font-heading);
    font-size: 1.8rem;
    color: var(--primary-color);
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
  
  a {
    font-weight: 600;
    color: var(--accent-color);
    transition: color 0.3s;
    text-decoration: none;
    
    &:hover {
      color: var(--primary-color);
    }
  }
`;

const MobileMenuIcon = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: var(--primary-color);

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileNav = styled.div<{ $isOpen: boolean }>`
  display: none;
  flex-basis: 100%;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem 0;
  border-top: 1px solid #eee;
  margin-top: 1rem;
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 768px) {
    display: ${props => props.$isOpen ? 'flex' : 'none'};
  }

  a {
    color: var(--accent-color);
    text-decoration: none;
    font-weight: 600;
    font-size: 1.2rem;
    
    &:hover {
      color: var(--primary-color);
    }
  }
`;

const CartIcon = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-color);
  text-decoration: none;

  &:hover {
    color: var(--primary-color);
  }
  
  span {
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: var(--primary-color);
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
`;

export const Header = () => {
  const { cart } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const itemCount = cart.reduce((acc, item) => acc + item.quantidadeCarrinho, 0);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">
          <img src="/logo.jpg" alt="Doces G & J Logo" />
          <span>Doces G & J</span>
        </Logo>

        <MobileMenuIcon onClick={toggleMenu} aria-label="Menu">
          {isMobileMenuOpen ? '✕' : '☰'}
        </MobileMenuIcon>

        {/* Desktop Menu */}
        <NavLinks>
          <Link to="/">Home</Link>
          <Link to="/menu">Cardápio</Link>
          <Link to="/contato">Contato</Link>

          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Link to="/meus-pedidos">Meus Pedidos</Link>
              <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>
                Olá, {user?.nome?.split(' ')[0]}
              </span>
              <button
                onClick={logout}
                style={{
                  background: 'none',
                  border: '1px solid var(--primary-color)',
                  color: 'var(--primary-color)',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                Sair
              </button>
            </div>
          ) : (
            <Link to="/login" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>Login</Link>
          )}

          <CartIcon to="/carrinho" title="Ver Carrinho">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {itemCount > 0 && <span>{itemCount}</span>}
          </CartIcon>
        </NavLinks>

        {/* Mobile Menu */}
        <MobileNav $isOpen={isMobileMenuOpen}>
          <Link to="/" onClick={toggleMenu}>Home</Link>
          <Link to="/menu" onClick={toggleMenu}>Cardápio</Link>
          <Link to="/contato" onClick={toggleMenu}>Contato</Link>

          {isAuthenticated ? (
            <>
              <Link to="/meus-pedidos" onClick={toggleMenu}>Meus Pedidos</Link>
              <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>
                Olá, {user?.nome?.split(' ')[0]}
              </span>
              <button
                onClick={() => { logout(); toggleMenu(); }}
                style={{
                  background: 'none',
                  border: '1px solid var(--primary-color)',
                  color: 'var(--primary-color)',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                Sair
              </button>
            </>
          ) : (
            <Link to="/login" onClick={toggleMenu} style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>Login</Link>
          )}

          <Link to="/carrinho" onClick={toggleMenu} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Carrinho
            <span style={{
              background: 'var(--primary-color)',
              color: 'white',
              borderRadius: '50%',
              padding: '0.1rem 0.5rem',
              fontSize: '0.8rem'
            }}>
              {itemCount}
            </span>
          </Link>
        </MobileNav>
      </Nav>
    </HeaderContainer>
  );
};
