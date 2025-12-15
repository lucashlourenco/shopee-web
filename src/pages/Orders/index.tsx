import React, { useState } from 'react';
import { Sidebar } from '../../components/Sidebar/index.tsx';
import { Button } from '../../components/Button/index.tsx';
import { Input } from '../../components/Input/index.tsx';
import { ORDERS_DATA, Order } from '../../utils/orders.ts';
import './styles.css';

export function Orders() {
  const [activeTab, setActiveTab] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  // Tabs disponíveis
  const tabs = ['Todos', 'A Enviar', 'Enviando', 'Concluído', 'Cancelado'];

  // Lógica de Filtragem
  const filteredOrders = ORDERS_DATA.filter((order) => {
    const matchesTab = activeTab === 'Todos' || order.status === activeTab;
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      order.buyerName.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTab && matchesSearch;
  });

  return (
    <div className="orders-layout">
      <Sidebar />
      
      <main className="orders-content">
        <header className="page-header">
          <h2>Meus Pedidos</h2>
        </header>

        {/* 1. Abas de Status */}
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

        {/* 2. Barra de Busca */}
        <div className="orders-filter">
          <div className="search-box">
            <Input 
              placeholder="Buscar por ID do Pedido ou Nome do Comprador" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ marginBottom: 0 }} // Remove margem padrão do Input
            />
            {/* Botão de busca simbólico */}
            <Button style={{ width: '100px', marginLeft: '10px' }}>Buscar</Button>
          </div>
        </div>

        {/* 3. Lista de Pedidos */}
        <div className="orders-list">
          {filteredOrders.length === 0 ? (
            <div className="no-orders">Nenhum pedido encontrado nesta aba.</div>
          ) : (
            filteredOrders.map((order) => (
              <div key={order.id} className="order-card">
                {/* Cabeçalho do Card */}
                <div className="card-header">
                  <div className="user-info">
                    <div className="avatar-small">{order.buyerName.charAt(0).toUpperCase()}</div>
                    <span className="username">{order.buyerName}</span>
                  </div>
                  <div className="order-id">ID do Pedido: {order.id}</div>
                </div>

                {/* Itens do Pedido */}
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <img src={item.image} alt={item.name} className="item-image" />
                    <div className="item-details">
                      <span className="item-name">{item.name}</span>
                      <span className="item-variation">Variação: {item.variation}</span>
                      <span className="item-qty">x{item.quantity}</span>
                    </div>
                    <div className="item-price">
                      R$ {item.price.toFixed(2)}
                    </div>
                  </div>
                ))}

                {/* Rodapé do Card (Total e Ações) */}
                <div className="card-footer">
                  <div className="order-total">
                    Total do Pedido: <span>R$ {order.total.toFixed(2)}</span>
                  </div>
                  
                  <div className="order-actions">
                    {/* Status Label */}
                    <span className={`status-label ${order.status.replace(' ', '-').toLowerCase()}`}>
                      {order.status}
                    </span>

                    {/* Botão de Ação (Varia conforme o status) */}
                    {order.status === 'A Enviar' && (
                      <Button style={{ width: 'auto', padding: '8px 20px' }}>
                        Enviar Pedido
                      </Button>
                    )}
                    {order.status === 'Enviando' && (
                      <Button variant="social" style={{ width: 'auto', padding: '8px 20px' }}>
                        Ver Rastreio
                      </Button>
                    )}
                    {(order.status === 'Concluído' || order.status === 'Cancelado') && (
                      <Button variant="social" style={{ width: 'auto', padding: '8px 20px' }}>
                        Detalhes
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