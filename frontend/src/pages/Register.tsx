import { useState } from 'react';
import styled from 'styled-components';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';
import { useNavigate, Link } from 'react-router-dom';

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

export const Register = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const { showToast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/register', { nome, email, senha });

            showToast('Cadastro realizado! Faça login.', 'success');
            navigate('/login');
        } catch (error: any) {
            let errorMessage = 'Erro ao cadastrar. Tente outro email.';

            if (error.response?.data) {
                if (typeof error.response.data === 'string') {
                    errorMessage = error.response.data;
                } else if (error.response.data.message) {
                    errorMessage = error.response.data.message;
                } else {
                    errorMessage = JSON.stringify(error.response.data);
                }
            }

            showToast(errorMessage, 'error');
        }
    };

    return (
        <Container>
            <Title>Cadastro</Title>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="Nome Completo"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    required
                />
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <Input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                    required
                />
                <Button type="submit">Cadastrar</Button>
            </Form>

            <p style={{ textAlign: 'center', marginTop: '1rem' }}>
                Já tem conta? <Link to="/login">Faça Login</Link>
            </p>
        </Container>
    );
};
