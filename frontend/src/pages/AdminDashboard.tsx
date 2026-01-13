import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 4rem auto;
  padding: 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  text-align: center;
`;

const Title = styled.h2`
  color: var(--primary-color);
  margin-bottom: 2rem;
`;

export const AdminDashboard = () => {
    return (
        <Container>
            <Title>Painel Administrativo</Title>
            <p>Bem-vindo, Administrador!</p>
            <p>Funcionalidades em desenvolvimento.</p>
        </Container>
    );
};
