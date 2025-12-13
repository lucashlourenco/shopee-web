import React, { useState } from 'react';
import { Sidebar } from '../../components/Sidebar/index.tsx';
import { Input } from '../../components/Input/index.tsx';
import { Button } from '../../components/Button/index.tsx';
import './styles.css';

interface Order {
  id: string;
  products: string[];
  price: number;
  status: string;
  deadline: string;
  shippingChannel: string;
}

export function OrdersList() {
  // Estado das Abas principais (Topo)
  const [activeTab, setActiveTab] = useState<'all' | 'unpaid' | 'to-ship' | 'shipped' | 'completed'>('to-ship');
  
  // --- NOVOS ESTADOS PARA OS FILTROS ---
  // Estado para "Status do Pedido" (Inicia selecionado 'Em aberto' conforme sua imagem)
  const [filterOrderStatus, setFilterOrderStatus] = useState('Em aberto');
  
  // Estado para "Status da nota fiscal" (Inicia selecionado 'Todos')
  const [filterInvoiceStatus, setFilterInvoiceStatus] = useState('Todos');
  
  // Dados de exemplo (Mock)
  const [orders] = useState<Order[]>([]);

  return (
    <div className="page-layout">
      <Sidebar />
      
      <main className="main-content">
        <div className="orders-list-container">
          
          {/* Cabeçalho */}
          <header className="page-header">
            <h2>Meus Pedidos</h2>
            <div className="header-actions">
              <button className="secondary-btn">Exportar</button>
              <button className="secondary-btn">Exportar Histórico</button>
            </div>
          </header>

          {/* Abas de Navegação */}
          <div className="tabs-container">
            <button className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>Todos</button>
            <button className={`tab-btn ${activeTab === 'unpaid' ? 'active' : ''}`} onClick={() => setActiveTab('unpaid')}>Não pago</button>
            <button className={`tab-btn ${activeTab === 'to-ship' ? 'active' : ''}`} onClick={() => setActiveTab('to-ship')}>A Enviar</button>
            <button className={`tab-btn ${activeTab === 'shipped' ? 'active' : ''}`} onClick={() => setActiveTab('shipped')}>Enviado</button>
            <button className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`} onClick={() => setActiveTab('completed')}>Concluído</button>
          </div>

          {/* Filtros */}
          <section className="filter-section">
            
            {/* Filtro 1: Status do Pedido (Interativo) */}
            <div className="filter-group">
              <label>Status do Pedido</label>
              <div className="filter-options">
                <button 
                  className={`filter-pill ${filterOrderStatus === 'Todos' ? 'active' : ''}`}
                  onClick={() => setFilterOrderStatus('Todos')}
                >
                  Todos
                </button>
                <button 
                  className={`filter-pill ${filterOrderStatus === 'Em aberto' ? 'active' : ''}`}
                  onClick={() => setFilterOrderStatus('Em aberto')}
                >
                  Em aberto
                </button>
                <button 
                  className={`filter-pill ${filterOrderStatus === 'Concluídas' ? 'active' : ''}`}
                  onClick={() => setFilterOrderStatus('Concluídas')}
                >
                  Concluídas
                </button>
              </div>
            </div>

            {/* Filtro 2: Status da Nota Fiscal (Interativo) */}
            <div className="filter-group">
              <label>Status da nota fiscal</label>
              <div className="filter-options">
                <button 
                  className={`filter-pill ${filterInvoiceStatus === 'Todos' ? 'active' : ''}`}
                  onClick={() => setFilterInvoiceStatus('Todos')}
                >
                  Todos
                </button>
                <button 
                  className={`filter-pill ${filterInvoiceStatus === 'Pendente' ? 'active' : ''}`}
                  onClick={() => setFilterInvoiceStatus('Pendente')}
                >
                  Pendente (0)
                </button>
                <button 
                  className={`filter-pill ${filterInvoiceStatus === 'Recusado' ? 'active' : ''}`}
                  onClick={() => setFilterInvoiceStatus('Recusado')}
                >
                  Recusado (0)
                </button>
                <button 
                  className={`filter-pill ${filterInvoiceStatus === 'Autorizado' ? 'active' : ''}`}
                  onClick={() => setFilterInvoiceStatus('Autorizado')}
                >
                  Autorizado (0)
                </button>
              </div>
            </div>

            <div className="filter-row">
              <div className="search-input-wrapper">
                <Input placeholder="Inserir ID do pedido" style={{ marginBottom: 0 }} />
              </div>
              <div className="filter-input-wrapper">
                <Input placeholder="Canal de Envio: Todos os canais" style={{ marginBottom: 0 }} />
              </div>
              <div className="filter-actions">
                <Button style={{ width: 'auto', padding: '8px 20px' }}>Aplicar</Button>
                <button className="reset-btn">Reiniciar</button>
              </div>
            </div>
          </section>

          {/* Tabela */}
          <section className="table-container">
            <div className="table-actions-bar">
              <span className="orders-count">{orders.length} Pedidos</span>
              <div className="table-actions">
                <button className="sort-btn">⇅ Ordenar por: Data de envio (O mais antigo primeiro)</button>
                <Button style={{ width: 'auto', padding: '8px 20px', backgroundColor: '#ee4d2d' }}>
                  📦 Envio em massa
                </Button>
              </div>
            </div>
            <div className="table-header">
              <div className="col-product">Produto(s)</div>
              <div className="col-price">Preço pago pelo comprador</div>
              <div className="col-status">Status</div>
              <div className="col-deadline">Prazo</div>
              <div className="col-channel">Canal de Envio</div>
              <div className="col-action">Ações</div>
            </div>

            {orders.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📋</div>
                <p>Nenhum Pedido Encontrado</p>
              </div>
            ) : (
              <div className="table-body">
                {orders.map(order => (
                  <div key={order.id} className="table-row">
                    <div className="col-product">{/* Lista de produtos */}</div>
                    <div className="col-price">R$ {order.price.toFixed(2)}</div>
                    <div className="col-status">{order.status}</div>
                    <div className="col-deadline">{order.deadline}</div>
                    <div className="col-channel">{order.shippingChannel}</div>
                    <div className="col-action">
                      <button className="action-link">Detalhes</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}