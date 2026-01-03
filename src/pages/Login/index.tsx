import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Input } from '../../components/Input/index.tsx';
import { Button } from '../../components/Button/index.tsx';
import shopeeIllustration from '../../assets/images/truck.png';
import googleIcon from '../../assets/images/google-icon-logo.svg';

import './styles.css';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Chamada para a API
      const response = await axios.post('http://localhost:3333/auth/login', {
        email,
        password,
      });

      const user = response.data;

      // Validação do papel de vendedor
      if (user.role !== 'SELLER') {
        alert('Acesso negado. Esta área é exclusiva para vendedores.');
        setLoading(false);
        return;
      }

      // Persistência da sessão
      localStorage.setItem('seller_user', JSON.stringify(user));
      navigate('/dashboard');

    } catch (error: any) {
      console.error('Erro no login:', error.response?.data || error.message);
      alert(error.response?.data?.error || 'E-mail ou senha incorretos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <section className="left-panel">
        <header className="left-header">
          <strong>Shopee</strong> Central do Vendedor
        </header>

        <h1>Seja um Vendedor Campeão</h1>
        <p>
          Cadastre-se clicando no botão "Página inicial Shopee" acima, depois
          clicando no botão "Cadastrar". Com o registro feito, acesse aqui a
          Central do Vendedor com suas credenciais para gerenciar sua loja.
        </p>

        <img
          src={shopeeIllustration}
          alt="Ilustração de Loja"
          className="illustration"
        />
      </section>

      <section className="right-panel">
        <div className="login-box">
          <h2>Entre</h2>

          <form onSubmit={handleLogin}>
            <Input
              type="email"
              placeholder="Número de telefone/Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'ENTRANDO...' : 'ENTRE'}
            </Button>
          </form>

          <div className="links">
            <Link to="/esqueci-senha">Esqueci minha senha</Link>
          </div>

          <div className="divider">
            <span>OU</span>
          </div>

          <div className="social-login">
            <Button variant="social" type="button">
              <img src={googleIcon} alt="Google" />
              Google
            </Button>
          </div>

          <footer className="register-link">
            Novo na Shopee? {' '}
            <Link to="/cadastro">Cadastrar</Link>
          </footer>
        </div>
      </section>
    </div>
  );
}