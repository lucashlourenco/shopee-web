import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../../components/Input/index.tsx';
import { Button } from '../../components/Button/index.tsx';
import shopeeIllustration from '../../assets/images/truck.png';
import googleIcon from '../../assets/images/google-icon-logo.svg';
import './styles.css';


export function Login() {
  return (
    <div className="login-container">
      {}
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

          <form>
            <Input
              type="text"
              placeholder="Número de telefone/Email"
            />
            <Input type="password" placeholder="Senha" />

            <Button type="submit" variant="primary">
              ENTRE
            </Button>
          </form>

          <div className="links">
            <Link to="/esqueci-senha">Esqueci minha senha</Link>
          </div>

          <div className="divider">
            <span>OU</span>
          </div>

          <div className="social-login">
            <Button variant="social">
              {<img src={googleIcon} alt="Google" />}
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