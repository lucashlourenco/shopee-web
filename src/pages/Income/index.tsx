import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Sidebar } from '../../components/Sidebar/index.tsx';
import { Button } from '../../components/Button/index.tsx';
import './styles.css';

interface Transaction {
  id: string;
  orderId: string;
  date: string;
  buyerName: string;
  amount: number;
  status: 'Pendente' | 'Liberado';
}

export function Income() {
  const [activeTab, setActiveTab] = useState<'A Liberar' | 'Já Liberado'>('A Liberar');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const sellerData = JSON.parse(localStorage.getItem('seller_user') || '{}');
  const shopId = sellerData.shop?.id;

  useEffect(() => {
    async function loadIncome() {
      if (!shopId) return;
      try {
        const response = await axios.get(`http://localhost:3333/seller/income/${shopId}`);
        setTransactions(response.data);
      } catch (error) {
        console.error("Erro ao buscar renda:", error);
      } finally {
        setLoading(false);
      }
    }
    loadIncome();
  }, [shopId]);

  // 1. Cálculo dos Totais baseados nos dados REAIS
  const totalPending = transactions
    .filter(t => t.status === 'Pendente')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalReleased = transactions
    .filter(t => t.status === 'Liberado')
    .reduce((acc, curr) => acc + curr.amount, 0);

  // 2. Filtro da Lista por Aba
  const filteredList = transactions.filter(t =>
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

        <section className="summary-cards">
          <div className="income-card">
            <h3>A Liberar</h3>
            <p className="income-value">R$ {totalPending.toFixed(2)}</p>
            <span className="income-info">Pedidos em processamento (90% do total)</span>
          </div>

          <div className="income-card highlight">
            <h3>Já Liberado</h3>
            <p className="income-value">R$ {totalReleased.toFixed(2)}</p>
            <span className="income-info">Saldo disponível após conclusão do pedido</span>
            <Button style={{ marginTop: '10px' }} disabled={totalReleased <= 0}>
              Solicitar Saque
            </Button>
          </div>
        </section>

        <section className="transactions-section">
          <div className="income-tabs">
            <button
              className={`tab-btn ${activeTab === 'A Liberar' ? 'active' : ''}`}
              onClick={() => setActiveTab('A Liberar')}
            >
              A Liberar ({transactions.filter(t => t.status === 'Pendente').length})
            </button>
            <button
              className={`tab-btn ${activeTab === 'Já Liberado' ? 'active' : ''}`}
              onClick={() => setActiveTab('Já Liberado')}
            >
              Já Liberado ({transactions.filter(t => t.status === 'Liberado').length})
            </button>
          </div>

          <div className="transaction-list">
            <div className="list-header">
              <span>Pedido / Transação</span>
              <span>Data</span>
              <span>Comprador</span>
              <span style={{ textAlign: 'right' }}>Valor Líquido (-10%)</span>
            </div>

            {loading ? (
              <div className="no-data">Carregando transações...</div>
            ) : filteredList.length === 0 ? (
              <div className="no-data">Nenhuma transação encontrada nesta categoria.</div>
            ) : (
              filteredList.map((item) => (
                <div key={item.id} className="list-row">
                  <div className="col-id">
                    <strong>{item.orderId}</strong>
                    <span className="trx-id">{item.id.substring(0, 13)}...</span>
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