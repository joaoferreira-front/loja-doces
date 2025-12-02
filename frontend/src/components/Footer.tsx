import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: var(--white);
  padding: 0.5rem 0;
  text-align: center;
  border-top: 1px solid #eee;
  margin-top: auto;
`;

const Copyright = styled.p`
  color: #888;
  font-size: 0.75rem;
  margin-bottom: 0.2rem;
`;

const Credits = styled.p`
  color: #ccc;
  font-size: 0.7rem;
  
  a {
    color: #ccc;
    text-decoration: none;
    transition: color 0.3s;
    
    &:hover {
      color: var(--primary-color);
    }
  }
`;

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <Copyright>
        &copy; {currentYear} Doces G & J. Todos os direitos reservados.
      </Copyright>
      <Credits>
        Created by: <a href="#" onClick={(e) => e.preventDefault()}>João.dev</a>
      </Credits>
    </FooterContainer>
  );
};
