import { Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login/index.tsx';
import { Register } from './pages/Register/index.tsx';
import { Dashboard } from './pages/Dashboard/index.tsx';
import { AddProduct } from './pages/AddProduct/index.tsx';
import { ForgotPassword } from './pages/ForgotPassword/index.tsx';
import { Orders } from './pages/Orders/index.tsx';

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/produto/novo" element={<AddProduct />} />
      <Route path="/esqueci-senha" element={<ForgotPassword />} />
      <Route path="/pedidos" element={<Orders />} />

      <Route path="/" element={<Login />} />

      {/* Rota para qualquer outra página não encontrada */}
      <Route path="*" element={<h1>Página não encontrada (404)</h1>} />
    </Routes>
  );
}