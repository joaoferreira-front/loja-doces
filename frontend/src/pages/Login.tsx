import { useState } from 'react';
import styled from 'styled-components';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Container = styled.div`
  max-width: 400px;
  margin: 4rem auto;
  padding: 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: var(--primary-color);
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 1rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;

  &:hover {
    background-color: #b02a6b;
  }
`;



const PasswordWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 15px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  transition: all 0.3s;
  z-index: 10;

  &:hover {
    color: var(--primary-color);
    transform: scale(1.1);
  }
`;

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { showToast } = useToast();
  const { checkAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const params = new URLSearchParams();
      params.append('username', username);
      params.append('password', password);
      if (rememberMe) {
        params.append('remember-me', 'true');
      }

      const response = await api.post('/login', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });

      await checkAuth();
      showToast('Login realizado com sucesso!', 'success');

      if (response.data && response.data.redirectUrl) {
        if (response.data.redirectUrl.includes('admin')) {
          if (window.location.hostname.includes('github.io') || window.location.hostname.includes('onrender.com')) {
            window.location.href = 'https://doces-g-and-j.onrender.com/admin';
          } else {
            window.location.href = 'http://localhost:8082/admin';
          }
        } else if (response.data.redirectUrl === '/') {
          navigate('/');
        } else {
          window.location.href = response.data.redirectUrl;
        }
      } else {
        navigate('/meus-pedidos');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.response && error.response.data && error.response.data.message) {
        showToast(`Erro: ${error.response.data.message}`, 'error');
      } else {
        showToast('Erro ao fazer login. Verifique suas credenciais.', 'error');
      }
    }
  };



  return (
    <Container>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--primary-color)', fontSize: '2rem', marginBottom: '0.5rem' }}>Bem-vindo à Doce Sabor! 🍬</h1>
        <p style={{ color: '#666', lineHeight: '1.6' }}>
          Faça login para acompanhar seus pedidos, salvar endereços e aproveitar ofertas exclusivas.
          <br />
          Sua doçura favorita está a um clique de distância!
        </p>
      </div>

      <Title>Acesse sua Conta</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Email"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <PasswordWrapper>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: '100%', paddingRight: '45px' }}
          />
          <ToggleButton type="button" onClick={() => setShowPassword(!showPassword)} title={showPassword ? "Ocultar senha" : "Ver senha"}>
            {showPassword ? '🙈' : '👁️'}
          </ToggleButton>
        </PasswordWrapper>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: '#666' }}>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={e => setRememberMe(e.target.checked)}
          />
          Manter conectado
        </label>
        <Button type="submit">Entrar</Button>
      </Form>

      <div style={{ textAlign: 'center', margin: '1rem 0', color: '#888' }}>ou</div>

      {/* 
      <GoogleButton type="button" onClick={handleGoogleLogin}>
        Entrar com Google
      </GoogleButton> 
      */}

      <p style={{ textAlign: 'center', marginTop: '1.5rem' }}>
        Não tem conta? <Link to="/cadastro" style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>Cadastre-se</Link>
      </p>

      <div style={{ borderTop: '1px solid #eee', marginTop: '2rem', paddingTop: '1.5rem', textAlign: 'center' }}>
        <p style={{ marginBottom: '1rem', color: '#666' }}>Só quer dar uma olhadinha?</p>
        <Link to="/loja" style={{
          display: 'inline-block',
          padding: '0.8rem 2rem',
          border: '2px solid var(--primary-color)',
          borderRadius: '30px',
          color: 'var(--primary-color)',
          textDecoration: 'none',
          fontWeight: 'bold',
          transition: 'all 0.3s'
        }}>
          Entrar sem Logar
        </Link>
      </div>
    </Container>
  );
};
