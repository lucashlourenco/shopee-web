import React from 'react';
import { Sidebar } from '../../components/Sidebar/index.tsx';
import './styles.css';

export function Dashboard() {
  return (
    <div className="dashboard-layout">
      {/* 1. Barra Lateral Fixa */}
      <Sidebar />

      {/* 2. Área de Conteúdo Principal */}
      <main className="dashboard-content">
        <header className="dashboard-header">
          <h1>Visão Geral da Loja</h1>
          <div className="user-info">
            <span>Olá, Vendedor</span>
            <div className="avatar">V</div>
          </div>
        </header>

        {/* Exemplo de Cards de Informação */}
        <section className="stats-grid">
          <div className="stat-card">
            <h3>A Pagar</h3>
            <p className="stat-number">0</p>
          </div>
          <div className="stat-card">
            <h3>A Enviar</h3>
            <p className="stat-number">5</p>
            <span className="alert">Atenção Necessária</span>
          </div>
          <div className="stat-card">
            <h3>Enviado</h3>
            <p className="stat-number">12</p>
          </div>
          <div className="stat-card">
            <h3>Cancelado</h3>
            <p className="stat-number">1</p>
          </div>
        </section>

        <section className="content-area">
          <h2>Gráfico de Vendas</h2>
          <div className="placeholder-chart">
            <p>Gráfico será exibido aqui...</p>
          </div>
        </section>
      </main>
    </div>
  );
}