import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { EmailStep } from './Components/EmailStep/index.tsx';
import { CodeStep } from './Components/CodeStep/index.tsx';
import './styles.css';

export function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  // Avança para a etapa do código
  const handleEmailSubmit = (emailInput: string) => {
    setEmail(emailInput);
    setStep(2);
  };

  // Finaliza o processo
  const handleCodeSubmit = (code: string) => {
    // Aqui você validaria o código na API
    alert(`Código ${code} verificado! Você pode redefinir sua senha agora.`);
    navigate('/login'); // Volta para o login após sucesso
  };

  return (
    <div className="forgot-container">
      <div className="forgot-box">
        <header className="forgot-header">
          <h2>Redefinir Senha</h2>
        </header>

        {step === 1 ? (
          <EmailStep onNext={handleEmailSubmit} />
        ) : (
          <CodeStep 
            email={email} 
            onFinish={handleCodeSubmit} 
            onBack={() => setStep(1)} 
          />
        )}

        <div className="back-to-login">
          <Link to="/login">Voltar ao Login</Link>
        </div>
      </div>
    </div>
  );
}