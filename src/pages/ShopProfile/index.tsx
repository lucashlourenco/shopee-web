import React, { useState } from 'react';
import { Sidebar } from '../../components/Sidebar/index.tsx';
import { Button } from '../../components/Button/index.tsx';
import './styles.css';

export function ShopProfile() {
  const [formData, setFormData] = useState({
    shopName: 'PP1 Eletro',
    description: '',
    phone: '',
    secondPhone: ''
  });

  // Função para formatar telefone (XX) XXXXX-XXXX
  const formatPhone = (value: string) => {
    const onlyNumbers = value.replace(/\D/g, "");
    return onlyNumbers
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1");
  };

  const handleChange = (field: string, value: string) => {
    let newValue = value;
    if (field === 'phone' || field === 'secondPhone') {
      newValue = formatPhone(value);
    }
    setFormData(prev => ({ ...prev, [field]: newValue }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Perfil salvo com sucesso!');
  };

  return (
    <div className="page-layout">
      <Sidebar />
      
      <main className="main-content">
        <div className="profile-container-vertical">
          
          {/* Aba Superior Simulada */}
          <div className="tab-header">
            <span className="tab-active">Informação Básica</span>
          </div>

          <form onSubmit={handleSubmit} className="profile-form-vertical">
            
            <h3 className="section-title">Informação Básica</h3>
            
            {/* Nome da Loja */}
            <div className="form-group">
              <label>Nome da Loja</label>
              <input 
                type="text"
                className="input-field"
                value={formData.shopName}
                onChange={e => handleChange('shopName', e.target.value)}
              />
            </div>

            {/* Logo da Loja */}
            <div className="form-group logo-group">
              <label className="main-label">Shop Logo</label>
              <div className="logo-controls">
                <span className="sub-label">Logo</span>
                <div className="file-input-row">
                  <span className="edit-text">Editar</span>
                  <input type="file" accept="image/*" />
                </div>
              </div>
              <ul className="logo-info-list">
                <li>Dimensões: 300x300px</li>
                <li>Tamanho máx: 2.0MB</li>
                <li>Formato: JPG,JPEG,PNG</li>
              </ul>
            </div>

            {/* Descrição */}
            <div className="form-group">
              <label>Descrição da loja</label>
              <textarea 
                className="textarea-field"
                rows={5}
                value={formData.description}
                onChange={e => handleChange('description', e.target.value)}
              />
            </div>

            {/* Informações de Contato */}
            <h3 className="section-title mt-4">Informações de Contato</h3>

            <div className="form-group">
              <label>Telefone</label>
              <input 
                type="text"
                className="input-field"
                placeholder="(00) 00000-0000"
                value={formData.phone}
                onChange={e => handleChange('phone', e.target.value)}
                maxLength={15}
              />
            </div>

            <div className="form-group">
              <label>Segundo Telefone</label>
              <input 
                type="text"
                className="input-field"
                placeholder="(00) 00000-0000"
                value={formData.secondPhone}
                onChange={e => handleChange('secondPhone', e.target.value)}
                maxLength={15}
              />
            </div>

            {/* Botão Salvar */}
            <div className="form-actions">
              <Button type="submit" style={{ width: '100px', backgroundColor: '#ee4d2d' }}>
                Salvar
              </Button>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
}