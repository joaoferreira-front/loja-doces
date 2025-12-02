import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 4rem auto;
  padding: 2rem;
  background: var(--white);
  border-radius: 25px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
`;

const InfoGroup = styled.div`
  margin-bottom: 2rem;
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: var(--primary-color);
  }
  
  p {
    font-size: 1.1rem;
    color: var(--text-color);
  }
`;

export const Contact = () => {
    return (
        <Container>
            <Title>Fale Conosco</Title>

            <InfoGroup>
                <h3>WhatsApp</h3>
                <p>(11) 95173-7912</p>
            </InfoGroup>

            <InfoGroup>
                <h3>Endereço</h3>
                <p>Rua dos Doces Sonhos, 123<br />Bairro da Felicidade - São Paulo, SP</p>
            </InfoGroup>

            <InfoGroup>
                <h3>Horário de Funcionamento</h3>
                <p>Segunda a Sábado: 09h às 18h<br />Domingo: Fechado</p>
            </InfoGroup>

            <InfoGroup>
                <h3>Email</h3>
                <p>contato@docesgej.com.br</p>
            </InfoGroup>
        </Container>
    );
};
