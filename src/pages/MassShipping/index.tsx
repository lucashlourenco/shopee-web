import React, { useState } from 'react';
import { Sidebar } from '../../components/Sidebar/index.tsx';
import { Input } from '../../components/Input/index.tsx';
import { Button } from '../../components/Button/index.tsx';
import './styles.css';

export function MassShipping() {
  const [activeTab, setActiveTab] = useState<'ship' | 'documents'>('ship');
  const [shippingDeadline, setShippingDeadline] = useState('Tudo');

  return (
    <div className="page-layout">
      <Sidebar />
      
      <main className="main-content">
        <div className="mass-shipping-container">
          
          {/* Título */}
          <h2 className="page-title">Envio Em Massa</h2>

          {/* Abas Principais */}
          <div className="main-tabs">
            <button 
              className={`main-tab-btn ${activeTab === 'ship' ? 'active' : ''}`}
              onClick={() => setActiveTab('ship')}
            >
              Pedidos a Enviar
            </button>
          </div>

          <div className="content-card">
            
            {/* Filtros de Tags (Pills) */}
            <div className="filter-group-row">
              <label className="filter-label">Prazo de Envio</label>
              <div className="filter-pills">
                {['Tudo', 'Atrasado(a) (0)', 'Dentro das 24h (0)', 'Além das 24h (0)'].map(item => (
                  <button 
                    key={item}
                    className={`pill-btn ${shippingDeadline === item ? 'active' : ''}`}
                    onClick={() => setShippingDeadline(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid de Inputs de Filtro */}
            <div className="filter-inputs-grid">
              
              <div className="input-row-full">
                <label>Conteúdo de Encomendas</label>
                <select className="shopee-select">
                  <option>Todos</option>
                </select>
              </div>

              <div className="input-row-full">
                <label>Produto</label>
                <Input placeholder="Inserir nome do produto/sku de referência/sku" style={{ margin: 0 }} />
              </div>

              <div className="filter-actions-row">
                <Button style={{ width: 'auto', padding: '8px 25px', backgroundColor: '#ee4d2d' }}>Aplicar</Button>
                <button className="reset-link">Reiniciar</button>
                <button className="collapse-link">Recolher Filtro ˄</button>
              </div>

            </div>

            {/* Cabeçalho da Lista e Ordenação */}
            <div className="list-controls">
              <h3>0 Pedidos</h3>
              <div className="sort-dropdown">
                ⇅ Ordenar por: Data de envio (O mais antigo primeiro)
              </div>
            </div>

            {/* Tabela */}
            <div className="mass-table">
              <div className="mass-table-header">
                <div className="col-check"><input type="checkbox" /></div>
                <div className="col-products">Produtos</div>
                <div className="col-id">ID do Pedido</div>
                <div className="col-buyer">Comprador</div>
                <div className="col-channel">Canal</div>
                <div className="col-time">Tempo Confirmado</div>
                <div className="col-status">Status do pedido</div>
              </div>

              {/* Empty State (Sem dados) */}
              <div className="mass-table-empty">
                <div className="empty-icon-sheet">📄</div>
                <p>Sem dados</p>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}