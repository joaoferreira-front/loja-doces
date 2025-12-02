import styled from 'styled-components';

const FloatButton = styled.a`
  position: fixed;
  width: 60px;
  height: 60px;
  bottom: 40px;
  right: 40px;
  background-color: #25d366;
  color: #FFF;
  border-radius: 50px;
  text-align: center;
  font-size: 30px;
  box-shadow: 2px 2px 3px #999;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.1);
    background-color: #20ba5a;
  }

  img {
    width: 35px;
    height: 35px;
  }
`;

export const WhatsAppButton = () => {
    return (
        <FloatButton
            href="https://wa.me/5511951737912"
            target="_blank"
            rel="noopener noreferrer"
            title="Fale conosco no WhatsApp"
        >
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" />
        </FloatButton>
    );
};
