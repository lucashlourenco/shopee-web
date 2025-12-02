import React, { useState } from 'react';
// Importando seus componentes reutilizáveis (subindo 4 níveis)
import { Input } from '../../../../components/Input/index.tsx';
import { Button } from '../../../../components/Button/index.tsx';

interface EmailStepProps {
  onNext: (email: string) => void;
}

export function EmailStep({ onNext }: EmailStepProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Aqui você chamaria a API para enviar o email
      console.log('Enviando código para:', email);
      onNext(email);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p style={{ marginBottom: '20px', color: '#555', fontSize: '14px' }}>
        Informe o e-mail cadastrado na sua conta para receber o código de verificação.
      </p>
      
      <Input
        type="email"
        placeholder="Endereço de e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      
      <Button type="submit" variant="primary">
        Enviar Código
      </Button>
    </form>
  );
}