import React, { useState } from 'react';
import { Input } from '../../../../components/Input/index.tsx';
import { Button } from '../../../../components/Button/index.tsx';

interface CodeStepProps {
  email: string;
  onFinish: (code: string) => void;
  onBack: () => void;
}

export function CodeStep({ email, onFinish, onBack }: CodeStepProps) {
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code) {
      onFinish(code);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p style={{ marginBottom: '20px', color: '#555', fontSize: '14px' }}>
        Enviamos um código de verificação para: <strong>{email}</strong>
      </p>
      
      <Input
        type="text"
        placeholder="Código de 6 dígitos"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
        maxLength={6}
      />
      
      <Button type="submit" variant="primary">
        Verificar e Criar Nova Senha
      </Button>

      <button 
        type="button" 
        onClick={onBack}
        style={{
          marginTop: '16px',
          background: 'transparent',
          border: 'none',
          color: '#ee4d2d',
          cursor: 'pointer',
          width: '100%',
          fontSize: '14px'
        }}
      >
        Voltar / Alterar E-mail
      </button>
    </form>
  );
}