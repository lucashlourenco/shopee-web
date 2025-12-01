import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { App } from './App.tsx';
import { Step1 } from './pages/Register/components/Step1/index.tsx';
import './styles/global.css';

export function Register() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleFinish = () => {
    // Aqui será a chamada final para a API
    // e então redicionará para o Dashboard
    alert('Cadastro finalizado com sucesso!');
    navigate('/dashboard'); // 
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 onNextStep={handNextStep} />;
      case 2:
   //     return <Step2 onNextStep={handNextStep} />;
      case 3:
    //    return <Step3 onNextStep={handNextStep} />;
      default:
        return <Step1 onNextStep={handNextStep} />;
    }
  };
  return (
    <div className='register-container'>
      <div className='register-box'>
        <header className='register-header'>
          <h2>Cadastro de Vendedor</h2>
          <span className='step-indicator'>Etapa {step} de 3</span>
        </header>

        {renderStep()}
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </React.StrictMode>
);