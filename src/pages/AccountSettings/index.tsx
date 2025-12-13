import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../components/Sidebar/index.tsx';
import { Input } from '../../components/Input/index.tsx';
import { Button } from '../../components/Button/index.tsx';
import './styles.css';

export function AccountSettings() {
  // Estado inicial
  const [profile, setProfile] = useState({
    nome: 'Lucas Lourenço',
    email: 'lucas@exemplo.com',
    cpf: '***.456.789-**'
  });

  // 1. (NOVO) Ao carregar a tela, tenta buscar dados salvos no navegador
  useEffect(() => {
    const dadosSalvos = localStorage.getItem('shopee_user_profile');
    if (dadosSalvos) {
      setProfile(JSON.parse(dadosSalvos));
    }
  }, []);

  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 2. (NOVO) Salva no "banco de dados" do navegador (LocalStorage)
    localStorage.setItem('shopee_user_profile', JSON.stringify(profile));
    
    alert('Dados do perfil atualizados e salvos!');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.new !== passwordData.confirm) {
      alert('A nova senha e a confirmação não coincidem!');
      return;
    }
    // Aqui seria uma chamada para API real
    alert('Senha alterada com sucesso!');
    setPasswordData({ current: '', new: '', confirm: '' });
  };

  return (
    <div className="page-layout">
      <Sidebar />
      <main className="main-content">
        <div className="settings-container">
          <header className="page-header">
            <h2>Configurações da Conta</h2>
            <p>Gerencie seus dados de acesso e segurança pessoal</p>
          </header>

          <div className="settings-grid">
            {/* Coluna da Esquerda: Dados Pessoais */}
            <section className="settings-card">
              <h3>Meu Perfil</h3>
              <form onSubmit={handleUpdateProfile}>
                <div className="form-group">
                  <label>Nome Completo</label>
                  <Input 
                    value={profile.nome} 
                    onChange={e => setProfile({...profile, nome: e.target.value})} 
                  />
                </div>
                <div className="form-group">
                  <label>Email de Login</label>
                  <Input 
                    value={profile.email} 
                    onChange={e => setProfile({...profile, email: e.target.value})} 
                  />
                </div>
                <div className="form-group">
                  <label>CPF (Não editável)</label>
                  <Input 
                    value={profile.cpf} 
                    disabled 
                    style={{ backgroundColor: '#f0f0f0', color: '#888' }} 
                  />
                </div>
                <Button type="submit">Salvar Perfil</Button>
              </form>
            </section>

            {/* Coluna da Direita: Segurança */}
            <section className="settings-card">
              <h3>Alterar Senha</h3>
              <form onSubmit={handleChangePassword}>
                <div className="form-group">
                  <label>Senha Atual</label>
                  <Input 
                    type="password" 
                    placeholder="Digite sua senha atual"
                    value={passwordData.current}
                    onChange={e => setPasswordData({...passwordData, current: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Nova Senha</label>
                  <Input 
                    type="password" 
                    placeholder="Mínimo 6 caracteres"
                    value={passwordData.new}
                    onChange={e => setPasswordData({...passwordData, new: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Confirmar Nova Senha</label>
                  <Input 
                    type="password" 
                    placeholder="Repita a nova senha"
                    value={passwordData.confirm}
                    onChange={e => setPasswordData({...passwordData, confirm: e.target.value})}
                  />
                </div>
                <Button type="submit" style={{ backgroundColor: '#fff', color: '#333', border: '1px solid #ccc' }}>
                  Atualizar Senha
                </Button>
              </form>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}