import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Sidebar } from '../../components/Sidebar/index.tsx';
import { Button } from '../../components/Button/index.tsx';
import { Input } from '../../components/Input/index.tsx';
import './styles.css';

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  status: string;
  total: number;
  date: string;
  customer: { name: string };
  items: OrderItem[];
}

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const sellerData = JSON.parse(localStorage.getItem('seller_user') || '{}');
  const shopId = sellerData.shop?.id;

  // 1. Carregar pedidos da API
  const fetchOrders = async () => {
    if (!shopId) return;
    try {
      const response = await axios.get(`http://localhost:3333/seller/orders/${shopId}`);
      setOrders(response.data);
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [shopId]);

  // 2. Ação de Enviar Pedido
  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      await axios.patch(`http://localhost:3333/orders/${orderId}/status`, {
        status: newStatus
      });
      // Atualiza a lista localmente após o sucesso
      fetchOrders();
    } catch (error) {
      alert("Erro ao atualizar o pedido.");
    }
  };

  const tabs = ['Todos', 'A Enviar', 'Enviando', 'Concluído', 'Cancelado'];

  const filteredOrders = orders.filter((order) => {
    const matchesTab = activeTab === 'Todos' || order.status === activeTab;
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer?.name.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <div className="orders-layout">
      <Sidebar />

      <main className="orders-content">
        <header className="page-header">
          <h2>Meus Pedidos</h2>
        </header>

        <div className="orders-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`tab-button ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="orders-filter">
          <div className="search-box">
            <Input
              placeholder="Buscar por ID ou Nome do Comprador"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ marginBottom: 0 }}
            />
          </div>
        </div>

        <div className="orders-list">
          {loading ? (
            <div className="no-orders">Carregando pedidos...</div>
          ) : filteredOrders.length === 0 ? (
            <div className="no-orders">Nenhum pedido encontrado.</div>
          ) : (
            filteredOrders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="card-header">
                  <div className="user-info">
                    <div className="avatar-small">
                      {order.customer?.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="username">{order.customer?.name}</span>
                  </div>
                  <div className="order-id">ID: {order.id.substring(0, 8)}...</div>
                </div>

                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <img src={item.image} alt={item.name} className="item-image" />
                    <div className="item-details">
                      <span className="item-name">{item.name}</span>
                      <span className="item-qty">x{item.quantity}</span>
                    </div>
                    <div className="item-price">R$ {item.price.toFixed(2)}</div>
                  </div>
                ))}

                <div className="card-footer">
                  <div className="order-total">
                    Total: <span>R$ {order.total.toFixed(2)}</span>
                  </div>

                  <div className="order-actions">
                    <span className={`status-label ${order.status.replace(' ', '-').toLowerCase()}`}>
                      {order.status}
                    </span>

                    {order.status === 'A Enviar' && (
                      <Button
                        onClick={() => handleUpdateStatus(order.id, 'Enviando')}
                        style={{ width: 'auto', padding: '8px 20px' }}
                      >
                        Enviar Pedido
                      </Button>
                    )}

                    {order.status === 'Enviando' && (
                      <Button
                        variant="social"
                        onClick={() => handleUpdateStatus(order.id, 'Concluído')}
                        style={{ width: 'auto', padding: '8px 20px' }}
                      >
                        Marcar como Entregue
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}