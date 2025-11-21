import { Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login/index.tsx';
import { Register } from './pages/Register/index.tsx';


export function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />

      {/* Rota para qualquer outra página não encontrada */}
      <Route path="*" element={<h1>Página não encontrada (404)</h1>} />
    </Routes>
  );
}