import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

export function Sidebar() {
  return (
    <aside className="sidebar-container">
      <div className="sidebar-logo">
        <Link to="/dashboard" className='logo-link'>
            <h2> Shopee <span> Vendedor</span> </h2> 
        </Link>
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li className="nav-title">Envios</li>
          <li><Link to="/dashboard">Meus Envios</Link></li>
          <li><Link to="/dashboard">Envio em Massa</Link></li>

          <li className="nav-title">Pedidos</li>
          <li><Link to="/dashboard" className="active">Meus Pedidos</Link></li>
          <li><Link to="/dashboard">Cancelamentos</Link></li>

          <li className="nav-title">Produtos</li>
          <li><Link to="/dashboard">Meus Produtos</Link></li>
          <li><Link to="/produto/novo">Adicionar Novo Produto</Link></li>

          <li className="nav-title">Finanças</li>
          <li><Link to="/dashboard">Minha Renda</Link></li>
          <li><Link to="/dashboard">Conta Bancária</Link></li>
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <Link to="/login">Sair</Link>
      </div>
    </aside>
  );
}