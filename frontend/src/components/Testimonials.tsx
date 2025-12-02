import styled from 'styled-components';
import { ScrollReveal } from './ScrollReveal';

const Section = styled.section`
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #fff5f6 0%, #fff 100%);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 3rem;
  font-family: var(--font-heading);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

const ReviewCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  transition: transform 0.3s ease;
  position: relative;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
  }

  &::before {
    content: '"';
    position: absolute;
    top: 10px;
    left: 20px;
    font-size: 4rem;
    color: var(--gold-color);
    opacity: 0.2;
    font-family: serif;
  }
`;

const Stars = styled.div`
  color: #FFD700;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const Text = styled.p`
  color: #555;
  font-style: italic;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Avatar = styled.div`
  width: 50px;
  height: 50px;
  background: #eee;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: var(--primary-color);
  font-size: 1.2rem;
`;

const Name = styled.div`
  font-weight: 600;
  color: #333;
`;

const reviews = [
  {
    name: "Mariana S.",
    initial: "M",
    text: "Simplesmente divino! O bolo de pote de Leite Ninho com Nutella é uma experiência de outro mundo. A apresentação é impecável e o sabor inigualável.",
  },
  {
    name: "Roberto A.",
    initial: "R",
    text: "Encomendei para o aniversário da minha esposa e foi um sucesso absoluto. A entrega foi super rápida e os doces chegaram fresquinhos. Recomendo de olhos fechados!",
  },
  {
    name: "Carla M.",
    initial: "C",
    text: "A qualidade dos ingredientes é perceptível na primeira mordida. Não é aquele doce enjoativo, é equilibrado e sofisticado. Virei cliente fiel!",
  },
  {
    name: "Felipe G.",
    initial: "F",
    text: "O melhor atendimento que já tive. Além dos doces serem maravilhosos, o cuidado com a embalagem e a pontualidade na entrega me surpreenderam positivamente.",
  },
  {
    name: "Margarete C.",
    initial: "M",
    text: "Os doces são obras de arte! O sabor é autêntico e a textura perfeita. Fiquei encantada com cada detalhe, desde o pedido até a última mordida.",
  }
];

export const Testimonials = () => {
  return (
    <Section>
      <Container>
        <ScrollReveal>
          <Title>O que dizem nossos clientes ✨</Title>
        </ScrollReveal>
        <Grid>
          {reviews.map((review, index) => (
            <ScrollReveal key={index} delay={`${index * 0.1}s`} style={{ height: '100%' }}>
              <ReviewCard>
                <Stars>★★★★★</Stars>
                <Text>{review.text}</Text>
                <Author>
                  <Avatar>{review.initial}</Avatar>
                  <Name>{review.name}</Name>
                </Author>
              </ReviewCard>
            </ScrollReveal>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};
