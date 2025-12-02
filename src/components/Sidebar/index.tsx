import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles.css';

export function Sidebar() {
  const location = useLocation();

  // Função auxiliar para verificar se o link está ativo
  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <aside className="sidebar-container">
      <div className="sidebar-logo">
        <Link to="/dashboard" className="logo-link">
          <h2>Shopee <span>Vendedor</span></h2>
        </Link>
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li className="nav-title">Envios</li>
          <li>
            <Link to="/dashboard" className={isActive('/dashboard')}>
              Meus Envios
            </Link>
          </li>
          <li>
            <Link to="/envios/massa" className={isActive('/envios/massa')}>
              Envio em Massa
            </Link>
          </li>

          <li className="nav-title">Pedidos</li>
          <li>
            <Link to="/pedidos" className={isActive('/pedidos')}>
              Meus Pedidos
            </Link>
          </li>
          <li>
            <Link to="/pedidos/cancelados" className={isActive('/pedidos/cancelados')}>
              Cancelamentos
            </Link>
          </li>

          <li className="nav-title">Produtos</li>
          <li>
            <Link to="/produtos" className={isActive('/produtos')}>
              Meus Produtos
            </Link>
          </li>
          <li>
            <Link to="/produto/novo" className={isActive('/produto/novo')}>
              Adicionar Novo Produto
            </Link>
          </li>

          <li className="nav-title">Finanças</li>
          <li>
            <Link to="/financas" className={isActive('/financas')}>
              Minha Renda
            </Link>

          <li className="nav-title">Loja</li>
          <li>
            <Link to="/perfil" className={isActive('/perfil')}>
              Perfil e Configurações da Loja
            </Link>
          </li>
          </li>
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <Link to="/login">Sair</Link>
      </div>
    </aside>
  );
}