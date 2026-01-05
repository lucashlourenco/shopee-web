import React, { useState } from 'react';
import { Input } from '../../../../components/Input/index.tsx';
import { Button } from '../../../../components/Button/index.tsx';

interface Step2Props {
  onNextStep: (data: any) => void;
}

export function Step2({ onNextStep }: Step2Props) {
  // Estado para controlar se é CPF ou CNPJ
  const [docType, setDocType] = useState<'CPF' | 'CNPJ'>('CPF');
  const [document, setDocument] = useState('');
  const [phone, setPhone] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [error, setError] = useState('');

  // Máscara para CPF: 000.000.000-00
  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  // Máscara para CNPJ: 00.000.000/0000-00
  const formatCNPJ = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const formatPhone = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  };

  const handleDocChange = (value: string) => {
    if (docType === 'CPF') {
      setDocument(formatCPF(value));
    } else {
      setDocument(formatCNPJ(value));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const rawDoc = document.replace(/\D/g, '');
    const rawPhone = phone.replace(/\D/g, '');

    if (docType === 'CPF' && rawDoc.length !== 11) {
      setError('O CPF deve conter 11 dígitos.');
      return;
    }
    if (docType === 'CNPJ' && rawDoc.length !== 14) {
      setError('O CNPJ deve conter 14 dígitos.');
      return;
    }
    if (rawPhone.length < 10) {
      setError('Insira um número de telefone válido.');
      return;
    }

    setError('');
    onNextStep({ docType, document, phone, birthdate });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Informações do Vendedor</h3>

      {/* Seletor de Tipo de Pessoa */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '14px' }}>
          <input
            type="radio"
            name="docType"
            checked={docType === 'CPF'}
            onChange={() => { setDocType('CPF'); setDocument(''); }}
            style={{ marginRight: '8px', accentColor: '#ee4d2d' }}
          />
          Pessoa Física (CPF)
        </label>
        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '14px', }}>
          <input
            type="radio"
            name="docType"
            checked={docType === 'CNPJ'}
            onChange={() => { setDocType('CNPJ'); setDocument(''); }}
            style={{ marginRight: '8px', accentColor: '#ee4d2d' }}
          />
          Pessoa Jurídica (CNPJ)
        </label>
      </div>

      {error && (
        <div style={{ color: '#ee4d2d', textAlign: 'center', marginBottom: '15px', fontSize: '14px' }}>
          {error}
        </div>
      )}

      <Input
        label={docType === 'CPF' ? 'CPF' : 'CNPJ'}
        placeholder={docType === 'CPF' ? '000.000.000-00' : '00.000.000/0000-00'}
        value={document}
        onChange={(e) => {
          handleDocChange(e.target.value);
          if (error) setError('');
        }}
        required
      />

      <Input
        label="Telefone"
        placeholder="(00) 00000-0000"
        value={phone}
        onChange={(e) => {
          setPhone(formatPhone(e.target.value));
          if (error) setError('');
        }}
        required
      />

      <Input
        label="Data de Nascimento"
        type="date"
        value={birthdate}
        onChange={(e) => setBirthdate(e.target.value)}
        required
      />

      <Button type="submit" variant="primary">
        Continuar para os Dados da Loja
      </Button>
    </form>
  );
}