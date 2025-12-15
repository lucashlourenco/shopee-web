import { Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login/index.tsx';
import { Register } from './pages/Register/index.tsx';
import { ForgotPassword } from './pages/ForgotPassword/index.tsx';
import { Dashboard } from './pages/Dashboard/index.tsx';
import { AddProduct } from './pages/AddProduct/index.tsx';
import { ProductList } from './pages/ProductList/index.tsx';
import { ShopProfile } from './pages/ShopProfile/index.tsx';
import { AccountSettings } from './pages/AccountSettings/index.tsx';
import { MassShipping } from './pages/MassShipping/index.tsx';
import { Orders } from './pages/Orders/index.tsx';
import { Income } from './pages/Income/index.tsx';

export function App() {
  return (
    <Routes>
      {/* --- Rotas Públicas --- */}
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />
      <Route path="/esqueci-senha" element={<ForgotPassword />} />
      
      {/* --- Rotas do Painel do Vendedor --- */}
      
      {/* Dashboard Principal */}
      <Route path="/dashboard" element={<Dashboard />} />
      
      {/* Produtos */}
      <Route path="/produtos" element={<ProductList />} />
      <Route path="/produto/novo" element={<AddProduct />} />
      
      {/* Pedidos */}
      <Route path="/pedidos" element={<Orders/>} />
      
      {/* Envios */}
      <Route path="/envios/massa" element={<MassShipping />} />

      {/* Loja e Configurações */}
      <Route path="/perfil" element={<ShopProfile />} />
      <Route path="/configuracoes" element={<AccountSettings />} />

      <Route path="/pedidos" element={<Orders />} />
      <Route path="/financas" element={<Income />} />

      {/* Rota de Erro (404) */}
      <Route path="*" element={<h1>Página não encontrada (404)</h1>} />
    </Routes>
  );
}