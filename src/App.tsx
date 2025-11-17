import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importa a sua página de Login que já criamos
import { Login } from './pages/Login/index.tsx';

// (Quando você criar a página de cadastro, vai importar aqui)
// import { Register } from './pages/Register';

export function App() {
  return (
    <Routes>
      {/* Rota para a página de Login */}
      <Route path="/login" element={<Login />} />

      {/* Rota principal (/) também leva para o login por enquanto */}
      <Route path="/" element={<Login />} />
      
      {/* Exemplo de como adicionar a rota de cadastro no futuro:
      <Route path="/cadastro" element={<Register />} /> 
      */}

      {/* Rota para qualquer outra página não encontrada */}
      <Route path="*" element={<h1>Página não encontrada (404)</h1>} />
    </Routes>
  );
}