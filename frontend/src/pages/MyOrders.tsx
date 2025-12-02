import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const Title = styled.h2`
  color: var(--primary-color);
  margin-bottom: 2rem;
`;

const OrderCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
  background-color: ${props =>
        props.status === 'CONFIRMADO' ? '#e6fffa' :
            props.status === 'CANCELADO' ? '#fff5f5' : '#ebf8ff'};
  color: ${props =>
        props.status === 'CONFIRMADO' ? '#2c7a7b' :
            props.status === 'CANCELADO' ? '#c53030' : '#2b6cb0'};
`;

const ItemList = styled.ul`
  list-style: none;
  padding: 0;
`;

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  color: #555;
`;

interface Pedido {
    id: number;
    dataPedido: string;
    status: string;
    valorTotal: number;
    itens: Array<{
        produto: { nome: string };
        quantidade: number;
        precoUnitario: number;
    }>;
}

export const MyOrders = () => {
    const [orders, setOrders] = useState<Pedido[]>([]);
    const { showToast } = useToast();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get('/meus-pedidos');
                if (Array.isArray(response.data)) {
                    setOrders(response.data);
                } else {
                    console.error('Resposta inválida da API:', response.data);
                    setOrders([]);
                }
            } catch (error) {
                console.error(error);
                // If 401, probably not logged in
                // showToast('Faça login para ver seus pedidos', 'info');
            }
        };

        fetchOrders();
    }, [showToast]);

    if (orders.length === 0) {
        return (
            <Container>
                <Title>Meus Pedidos</Title>
                <p>Você ainda não fez nenhum pedido.</p>
            </Container>
        );
    }

    return (
        <Container>
            <Title>Meus Pedidos</Title>
            {orders.map(order => (
                <OrderCard key={order.id}>
                    <OrderHeader>
                        <div>
                            <strong>Pedido #{order.id}</strong>
                            <div style={{ fontSize: '0.9rem', color: '#888' }}>
                                {new Date(order.dataPedido).toLocaleDateString()} às {new Date(order.dataPedido).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                        <StatusBadge status={order.status}>{order.status.replace(/_/g, ' ')}</StatusBadge>
                    </OrderHeader>

                    {/* Timeline Visualization */}
                    {order.status !== 'CANCELADO' && (
                        <div style={{ margin: '2rem 0', position: 'relative', padding: '0 1rem' }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                position: 'relative',
                                zIndex: 1
                            }}>
                                {[
                                    { status: 'PENDENTE', icon: '📝', label: 'Recebido' },
                                    { status: 'CONFIRMADO', icon: '✅', label: 'Confirmado' },
                                    { status: 'EM_PREPARO', icon: '👨‍🍳', label: 'Preparando' },
                                    { status: 'SAIU_PARA_ENTREGA', icon: '🛵', label: 'A Caminho' },
                                    { status: 'ENTREGUE', icon: '🏠', label: 'Entregue' }
                                ].map((step) => {
                                    // Lógica para determinar o estado de cada etapa do rastreamento
                                    const statusOrder = ['PENDENTE', 'CONFIRMADO', 'EM_PREPARO', 'SAIU_PARA_ENTREGA', 'ENTREGUE'];
                                    const currentIdx = statusOrder.indexOf(order.status);
                                    const stepIdx = statusOrder.indexOf(step.status);

                                    // Verifica se a etapa já foi concluída
                                    const isCompleted = currentIdx >= stepIdx;
                                    // Verifica se é a etapa atual
                                    const isCurrent = currentIdx === stepIdx;

                                    return (
                                        <div key={step.status} style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            flex: 1,
                                            opacity: isCompleted ? 1 : 0.4,
                                            transition: 'all 0.3s'
                                        }}>
                                            <div style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '50%',
                                                backgroundColor: isCompleted ? 'var(--primary-color)' : '#eee',
                                                color: isCompleted ? 'white' : '#888',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '1.2rem',
                                                marginBottom: '0.5rem',
                                                boxShadow: isCurrent ? '0 0 0 4px rgba(212, 140, 149, 0.3)' : 'none',
                                                zIndex: 2
                                            }}>
                                                {step.icon}
                                            </div>
                                            <span style={{
                                                fontSize: '0.8rem',
                                                fontWeight: isCurrent ? 'bold' : 'normal',
                                                color: isCompleted ? 'var(--primary-color)' : '#888',
                                                textAlign: 'center'
                                            }}>
                                                {step.label}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                            {/* Progress Bar Background */}
                            <div style={{
                                position: 'absolute',
                                top: '20px',
                                left: '10%',
                                right: '10%',
                                height: '4px',
                                backgroundColor: '#eee',
                                zIndex: 0
                            }}>
                                {/* Active Progress */}
                                <div style={{
                                    height: '100%',
                                    backgroundColor: 'var(--primary-color)',
                                    width: `${Math.min(100, (['PENDENTE', 'CONFIRMADO', 'EM_PREPARO', 'SAIU_PARA_ENTREGA', 'ENTREGUE'].indexOf(order.status) / 4) * 100)}%`,
                                    transition: 'width 0.5s ease-in-out'
                                }} />
                            </div>
                        </div>
                    )}

                    <ItemList>
                        {order.itens.map((item, idx) => (
                            <Item key={idx}>
                                <span>{item.quantidade}x {item.produto.nome}</span>
                                <span>R$ {(item.precoUnitario * item.quantidade).toFixed(2)}</span>
                            </Item>
                        ))}
                    </ItemList>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                        {order.status === 'PENDENTE' && (
                            <button
                                onClick={async () => {
                                    if (window.confirm('Tem certeza que deseja cancelar este pedido?')) {
                                        try {
                                            await api.post(`/meus-pedidos/${order.id}/cancelar`);
                                            showToast('Pedido cancelado com sucesso!', 'success');
                                            const response = await api.get('/meus-pedidos');
                                            if (Array.isArray(response.data)) setOrders(response.data);
                                        } catch (error) {
                                            showToast('Erro ao cancelar pedido.', 'error');
                                        }
                                    }
                                }}
                                style={{
                                    padding: '0.5rem 1rem',
                                    backgroundColor: '#fff',
                                    border: '1px solid #e53e3e',
                                    color: '#e53e3e',
                                    borderRadius: '20px',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem',
                                    transition: 'all 0.2s'
                                }}
                            >
                                Cancelar Pedido
                            </button>
                        )}
                        <div style={{ fontWeight: 'bold', fontSize: '1.2rem', marginLeft: 'auto', color: 'var(--primary-color)' }}>
                            Total: R$ {order.valorTotal.toFixed(2)}
                        </div>
                    </div>
                </OrderCard>
            ))}
        </Container>
    );
};
