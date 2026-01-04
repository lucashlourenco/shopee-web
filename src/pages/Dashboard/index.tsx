import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Sidebar } from '../../components/Sidebar/index.tsx';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import './styles.css';

interface DashboardStats {
  aPagar: number;
  aEnviar: number;
  enviado: number;
  cancelado: number;
}

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    aPagar: 0,
    aEnviar: 0,
    enviado: 0,
    cancelado: 0
  });
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Pegamos o usuário do localStorage
  const sellerData = JSON.parse(localStorage.getItem('seller_user') || '{}');

  // 2. EXTRAÇÃO CORRETA: O ID está dentro de sellerData.shop.id
  const shopId = sellerData.shop?.id;

  useEffect(() => {
    async function loadDashboardData() {
      // Se não houver shopId, não fazemos a chamada
      if (!shopId) {
        console.error("ID da loja não encontrado no perfil do vendedor.");
        setLoading(false);
        return;
      }

      try {
        const [statsRes, chartRes] = await Promise.all([
          axios.get(`http://localhost:3333/seller/stats/${shopId}`),
          axios.get(`http://localhost:3333/seller/sales-chart/${shopId}`)
        ]);

        setStats(statsRes.data);
        setChartData(chartRes.data);
      } catch (error) {
        console.error("Erro ao carregar dados do Dashboard:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, [shopId]);

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-content">
        <header className="dashboard-header">
          <h1>Visão Geral da Loja</h1>
          <div className="user-info">
            <span>Olá, {sellerData.name || 'Vendedor'}</span>
            <div className="avatar">{sellerData.name?.charAt(0) || 'V'}</div>
          </div>
        </header>

        {/* 3. Cards com dados dinâmicos da API */}
        <section className="stats-grid">
          <div className="stat-card">
            <h3>A Pagar</h3>
            <p className="stat-number">{loading ? '...' : stats.aPagar}</p>
          </div>
          <div className="stat-card">
            <h3>A Enviar</h3>
            <p className="stat-number">{loading ? '...' : stats.aEnviar}</p>
            {stats.aEnviar > 0 && <span className="alert">Atenção Necessária</span>}
          </div>
          <div className="stat-card">
            <h3>Enviado</h3>
            <p className="stat-number">{loading ? '...' : stats.enviado}</p>
          </div>
          <div className="stat-card">
            <h3>Cancelado</h3>
            <p className="stat-number">{loading ? '...' : stats.cancelado}</p>
          </div>
        </section>

        {/* 4. Gráfico Real implementado com Recharts */}
        <section className="content-area">
          <h2>Volume de Vendas (Últimos 7 dias)</h2>
          <div style={{ width: '100%', height: 300, marginTop: '20px' }}>
            {loading ? (
              <div className="placeholder-chart"><p>Carregando dados...</p></div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `R$${value}`} />
                  <Tooltip
                    formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Vendas']}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  {/* Cor Laranja da Shopee: #ee4d2d */}
                  <Bar dataKey="sales" fill="#ee4d2d" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}