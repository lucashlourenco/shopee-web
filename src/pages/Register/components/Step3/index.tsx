import React, { useState } from 'react';
import axios from 'axios';
import { Input } from '../../../../components/Input/index.tsx';
import { Button } from '../../../../components/Button/index.tsx';

// Define as props, incluindo o userData vindo dos passos anteriores
interface Step3Props {
  userDataFromSteps: any; // Dados do Step 1 e 2 (nome, email, senha, etc)
  onFinish: () => void;   // Função para redirecionar após o sucesso
}

export function Step3({ userDataFromSteps, onFinish }: Step3Props) {
  // Estados para os campos do Step 3
  const [shopName, setShopName] = useState('');
  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    // Estrutura do payload conforme esperado pelo Backend
    const payload = {
      userData: {
        ...userDataFromSteps,
        role: 'SELLER', // Garante que o usuário será um vendedor
      },
      addressData: {
        cep,
        street,
        number,
        complement,
        neighborhood,
        city,
        state,
      },
      shopData: {
        name: shopName,
        description: `Loja oficial de ${shopName}`, // Descrição padrão ou vinda de um novo campo
      },
    };

    try {
      // Chamada para a rota de registro que cria User, Address e Shop
      await axios.post('http://localhost:3333/auth/register', payload);
      
      alert('Cadastro de vendedor e loja realizado com sucesso!');
      onFinish(); // Redireciona para o login ou dashboard
    } catch (error: any) {
      console.error('Erro ao finalizar cadastro:', error.response?.data || error.message);
      alert('Erro ao finalizar o cadastro. Verifique os dados e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input 
        type="text" 
        placeholder="Nome da Loja" 
        value={shopName}
        onChange={(e) => setShopName(e.target.value)}
        required 
      />
      <Input 
        type="text" 
        placeholder="CEP (apenas números)" 
        value={cep}
        onChange={(e) => setCep(e.target.value)}
        required 
        maxLength={8}
      />
      <Input 
        type="text" 
        placeholder="Rua / Avenida" 
        value={street}
        onChange={(e) => setStreet(e.target.value)}
        required 
      />
      
      <div style={{ display: 'flex', gap: '16px' }}>
        <Input 
          type="text" 
          placeholder="Número" 
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required 
          style={{ flex: 1 }} 
        />
        <Input 
          type="text" 
          placeholder="Complemento" 
          value={complement}
          onChange={(e) => setComplement(e.target.value)}
          style={{ flex: 2 }} 
        />
      </div>

      <Input 
        type="text" 
        placeholder="Bairro" 
        value={neighborhood}
        onChange={(e) => setNeighborhood(e.target.value)}
        required 
      />
      <Input 
        type="text" 
        placeholder="Cidade" 
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required 
      />
      <Input 
        type="text" 
        placeholder="Estado (Ex: PE)" 
        value={state}
        onChange={(e) => setState(e.target.value)}
        required 
        maxLength={2}
      />
      
      <Button type="submit" variant="primary" disabled={loading}>
        {loading ? 'Processando...' : 'Finalizar Cadastro'}
      </Button>
    </form>
  );
}