import React from 'react';
import { Input } from '../../../../components/Input/index.tsx';
import { Button } from '../../../../components/Button/index.tsx';

// Define as props que o "pai" (Register) vai passar
interface Step3Props {
  onFinish: () => void; // Função para finalizar o cadastro
}

export function Step3({ onFinish }: Step3Props) {
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Impede o recarregamento da página

    // --- LÓGICA DA API (ETAPA 3) ---
    // Aqui será feita a lógica da API:
    // 1. CRIAR a entidade "Loja" no banco de dados.
    // 2. Associar essa nova Loja ao usuário que foi criado/atualizado.
    // 3. Se a API retornar sucesso...
    
    console.log('Etapa 3 concluída, finalizando cadastro...');
    onFinish(); // Chama a função do "pai" para finalizar e redirecionar
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Aqui você pode adicionar uma lógica de "Buscar CEP" no futuro, 
        que preencheria automaticamente os campos de endereço. 
        Por enquanto, faremos todos manuais.
      */}

      <Input 
        type="text" 
        placeholder="Nome da Loja" 
        required 
      />
      <Input 
        type="text" 
        placeholder="CEP (apenas números)" 
        required 
        maxLength={8}
      />
      <Input 
        type="text" 
        placeholder="Rua / Avenida" 
        required 
      />
      
      {/* Usando um grupo para Número e Complemento ficarem na mesma linha */}
      <div style={{ display: 'flex', gap: '16px' }}>
        <Input 
          type="text" 
          placeholder="Número" 
          required 
          style={{ flex: 1 }} 
        />
        <Input 
          type="text" 
          placeholder="Complemento" 
          style={{ flex: 2 }} 
        />
      </div>

      <Input 
        type="text" 
        placeholder="Bairro" 
        required 
      />
      <Input 
        type="text" 
        placeholder="Cidade" 
        required 
      />
      <Input 
        type="text" 
        placeholder="Estado (Ex: PE)" 
        required 
        maxLength={2}
      />
      
      <Button type="submit" variant="primary">
        Finalizar Cadastro
      </Button>
    </form>
  );
}