import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // 1. Importar
import { App } from './App.tsx';
import './styles/global.css'; // Seu CSS global

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter> {/* 2. Envolver o App */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);