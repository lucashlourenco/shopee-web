import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Sidebar } from '../../components/Sidebar/index.tsx';
import { Input } from '../../components/Input/index.tsx';
import { Button } from '../../components/Button/index.tsx';
import './styles.css';

export function AccountSettings() {
  // Estados para os dados do utilizador
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Novo campo de confirmação
  const [phone, setPhone] = useState('');
  const [birthdate, setBirthdate] = useState('');

  // Estados de controlo
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Recupera o ID do utilizador logado
  const sellerData = JSON.parse(localStorage.getItem('seller_user') || '{}');
  const userId = sellerData.id;

  // 1. Carregar dados atuais do banco de dados ao abrir a página
  useEffect(() => {
    async function loadUserData() {
      if (!userId) {
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`http://localhost:3333/users/${userId}`);
        const user = response.data;

        setName(user.name || '');
        setEmail(user.email || '');
        setPassword(user.password || '');
        setConfirmPassword(user.password || ''); // Inicializa a confirmação igual à senha
        setPhone(user.phone || '');

        // Formata a data para o padrão yyyy-MM-dd exigido pelo <input type="date">
        if (user.birthdate) {
          setBirthdate(new Date(user.birthdate).toISOString().split('T')[0]);
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    }
    loadUserData();
  }, [userId]);

  // 2. Função para Guardar Alterações
  const handleUpdateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validação de Senha
    if (password !== confirmPassword) {
      setError('As senhas não coincidem!');
      return;
    }

    if (password.length < 8) {
      setError('A senha deve ter pelo menos 8 caracteres.');
      return;
    }

    setSaving(true);

    try {
      const response = await axios.put(`http://localhost:3333/users/${userId}`, {
        name,
        email,
        password,
        phone,
        birthdate
      });

      alert('Dados da conta atualizados com sucesso!');

      // Atualiza o localStorage para manter o nome e email sincronizados no sistema
      const updatedUser = { ...response.data };
      localStorage.setItem('seller_user', JSON.stringify(updatedUser));

    } catch (error: any) {
      console.error(error);
      setError(error.response?.data?.error || 'Erro ao atualizar dados.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="settings-layout">
      <Sidebar />
      <main className="settings-content"><p>A carregar...</p></main>
    </div>
  );

  return (
    <div className="settings-layout">
      <Sidebar />

      <main className="settings-content">
        <header className="page-header">
          <h2>Configurações da Conta</h2>
          <p>Gira as tuas informações pessoais e de segurança.</p>
        </header>

        <div className="settings-card">
          {error && (
            <div style={{ color: '#ee4d2d', backgroundColor: '#fff5f2', padding: '10px', borderRadius: '4px', marginBottom: '20px', fontSize: '14px', textAlign: 'center', border: '1px solid #ee4d2d' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleUpdateAccount}>
            <section className="settings-section">
              <h3>Perfil Público</h3>

              <Input
                label="Nome Completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <Input
                label="E-mail de Acesso"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </section>

            <section className="settings-section">
              <h3>Segurança</h3>
              <div className="input-row">
                <Input
                  label="Nova Senha"
                  type="password"
                  placeholder="Deixe como está para não alterar"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Input
                  label="Confirmar Senha"
                  type="password"
                  placeholder="Repita a Senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </section>

            <section className="settings-section" style={{ borderBottom: 'none' }}>
              <h3>Informações de Contacto</h3>
              <div className="input-row">
                <Input
                  label="Telemóvel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(00) 00000-0000"
                />
                <Input
                  label="Data de Nascimento"
                  type="date"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                />
              </div>
            </section>

            <div className="settings-actions">
              <Button type="submit" disabled={saving}>
                {saving ? 'A guardar...' : 'Guardar Alterações'}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}