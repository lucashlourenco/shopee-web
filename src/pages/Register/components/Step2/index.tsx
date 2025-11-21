import React, { useState } from 'react';

// 1. Importe seus componentes reutilizáveis (o caminho sobe 4 níveis)
import { Input } from '../../../../components/Input/index.tsx';
import { Button } from '../../../../components/Button/index.tsx';

// 2. Define as props que o "pai" (Register) vai passar
interface Step2Props {
  onNextStep: () => void; // Função para avançar para a próxima etapa
}

export function Step2({ onNextStep }: Step2Props) {
  // 3. Estado para controlar se é Pessoa Física (PF) ou Jurídica (PJ)
  const [tipoPessoa, setTipoPessoa] = useState<'pf' | 'pj'>('pf');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Impede o recarregamento da página

    // --- LÓGICA DA API (ETAPA 2) ---
    // Aqui você faria a chamada à sua API para ATUALIZAR
    // o usuário com os dados fiscais (CPF/CNPJ, etc.)
    // Se a API retornar sucesso...
    
    console.log('Etapa 2 concluída, avançando...');
    onNextStep(); // Chama a função do "pai" para mudar o estado para a Etapa 3
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '16px', fontSize: '14px' }}>
        <label htmlFor="tipoPessoa" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
          Tipo de Conta:
        </label>
        <select 
          id="tipoPessoa"
          value={tipoPessoa} 
          onChange={(e) => setTipoPessoa(e.target.value as 'pf' | 'pj')}
          style={{ width: '100%', padding: '10px', fontSize: '14px' }}
        >
          <option value="pf">Pessoa Física (CPF)</option>
          <option value="pj">Pessoa Jurídica (CNPJ)</option>
        </select>
      </div>


      {tipoPessoa === 'pf' ? (
        <>
          {/* --- CAMPOS PARA PESSOA FÍSICA --- */}
          <Input 
            type="text" 
            placeholder="CPF (apenas números)" 
            required 
            maxLength={11} 
          />
          <Input 
            type="text" 
            placeholder="Nacionalidade" 
            required 
          />
          <label style={{ fontSize: '14px', color: '#555' }}>Data de Nascimento:</label>
          <Input 
            type="date" 
            placeholder="Data de Nascimento" 
            required 
            style={{ marginTop: '4px' }}
          />
        </>
      ) : (
        <>
          <Input 
            type="text" 
            placeholder="CNPJ (apenas números)" 
            required 
            maxLength={14} 
          />
          <Input 
            type="text" 
            placeholder="Razão Social" 
            required 
          />
          <Input 
            type="text" 
            placeholder="Inscrição Estadual (se houver)" 
          />
        </>
      )}
      
      <Button type="submit" variant="primary">
        Continuar
      </Button>
    </form>
  );
}