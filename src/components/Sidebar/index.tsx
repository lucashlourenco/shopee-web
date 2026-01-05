import { Link, useLocation } from 'react-router-dom';
import './styles.css';

export function Sidebar() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <aside className="sidebar-container">
      <div className="sidebar-logo">
        <Link to="/dashboard" className="logo-link">
          <h2>Shopee <span>Vendedor</span></h2>
        </Link>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {/* --- PEDIDOS --- */}
          <li className="nav-title">Pedidos</li>
          <li>
            <Link to="/dashboard" className={isActive('/dashboard')}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/pedidos" className={isActive('/pedidos')}>
              Meus Pedidos
            </Link>
          </li>
          <li>
            <Link to="/envios/massa" className={isActive('/envios/massa')}>
              Envio em Massa
            </Link>
          </li>

          {/* --- PRODUTOS --- */}
          <li className="nav-title">Produtos</li>
          <li>
            <Link to="/produtos" className={isActive('/produtos')}>
              Meus Produtos
            </Link>
          </li>
          <li>
            <Link to="/produto/novo" className={isActive('/produto/novo')}>
              Adicionar Novo Produto
            </Link>
          </li>

          {/* --- FINANÇAS --- */}
          <li className="nav-title">Finanças</li>
          <li>
            <Link to="/financas" className={isActive('/financas')}>
              Minha Renda
            </Link>
          </li>

          {/* --- LOJA --- */}
          <li className="nav-title">Loja</li>
          <li>
            <Link to="/perfil" className={isActive('/perfil')}>
              Perfil da Loja
            </Link>
          </li>
          {/* NOVO LINK ADICIONADO AQUI: */}
          <li>
            <Link to="/configuracoes" className={isActive('/configuracoes')}>
              Configurações da Conta
            </Link>
          </li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <Link to="/login">Sair</Link>
      </div>
    </aside>
  );
}