import React, { useState } from 'react';
import axios from 'axios';
import { Input } from '../../../../components/Input/index.tsx';
import { Button } from '../../../../components/Button/index.tsx';

interface Step3Props {
  userDataFromSteps: any;
  onFinish: () => void;
}

export function Step3({ userDataFromSteps, onFinish }: Step3Props) {
  const [shopName, setShopName] = useState('');
  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const [loading, setLoading] = useState(false);
  const [loadingCep, setLoadingCep] = useState(false);
  const [error, setError] = useState('');

  // 1. Máscara para exibição do CEP (00000-000)
  const formatCEP = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1');
  };

  // 2. Busca automática de endereço via CEP
  const handleCEPChange = async (value: string) => {
    const maskedCep = formatCEP(value);
    setCep(maskedCep);

    const cleanCep = maskedCep.replace(/\D/g, '');

    if (cleanCep.length === 8) {
      setLoadingCep(true);
      setError('');
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cleanCep}/json/`);

        if (response.data.erro) {
          setError('CEP não encontrado. Verifique os números.');
          clearAddressFields();
        } else {
          setStreet(response.data.logradouro);
          setNeighborhood(response.data.bairro);
          setCity(response.data.localidade);
          setState(response.data.uf);
        }
      } catch (err) {
        setError('Erro ao buscar o endereço. Tente preencher manualmente.');
      } finally {
        setLoadingCep(false);
      }
    }
  };

  const clearAddressFields = () => {
    setStreet('');
    setNeighborhood('');
    setCity('');
    setState('');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    // 3. Validação do Nome da Loja (Mínimo 3 letras, sem caracteres especiais)
    const shopNameRegex = /^[a-zA-Z0-9 ]+$/;
    if (shopName.length < 3) {
      setError('O nome da loja deve ter pelo menos 3 caracteres.');
      return;
    }
    if (!shopNameRegex.test(shopName)) {
      setError('O nome da loja não pode conter símbolos (apenas letras e números).');
      return;
    }

    setLoading(true);

    const payload = {
      userData: {
        ...userDataFromSteps,
        role: 'SELLER',
      },
      addressData: {
        cep: cep.replace(/\D/g, ''),
        street,
        number,
        complement,
        neighborhood,
        city,
        state,
      },
      shopData: {
        name: shopName,
        description: `Loja oficial de ${shopName}`,
      },
    };

    try {
      await axios.post('http://localhost:3333/auth/register', payload);
      alert('Cadastro realizado com sucesso!');
      onFinish();
    } catch (error: any) {
      setError(error.response?.data?.error || 'Erro ao finalizar o cadastro.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div style={{ color: '#ee4d2d', backgroundColor: '#fff5f2', padding: '10px', borderRadius: '4px', marginBottom: '15px', fontSize: '14px', textAlign: 'center' }}>
          {error}
        </div>
      )}

      <Input
        label="Nome da Loja"
        placeholder="Ex: Insinuante Store"
        value={shopName}
        onChange={(e) => setShopName(e.target.value)}
        required
      />

      <Input
        label="CEP"
        placeholder="00000-000"
        value={cep}
        onChange={(e) => handleCEPChange(e.target.value)}
        required
        maxLength={9}
      />
      {loadingCep && <p style={{ fontSize: '12px', color: '#ee4d2d', marginTop: '-10px', marginBottom: '10px' }}>Buscando endereço...</p>}

      <Input
        label="Rua / Avenida"
        placeholder="Rua..."
        value={street}
        onChange={(e) => setStreet(e.target.value)}
        required
        disabled={!!street && !error} // Bloqueia se a API preencher
      />

      <div style={{ display: 'flex', gap: '16px' }}>
        <Input
          label="Número"
          placeholder="123"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
        />
        <Input
          label="Complemento"
          placeholder="Ex: Sala 2"
          value={complement}
          onChange={(e) => setComplement(e.target.value)}
        />
      </div>

      <Input
        label="Bairro"
        placeholder="Bairro"
        value={neighborhood}
        onChange={(e) => setNeighborhood(e.target.value)}
        required
        disabled={!!neighborhood && !error}
      />

      <div style={{ display: 'flex', gap: '16px' }}>
        <Input
          label="Cidade"
          placeholder="Cidade"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          disabled={!!city && !error}
        />
        <Input
          label="Estado"
          placeholder="UF"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
          maxLength={2}
          disabled={!!state && !error}
        />
      </div>

      <Button type="submit" variant="primary" disabled={loading || loadingCep}>
        {loading ? 'Finalizando...' : 'Concluir Cadastro'}
      </Button>
    </form>
  );
}