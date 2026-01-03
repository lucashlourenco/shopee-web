import React, { useState } from 'react';
import { Input } from '../../../../components/Input/index.tsx';
import { Button } from '../../../../components/Button/index.tsx';

interface Step2Props {
  onNextStep: (data: any) => void; // Atualizado para receber dados
}

export function Step2({ onNextStep }: Step2Props) {
  const [tipoPessoa, setTipoPessoa] = useState<'pf' | 'pj'>('pf');
  const [doc, setDoc] = useState(''); // CPF ou CNPJ
  const [birthdate, setBirthdate] = useState('');
  const [phone, setPhone] = useState(''); // Adicionado para bater com o DB

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Mapeia os dados para os campos que o backend espera
    onNextStep({ 
      cpf: doc, 
      birthdate, 
      phone 
    });
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

      <Input 
        type="text" 
        placeholder={tipoPessoa === 'pf' ? "CPF (apenas números)" : "CNPJ (apenas números)"}
        value={doc}
        onChange={(e) => setDoc(e.target.value)}
        required 
        maxLength={tipoPessoa === 'pf' ? 11 : 14} 
      />

      <Input 
        type="text" 
        placeholder="Telefone de contato" 
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required 
      />

      {tipoPessoa === 'pf' && (
        <>
          <label style={{ fontSize: '14px', color: '#555' }}>Data de Nascimento:</label>
          <Input 
            type="date" 
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            required 
            style={{ marginTop: '4px' }}
          />
        </>
      )}
      
      <Button type="submit" variant="primary">
        Continuar
      </Button>
    </form>
  );
}