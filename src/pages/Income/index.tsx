import React, { useState } from 'react';
import { Sidebar } from '../../components/Sidebar/index.tsx';
import { Button } from '../../components/Button/index.tsx';
import { INCOME_DATA } from '../../utils/income.ts';
import './styles.css';

export function Income() {
  const [activeTab, setActiveTab] = useState<'A Liberar' | 'Já Liberado'>('A Liberar');

  // 1. Calcular Totais
  const totalPending = INCOME_DATA
    .filter(t => t.status === 'Pendente')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalReleased = INCOME_DATA
    .filter(t => t.status === 'Liberado')
    .reduce((acc, curr) => acc + curr.amount, 0);

  // 2. Filtrar Lista com base na Aba
  const filteredList = INCOME_DATA.filter(t => 
    activeTab === 'A Liberar' ? t.status === 'Pendente' : t.status === 'Liberado'
  );

  return (
    <div className="income-layout">
      <Sidebar />
      
      <main className="income-content">
        <header className="page-header">
          <h2>Minha Renda</h2>
          <div className="header-actions">
            <Button variant="social" style={{ width: 'auto' }}>
              Configurar Conta Bancária
            </Button>
          </div>
        </header>

        {/* 3. Cards de Resumo */}
        <section className="summary-cards">
          <div className="income-card">
            <h3>A Liberar</h3>
            <p className="income-value">R$ {totalPending.toFixed(2)}</p>
            <span className="income-info">Pagamentos de pedidos em andamento</span>
          </div>

          <div className="income-card highlight">
            <h3>Já Liberado</h3>
            <p className="income-value">R$ {totalReleased.toFixed(2)}</p>
            <span className="income-info">Saldo disponível para saque</span>
            <Button style={{ marginTop: '10px' }}>Solicitar Saque</Button>
          </div>
        </section>

        {/* 4. Lista de Transações */}
        <section className="transactions-section">
          <div className="income-tabs">
            <button 
              className={`tab-btn ${activeTab === 'A Liberar' ? 'active' : ''}`}
              onClick={() => setActiveTab('A Liberar')}
            >
              A Liberar
            </button>
            <button 
              className={`tab-btn ${activeTab === 'Já Liberado' ? 'active' : ''}`}
              onClick={() => setActiveTab('Já Liberado')}
            >
              Já Liberado
            </button>
          </div>

          <div className="transaction-list">
            <div className="list-header">
              <span>Pedido / Transação</span>
              <span>Data</span>
              <span>Comprador</span>
              <span style={{ textAlign: 'right' }}>Valor Líquido</span>
            </div>

            {filteredList.length === 0 ? (
              <div className="no-data">Nenhuma transação encontrada.</div>
            ) : (
              filteredList.map((item) => (
                <div key={item.id} className="list-row">
                  <div className="col-id">
                    <strong>{item.orderId}</strong>
                    <span className="trx-id">{item.id}</span>
                  </div>
                  <div className="col-date">{item.date}</div>
                  <div className="col-buyer">{item.buyerName}</div>
                  <div className="col-amount">R$ {item.amount.toFixed(2)}</div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}