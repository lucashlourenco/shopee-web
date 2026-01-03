import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Sidebar } from '../../components/Sidebar/index.tsx';
import { Input } from '../../components/Input/index.tsx';
import { Button } from '../../components/Button/index.tsx';
import './styles.css';

interface Product {
  id: string;
  image: string;
  name: string;
  price: number;
  stock: number;
  sold: number; // Mapeado do campo 'sold' do seu banco de dados
}

export function ProductList() {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'unpublished'>('active');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMyProducts() {
      try {
        // 1. Recupera o vendedor logado para obter o ID da loja
        const storedUser = localStorage.getItem('seller_user');
        if (!storedUser) return;

        const user = JSON.parse(storedUser);
        const shopId = user.shop?.id;

        if (shopId) {
          // 2. Chama a API filtrando pelo shopId da sua loja
          const response = await axios.get(`http://localhost:3333/products?shopId=${shopId}`);
          setProducts(response.data);
        }
      } catch (error) {
        console.error("Erro ao carregar seus produtos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMyProducts();
  }, []);

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
              Ativo ({products.length})
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
                <Input placeholder="Pesquisar Nome do Produto" style={{ marginBottom: 0 }} />
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
              </div>
            </div>
          </section>

          {/* Tabela de Produtos Real */}
          <section className="table-container">
            <div className="table-header">
              <div className="col-checkbox"><input type="checkbox" /></div>
              <div className="col-product">Produto(s)</div>
              <div className="col-sales">Vendas</div>
              <div className="col-price">Preço</div>
              <div className="col-stock">Estoque</div>
              <div className="col-action">Ação</div>
            </div>

            {loading ? (
              <div className="empty-state">
                <p>Carregando produtos...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📦</div>
                <p>Nenhum produto encontrado nesta loja</p>
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
                      </div>
                    </div>
                    <div className="col-sales">{prod.sold}</div>
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