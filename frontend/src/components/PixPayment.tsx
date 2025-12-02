import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { QRCodeSVG } from 'qrcode.react';
import { Pix } from '../utils/pix';
import { useToast } from '../context/ToastContext';

const Container = styled.div`
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  max-width: 500px;
  margin: 0 auto;
`;

const Title = styled.h2`
  color: var(--accent-color);
  font-family: var(--font-body);
  margin-bottom: 1rem;
`;

const Timer = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: var(--primary-color);
  margin: 1.5rem 0;
  font-family: monospace;
`;

const CopyBox = styled.div`
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 10px;
  word-break: break-all;
  font-family: monospace;
  font-size: 0.85rem;
  margin: 1rem 0;
  border: 1px dashed #ccc;
  cursor: pointer;
  position: relative;

  &:hover {
    background: #eee;
  }
`;

const Button = styled.button`
  background-color: var(--primary-color);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 30px;
  font-size: 1.1rem;
  cursor: pointer;
  font-weight: 600;
  width: 100%;
  margin-top: 1rem;

  &:hover {
    background-color: #c0757e;
  }
`;

const SecondaryButton = styled.button`
  background-color: transparent;
  color: #666;
  border: 1px solid #ddd;
  margin-top: 0.5rem;
  
  &:hover {
    background-color: #f9f9f9;
    border-color: #ccc;
  }
`;

interface PixPaymentProps {
  total: number;
  onConfirm: () => void;
  onCancel: () => void;
}

// CHAVE PIX DE EXEMPLO - SUBSTITUIR PELA REAL
const PIX_KEY = '149cef56-a04f-4f49-ae8d-e882362c6850';
const MERCHANT_NAME = 'DOCES G E J';
const MERCHANT_CITY = 'SAO BERNARDO DO CAMPO';

export const PixPayment = ({ total, onConfirm, onCancel }: PixPaymentProps) => {
  const { showToast } = useToast();
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes
  const [payload, setPayload] = useState('');

  useEffect(() => {
    const pix = new Pix(PIX_KEY, MERCHANT_NAME, MERCHANT_CITY, total);
    setPayload(pix.getPayload());
  }, [total]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(payload);
    showToast('Código PIX copiado! 📋', 'success');
  };

  return (
    <Container>
      <Title>Pagamento via PIX</Title>
      <p style={{ color: '#666' }}>Escaneie o QR Code ou copie o código abaixo.</p>

      <Timer>{formatTime(timeLeft)}</Timer>

      <div style={{ background: 'white', padding: '10px', display: 'inline-block', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
        <QRCodeSVG value={payload} size={200} level="M" />
      </div>

      <CopyBox onClick={handleCopy} title="Clique para copiar">
        {payload}
        <div style={{ marginTop: '0.5rem', color: 'var(--primary-color)', fontWeight: 'bold' }}>
          📋 Clique para Copiar
        </div>
      </CopyBox>

      <Button onClick={onConfirm}>
        Já fiz o pagamento
      </Button>

      <SecondaryButton onClick={onCancel}>
        Cancelar / Voltar
      </SecondaryButton>
    </Container>
  );
};
