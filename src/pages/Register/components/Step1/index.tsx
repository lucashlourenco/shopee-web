import React, { useState } from 'react';
import { Input } from '../../../../components/Input/index.tsx';
import { Button } from '../../../../components/Button/index.tsx';

interface Step1Props {
  onNextStep: (data: any) => void; // Atualizado para receber dados
}

export function Step1({ onNextStep }: Step1Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    // Passa os dados para o componente pai (Register)
    onNextStep({ name, email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input 
        type="text" 
        placeholder="Nome completo" 
        value={name}
        onChange={(e) => setName(e.target.value)}
        required 
      />
      <Input 
        type="email" 
        placeholder="Email" 
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
      <Input 
        type="password" 
        placeholder="Confirmar Senha" 
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required 
      />

      <Button type="submit" variant="primary">
        Continuar
      </Button>
    </form>
  );
}