import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

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

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
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
  
  a {
    font-weight: 600;
    color: var(--accent-color);
    transition: color 0.3s;
    
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
  color: var(--accent-color); /* Ensure icon color matches links */
  text-decoration: none; /* Remove underline from Link */

  &:hover {
    color: var(--primary-color); /* Hover effect for icon */
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

import { useAuth } from '../context/AuthContext';

// ... (inside component)
export const Header = () => {
  const { cart } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const itemCount = cart.reduce((acc, item) => acc + item.quantidadeCarrinho, 0);

  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">
          <img src="/logo.jpg" alt="Doces G & J Logo" />
          <span>Doces G & J</span>
        </Logo>
        <NavLinks>
          <Link to="/">Home</Link>
          <Link to="/menu">Cardápio</Link>
          <Link to="/contato">Contato</Link>

          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Link to="/meus-pedidos" style={{ color: 'var(--accent-color)', fontWeight: '600' }}>
                Meus Pedidos
              </Link>
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
      </Nav>
    </HeaderContainer>
  );
};
