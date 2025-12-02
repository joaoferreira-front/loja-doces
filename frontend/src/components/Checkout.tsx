import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { PixPayment } from './PixPayment';

const CheckoutContainer = styled.div`
  background: var(--white);
  padding: 2rem;
  border-radius: 25px;
  max-width: 600px;
  margin: 2rem auto 6rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-family: var(--font-body);
  flex: 1;
`;

const Select = styled.select`
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-family: var(--font-body);
`;

const Button = styled.button`
  background-color: var(--primary-color);
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 30px;
  font-size: 1.1rem;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background-color: #c0757e;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMsg = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: -1rem;
`;

const SuccessMsg = styled.p`
  color: green;
  font-size: 0.9rem;
  margin-top: -1rem;
`;

const PaymentSection = styled.div`
  margin-bottom: 1.5rem;

  h4 {
    margin-bottom: 0.8rem;
    color: var(--accent-color);
    font-size: 1rem;
    font-weight: 500;
    font-family: var(--font-body);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

const PaymentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
`;

const PaymentCard = styled.button<{ $selected: boolean }>`
  background: ${props => props.$selected ? '#fff0f3' : 'var(--white)'};
  border: 2px solid ${props => props.$selected ? 'var(--primary-color)' : '#eee'};
  border-radius: 15px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: var(--font-body);
  color: var(--text-color);

  &:hover {
    border-color: var(--primary-color);
    transform: translateY(-2px);
  }

  span {
    font-size: 1.5rem;
  }
`;

// ==================================================================================
// CONFIGURAÇÕES DE ENTREGA E CONTATO
// ==================================================================================
const STORE_COORDS = { lat: -23.77335, lon: -46.59984 }; // Rua Ponta Grossa, 6, SBC
const MAX_DISTANCE_KM = 20;

export const Checkout = () => {
  const { cart, total, clearCart } = useCart();
  const { user } = useAuth();
  const { showToast } = useToast();

  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [dataEntrega, setDataEntrega] = useState('');
  const [horarioEntrega, setHorarioEntrega] = useState('');
  const [formaPagamento, setFormaPagamento] = useState('PIX');
  const [parcelas, setParcelas] = useState(1);
  const [deliveryStatus, setDeliveryStatus] = useState<'idle' | 'validating' | 'valid' | 'invalid'>('idle');
  const [distanceInfo, setDistanceInfo] = useState('');
  const [validating, setValidating] = useState(false);
  const [showPix, setShowPix] = useState(false);

  const validateAddress = async () => {
    if (!rua || !numero || !cidade || !estado) return;

    setValidating(true);
    setDeliveryStatus('validating');
    setDistanceInfo('');

    try {
      const address = `${rua}, ${numero}, ${cidade}, ${estado}, Brazil`;
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);

      if (response.data && response.data.length > 0) {
        const { lat, lon } = response.data[0];
        const distance = calculateDistance(STORE_COORDS.lat, STORE_COORDS.lon, parseFloat(lat), parseFloat(lon));

        if (distance <= MAX_DISTANCE_KM) {
          setDeliveryStatus('valid');
          setDistanceInfo(`✅ Entrega disponível! Distância: ${distance.toFixed(1)}km`);
        } else {
          setDeliveryStatus('invalid');
          setDistanceInfo(`❌ Desculpe, não entregamos nessa região. (Distância: ${distance.toFixed(1)}km)`);
        }
      } else {
        setDeliveryStatus('invalid');
        setDistanceInfo('❌ Endereço não encontrado.');
      }
    } catch (error) {
      console.error("Erro ao validar endereço:", error);
      setDeliveryStatus('invalid');
      setDistanceInfo('❌ Erro ao validar endereço.');
    } finally {
      setValidating(false);
    }
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  };

  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
  };

  const finalizeOrder = async () => {
    const pedido = {
      formaPagamento,
      parcelas: formaPagamento === 'INFINITE_PAY' ? parcelas : 1,
      dataEntrega: dataEntrega + 'T' + horarioEntrega + ':00',
      itens: cart.map(item => ({
        produtoId: item.id,
        quantidade: item.quantidadeCarrinho
      }))
    };

    try {
      await api.post('/checkout', pedido);

      let msg = `Olá! Gostaria de confirmar meu pedido na Doces G & J.\n`;
      if (user && user.nome) {
        msg += `Cliente: *${user.nome}*\n`;
      }
      msg += `--------------------------------\n`;
      cart.forEach(item => {
        msg += `${item.quantidadeCarrinho}x ${item.nome}\n`;
      });
      msg += `--------------------------------\n`;
      msg += `*Total: R$ ${total.toFixed(2)}*\n`;
      msg += `Pagamento: ${formaPagamento}`;
      if (formaPagamento === 'INFINITE_PAY') {
        msg += ` (${parcelas}x de R$ ${(total / parcelas).toFixed(2)})`;
      }
      msg += `\n`;
      msg += `Entrega: ${dataEntrega} às ${horarioEntrega}\n`;
      msg += `Endereço: ${rua}, ${numero} - ${cidade}\n`;

      if (formaPagamento === 'INFINITE_PAY') {
        msg += `\n*Link de Pagamento:* (Aguardando Link)\n`;
      }

      if (formaPagamento === 'PIX') {
        msg += `\n*Pagamento via PIX realizado!*\n`;
      }

      const whatsappUrl = `https://wa.me/5511976299225?text=${encodeURIComponent(msg)}`;
      window.open(whatsappUrl, '_blank');

      clearCart();
      showToast('Pedido realizado com sucesso! Redirecionando para o WhatsApp...', 'success');
      setTimeout(() => {
        window.location.href = '/meus-pedidos';
      }, 2000);
    } catch (error: any) {
      console.error('Erro ao finalizar pedido:', error);
      if (error.response && error.response.data && typeof error.response.data === 'string') {
        showToast(`Erro: ${error.response.data}`, 'error');
      } else if (error.response && error.response.data && error.response.data.message) {
        showToast(`Erro: ${error.response.data.message}`, 'error');
      } else {
        showToast('Erro ao finalizar pedido. Tente novamente.', 'error');
      }
    }
  };

  const handlePixConfirm = async () => {
    await finalizeOrder();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (deliveryStatus !== 'valid') {
      showToast('Por favor, valide seu endereço de entrega primeiro.', 'error');
      return;
    }

    // Validação de Horário de Funcionamento
    const now = new Date();
    const day = now.getDay(); // 0 = Domingo, 1 = Segunda, ...
    const hour = now.getHours();
    const isOpen = day !== 0 && hour >= 9 && hour < 18;

    const isToday = dataEntrega === now.toISOString().split('T')[0];

    if (isToday && !isOpen) {
      showToast('🛑 Estamos fechados agora! (Seg-Sáb 09h-18h). Por favor, agende para outro dia.', 'error');
      return;
    }

    // Validação de Horário (Mínimo 2h)
    const selectedDate = new Date(dataEntrega + 'T' + horarioEntrega);
    const minTime = new Date(now.getTime() + 2 * 60 * 60 * 1000); // Agora + 2 horas

    if (selectedDate < minTime) {
      showToast('⚠️ O agendamento deve ser feito com no mínimo 2 horas de antecedência.', 'error');
      return;
    }

    if (formaPagamento === 'PIX') {
      setShowPix(true);
      return;
    }

    await finalizeOrder();
  };

  if (cart.length === 0) {
    return (
      <CheckoutContainer style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h2 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>Seu carrinho está vazio 😢</h2>
        <p style={{ color: '#666', marginBottom: '2rem' }}>Que tal adicionar alguns doces deliciosos?</p>
        <Link to="/menu" style={{
          display: 'inline-block',
          backgroundColor: 'var(--primary-color)',
          color: 'white',
          padding: '1rem 2rem',
          borderRadius: '30px',
          textDecoration: 'none',
          fontWeight: 'bold',
          transition: 'background 0.3s'
        }}>
          Voltar para o Cardápio
        </Link>
      </CheckoutContainer>
    );
  }

  if (showPix) {
    return (
      <PixPayment
        total={total}
        onConfirm={handlePixConfirm}
        onCancel={() => setShowPix(false)}
      />
    );
  }

  return (
    <CheckoutContainer>
      <h2>Finalizar Compra</h2>
      <Form onSubmit={handleSubmit}>
        <h3>Endereço de Entrega</h3>
        <InputGroup>
          <Input
            placeholder="Rua"
            value={rua}
            onChange={e => setRua(e.target.value)}
            onBlur={validateAddress}
            required
          />
          <Input
            placeholder="Número"
            value={numero}
            onChange={e => setNumero(e.target.value)}
            onBlur={validateAddress}
            style={{ width: '80px', flex: 'none' }}
            required
          />
        </InputGroup>
        <InputGroup>
          <Input
            placeholder="Cidade"
            value={cidade}
            onChange={e => setCidade(e.target.value)}
            onBlur={validateAddress}
            required
          />
          <Input
            placeholder="Estado"
            value={estado}
            onChange={e => setEstado(e.target.value)}
            style={{ width: '60px', flex: 'none' }}
            required
          />
        </InputGroup>

        {validating && <p>Calculando entrega...</p>}
        {deliveryStatus === 'valid' && <SuccessMsg>{distanceInfo}</SuccessMsg>}
        {deliveryStatus === 'invalid' && <ErrorMsg>{distanceInfo}</ErrorMsg>}

        <h3>Dados do Pedido</h3>
        <label>
          Data de Entrega:
          <Input
            type="date"
            required
            value={dataEntrega}
            min={new Date().toISOString().split('T')[0]}
            onChange={e => setDataEntrega(e.target.value)}
          />
          {dataEntrega === new Date().toISOString().split('T')[0] && (
            <p style={{ color: 'var(--primary-color)', fontSize: '0.9rem', marginTop: '0.5rem', fontWeight: 'bold' }}>
              ⏱️ Previsão de entrega: 60 a 80 minutos
            </p>
          )}
        </label>

        <label>
          Horário de Entrega:
          <Input
            type="time"
            required
            value={horarioEntrega}
            onChange={e => setHorarioEntrega(e.target.value)}
          />
        </label>

        <h3 style={{ fontFamily: "var(--font-body)", color: 'var(--accent-color)', textTransform: 'uppercase', fontSize: '1.1rem', fontWeight: 500 }}>Forma de Pagamento</h3>

        <PaymentSection>
          <h4>Pagar Online</h4>
          <PaymentGrid>
            <PaymentCard
              type="button"
              $selected={formaPagamento === 'PIX'}
              onClick={() => setFormaPagamento('PIX')}
            >
              <span>💠</span>
              PIX (Instantâneo)
            </PaymentCard>
            <PaymentCard
              type="button"
              $selected={formaPagamento === 'INFINITE_PAY'}
              onClick={() => setFormaPagamento('INFINITE_PAY')}
            >
              <span>💳</span>
              Cartão de Crédito
            </PaymentCard>
          </PaymentGrid>
        </PaymentSection>

        <PaymentSection>
          <h4>Pagar na Entrega</h4>
          <PaymentGrid>
            <PaymentCard
              type="button"
              $selected={formaPagamento === 'DINHEIRO'}
              onClick={() => setFormaPagamento('DINHEIRO')}
            >
              <span>💵</span>
              Dinheiro
            </PaymentCard>
            <PaymentCard
              type="button"
              $selected={formaPagamento === 'DEBITO'}
              onClick={() => setFormaPagamento('DEBITO')}
            >
              <span>💳</span>
              Débito (Maquininha)
            </PaymentCard>
            <PaymentCard
              type="button"
              $selected={formaPagamento === 'CREDITO'}
              onClick={() => setFormaPagamento('CREDITO')}
            >
              <span>💳</span>
              Crédito (Maquininha)
            </PaymentCard>
          </PaymentGrid>
        </PaymentSection>

        {formaPagamento === 'INFINITE_PAY' && (
          <>
            <label>
              Parcelas (Mínimo R$ 30,00 por parcela):
              <Select
                value={parcelas}
                onChange={e => setParcelas(Number(e.target.value))}
              >
                {Array.from({ length: Math.max(1, Math.floor(total / 30)) }, (_, i) => i + 1).map(num => (
                  <option key={num} value={num}>
                    {num}x de R$ {(total / num).toFixed(2)}
                  </option>
                ))}
              </Select>
            </label>
            <div style={{ padding: '1rem', background: '#f0f0f0', borderRadius: '10px', fontSize: '0.9rem', marginTop: '1rem' }}>
              ℹ️ Você receberá um link seguro no WhatsApp para concluir o pagamento em {parcelas}x.
            </div>
          </>
        )}

        <Button type="submit" disabled={deliveryStatus !== 'valid'}>
          Confirmar Pedido
        </Button>
      </Form>
    </CheckoutContainer>
  );
};
