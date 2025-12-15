import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar } from '../../components/Sidebar/index.tsx';
import { Input } from '../../components/Input/index.tsx';
import { Button } from '../../components/Button/index.tsx';
import './styles.css';

interface Product {
  id: string;
  image: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  sales: number;
}

export function ProductList() {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'unpublished'>('active');
  
  // Dados de exemplo (Mock)
  const [products] = useState<Product[]>([
    // Adicione produtos aqui para testar
  ]);

  return (
    <div className="page-layout">
      <Sidebar />
      
      <main className="main-content">
        <div className="product-list-container">
          
          {/* Cabeçalho */}
          <header className="page-header">
            <h2>Meus produtos</h2>
            <div className="header-actions">
              <Link to="/produto/novo">
                <Button style={{ width: 'auto', backgroundColor: '#ee4d2d' }}>+ Adicionar Produto</Button>
              </Link>
            </div>
          </header>

          {/* Abas de Navegação */}
          <div className="tabs-container">
            <button 
              className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              Todos
            </button>
            <button 
              className={`tab-btn ${activeTab === 'active' ? 'active' : ''}`}
              onClick={() => setActiveTab('active')}
            >
              Ativo (0)
            </button>
            <button 
              className={`tab-btn ${activeTab === 'unpublished' ? 'active' : ''}`}
              onClick={() => setActiveTab('unpublished')}
            >
              Não publicado (0)
            </button>
          </div>

          {/* Filtros */}
          <section className="filter-section">
            <div className="filter-header">
              <button className="filter-tab active">Todos</button>
              <button className="filter-tab">Repor (0)</button>
              <span style={{ marginLeft: 'auto', fontSize: '12px', color: '#999' }}>
                Para revisar os detalhes da Listagem (0) 🔴
              </span>
            </div>
            <div className="filter-row">
              <div className="search-input-wrapper">
                <Input placeholder="Pesquisar Nome do Produto, SKU principal, S" style={{ marginBottom: 0 }} />
              </div>
              <div className="filter-input-wrapper">
                <Input placeholder="Categoria" style={{ marginBottom: 0 }} />
              </div>
              <div className="filter-input-wrapper">
                <Input placeholder="Tipo de Produto" style={{ marginBottom: 0 }} />
              </div>
              <div className="filter-actions">
                <Button style={{ width: 'auto', padding: '8px 20px' }}>Aplicar</Button>
                <button className="reset-btn">Redefinir</button>
                <button className="expand-btn">Expandir ⌄</button>
              </div>
            </div>
          </section>

          {/* Tabela */}
          <section className="table-container">
            <div className="table-header">
              <div className="col-checkbox"><input type="checkbox" /></div>
              <div className="col-product">Produto(s)</div>
              <div className="col-sales">Vendas <span className="sort-icon">I</span></div>
              <div className="col-price">Preço <span className="sort-icon">I</span></div>
              <div className="col-stock">Estoque <span className="sort-icon">I</span></div>
              <div className="col-action">Ação</div>
            </div>

            {products.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📦</div>
                <p>Nenhum produto encontrado</p>
              </div>
            ) : (
              <div className="table-body">
                {products.map(prod => (
                  <div key={prod.id} className="table-row">
                    <div className="col-checkbox"><input type="checkbox" /></div>
                    <div className="col-product product-info">
                      <img src={prod.image} alt={prod.name} />
                      <div>
                        <strong>{prod.name}</strong>
                        <span className="sku">SKU: {prod.sku}</span>
                      </div>
                    </div>
                    <div className="col-sales">{prod.sales}</div>
                    <div className="col-price">R$ {prod.price.toFixed(2)}</div>
                    <div className="col-stock">{prod.stock}</div>
                    <div className="col-action">
                      <button className="action-link">Editar</button>
                      <button className="action-link delete">Mais ⌄</button>
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