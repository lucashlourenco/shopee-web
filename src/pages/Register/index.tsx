import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

import { Step1 } from './components/Step1/index.tsx';
import { Step2 } from './components/Step2/index.tsx';
import { Step3 } from './components/Step3/index.tsx';

export function Register() {
  const [step, setStep] = useState(1);
  // 1. ESTADO CENTRAL: Criamos um objeto para acumular os dados de todos os passos
  const [formData, setFormData] = useState({}); 
  const navigate = useNavigate();

  // 2. LOGICA DE AVANÇO: Agora recebe os dados (data) da etapa atual e junta ao formData
  const handleNextStep = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep((prevStep) => prevStep + 1);
  };

  const handleFinish = () => {
    // Após o Step 3 concluir a chamada à API, voltamos para o login
    alert('Cadastro finalizado com sucesso! Bem-vindo à sua loja.');
    navigate('/login'); 
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        // O Step 1 deve chamar onNextStep({ name, email, password })
        return <Step1 onNextStep={handleNextStep} />;
      
      case 2:
        // O Step 2 deve chamar onNextStep({ cpf, phone, birthdate })
        return <Step2 onNextStep={handleNextStep} />;
      
      case 3:
        // Passamos os dados acumulados (formData) para o Step 3 fazer o POST final
        return (
          <Step3 
            userDataFromSteps={formData} 
            onFinish={handleFinish} 
          />
        );
      
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