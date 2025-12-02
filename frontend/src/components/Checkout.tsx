import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

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

// ==================================================================================
// CONFIGURAÇÕES DE ENTREGA E CONTATO
// ==================================================================================
const STORE_COORDS = { lat: -23.77335, lon: -46.59984 }; // Rua Ponta Grossa, 6, SBC
const MAX_DISTANCE_KM = 20;

export const Checkout = () => {
  const { cart, total, clearCart } = useCart();
  const { showToast } = useToast();
  const [dataEntrega, setDataEntrega] = useState('');
  const [formaPagamento, setFormaPagamento] = useState('PIX');

  // Address State
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [cidade, setCidade] = useState('São Bernardo do Campo');
  const [estado, setEstado] = useState('SP');

  const [validating, setValidating] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
  const [distanceInfo, setDistanceInfo] = useState('');

  // Haversine Formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
  };

  const validateAddress = async () => {
    if (!rua || !numero || !cidade) return;

    setValidating(true);
    setDeliveryStatus('idle');
    setDistanceInfo('');

    try {
      const query = `${rua}, ${numero}, ${cidade}, ${estado}, Brazil`;
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);

      if (response.data && response.data.length > 0) {
        const { lat, lon } = response.data[0];
        const dist = calculateDistance(STORE_COORDS.lat, STORE_COORDS.lon, parseFloat(lat), parseFloat(lon));

        if (dist <= MAX_DISTANCE_KM) {
          setDeliveryStatus('valid');
          setDistanceInfo(`Entrega disponível! Distância: ${dist.toFixed(1)}km`);
        } else {
          setDeliveryStatus('invalid');
          setDistanceInfo(`Desculpe, estamos a ${dist.toFixed(1)}km. Entregamos apenas num raio de 20km.`);
        }
      } else {
        setDistanceInfo('Endereço não encontrado. Verifique os dados.');
      }
    } catch (error) {
      console.error("Erro na geocodificação", error);
      setDistanceInfo('Erro ao validar endereço.');
    } finally {
      setValidating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (deliveryStatus !== 'valid') {
      showToast('Por favor, valide seu endereço de entrega primeiro.', 'error');
      return;
    }

    const pedido = {
      formaPagamento,
      dataEntrega: dataEntrega + 'T10:00:00',
      itens: cart.map(item => ({
        produtoId: item.id,
        quantidade: item.quantidadeCarrinho
      }))
    };

    try {
      await axios.post('http://localhost:8080/api/checkout', pedido);

      let msg = `Olá! Gostaria de confirmar meu pedido na Doces G & J.\n`;
      msg += `--------------------------------\n`;
      cart.forEach(item => {
        msg += `${item.quantidadeCarrinho}x ${item.nome}\n`;
      });
      msg += `--------------------------------\n`;
      msg += `*Total: R$ ${total.toFixed(2)}*\n`;
      msg += `Pagamento: ${formaPagamento}\n`;
      msg += `Entrega: ${dataEntrega}\n`;
      msg += `Endereço: ${rua}, ${numero} - ${cidade}\n`;

      if (formaPagamento === 'INFINITE_PAY') {
        msg += `\n*Link de Pagamento InfinitePay:* (Aguardando Link)\n`;
      }

      const whatsappUrl = `https://wa.me/5511951737912?text=${encodeURIComponent(msg)}`;
      window.open(whatsappUrl, '_blank');

      clearCart();
      showToast('Pedido realizado com sucesso! Redirecionando para o WhatsApp...', 'success');
    } catch (error: any) {
      console.error('Erro ao finalizar pedido:', error);
      // Mostra a mensagem exata do backend (ex: "Estoque insuficiente")
      if (error.response && error.response.data && typeof error.response.data === 'string') {
        showToast(`Erro: ${error.response.data}`, 'error');
      } else if (error.response && error.response.data && error.response.data.message) {
        showToast(`Erro: ${error.response.data.message}`, 'error');
      } else {
        showToast('Erro ao finalizar pedido. Tente novamente.', 'error');
      }
    }
  };

  if (cart.length === 0) return null;

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
            onChange={e => setDataEntrega(e.target.value)}
          />
        </label>

        <label>
          Forma de Pagamento:
          <Select
            value={formaPagamento}
            onChange={e => setFormaPagamento(e.target.value)}
          >
            <option value="PIX">PIX</option>
            <option value="INFINITE_PAY">InfinitePay (Cartão)</option>
            <option value="DINHEIRO">Dinheiro</option>
          </Select>
        </label>

        {formaPagamento === 'INFINITE_PAY' && (
          <div style={{ padding: '1rem', background: '#f0f0f0', borderRadius: '10px', fontSize: '0.9rem' }}>
            ℹ️ Você receberá um link seguro da InfinitePay no WhatsApp para concluir o pagamento.
          </div>
        )}

        <Button type="submit" disabled={deliveryStatus !== 'valid'}>
          Confirmar Pedido
        </Button>
      </Form>
    </CheckoutContainer>
  );
};
