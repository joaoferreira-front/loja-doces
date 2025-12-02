import styled from 'styled-components';
import { useCart } from '../context/CartContext';

const CartContainer = styled.div`
  background: var(--white);
  padding: 2rem;
  border-radius: 25px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  max-width: 800px;
  margin: 4rem auto;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const Total = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  text-align: right;
  margin-top: 2rem;
  color: var(--accent-color);
`;

const Button = styled.button`
  background-color: #ff5252;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  
  &:hover {
    background-color: #ff1744;
  }
`;

export const Cart = () => {
    const { cart, removeFromCart, total } = useCart();

    if (cart.length === 0) return null;

    return (
        <CartContainer>
            <h2>Seu Carrinho</h2>
            {cart.map(item => (
                <CartItem key={item.id}>
                    <div>
                        <h4>{item.nome}</h4>
                        <p>{item.quantidadeCarrinho}x R$ {item.preco.toFixed(2)}</p>
                    </div>
                    <Button onClick={() => removeFromCart(item.id)}>Remover</Button>
                </CartItem>
            ))}
            <Total>Total: R$ {total.toFixed(2)}</Total>
        </CartContainer>
    );
};
