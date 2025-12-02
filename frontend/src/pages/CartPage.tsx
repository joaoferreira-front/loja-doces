import { Cart } from '../components/Cart';
import { Checkout } from '../components/Checkout';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 3rem;
  margin-bottom: 2rem;
`;

export const CartPage = () => {
    return (
        <PageContainer>
            <Title>Finalizar Pedido</Title>
            <Cart />
            <Checkout />
        </PageContainer>
    );
};
