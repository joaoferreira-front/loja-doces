import { ProductList } from '../components/ProductList';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding-top: 2rem;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 3rem;
  margin-bottom: 1rem;
`;

export const Menu = () => {
    return (
        <PageContainer>
            <Title>Nosso Cardápio</Title>
            <ProductList />
        </PageContainer>
    );
};
