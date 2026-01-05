import React, { useState } from 'react';
import { Input } from '../../../../components/Input/index.tsx';
import { Button } from '../../../../components/Button/index.tsx';

interface Step1Props {
  onNextStep: (data: any) => void;
}

export function Step1({ onNextStep }: Step1Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(''); // Estado para a mensagem de erro visual

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Validação de coincidência de senhas
    if (password !== confirmPassword) {
      setError('As senhas não coincidem!');
      return;
    }

    // Validação de tamanho mínimo (opcional, mas recomendado)
    if (password.length < 8) {
      setError('A senha deve ter pelo menos 8 caracteres.');
      return;
    }

    setError(''); // Limpa o erro se tudo estiver ok
    onNextStep({ name, email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Mensagem de Erro Estilizada */}
      {error && (
        <div style={{
          color: '#ee4d2d',
          backgroundColor: '#fff5f2',
          padding: '10px',
          borderRadius: '4px',
          marginBottom: '15px',
          fontSize: '14px',
          border: '1px solid rgba(238, 77, 45, 0.2)',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}

      <Input
        type="text"
        placeholder="Nome completo"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          if (error) setError(''); // Limpa o erro ao digitar
        }}
        required
      />
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (error) setError('');
        }}
        required
      />
      <Input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          if (error) setError('');
        }}
        required
      />
      <Input
        type="password"
        placeholder="Confirmar Senha"
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
          if (error) setError('');
        }}
        required
      />

      <Button type="submit" variant="primary">
        Continuar
      </Button>
    </form>
  );
}