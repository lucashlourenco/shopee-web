import React from 'react';
import { Input } from '../../../../components/Input/index.tsx';
import { Button } from '../../../../components/Button/index.tsx';


interface Step1Props {
  onNextStep: () => void; // Função para avançar para a próxima etapa
}

export function Step1({ onNextStep }: Step1Props) {
  

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Impede o recarregamento da página

    // --- LÓGICA DA API (ETAPA 1) ---
    // 1. Criar o novo usuário (com nome, email, senha)
    // 2. Se a criação for bem-sucedida:
    
    console.log('Dados da Etapa 1 enviados. Avançando...');
    onNextStep();
  };

  return (
   
    <form onSubmit={handleSubmit}>
      <Input 
        type="text" 
        placeholder="Nome completo" 
        required 
      />
      <Input 
        type="email" 
        placeholder="Email" 
        required 
      />
      <Input 
        type="password" 
        placeholder="Senha" 
        required 
      />
      <Input 
        type="password" 
        placeholder="Confirmar Senha" 
        required 
      />

      <Button type="submit" variant="primary">
        Continuar
      </Button>
    </form>
  );
}