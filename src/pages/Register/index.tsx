import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

import { Step1 } from './components/Step1/index.tsx';
import { Step2 } from './components/Step2/index.tsx';
import { Step3 } from './components/Step3/index.tsx';

export function Register() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleFinish = () => {
    
    alert('Cadastro finalizado com sucesso! Bem-vindo à sua loja.');
    navigate('/dashboard'); 
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 onNextStep={handleNextStep} />;
      
      case 2:
        return <Step2 onNextStep={handleNextStep} />;
      
      case 3:
        return <Step3 onFinish={handleFinish} />;
      
      default:
        return <Step1 onNextStep={handleNextStep} />;
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <header className="register-header">
          <h2>Cadastro de Vendedor</h2>
          <span className="step-indicator">Etapa {step} de 3</span>
        </header>
        
        {renderStep()}
      </div>
    </div>
  );
}