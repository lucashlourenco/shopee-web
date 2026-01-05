import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Sidebar } from '../../components/Sidebar/index.tsx';
import { Input } from '../../components/Input/index.tsx';
import { Button } from '../../components/Button/index.tsx';
import './styles.css';

export function ShopProfile() {
  // Estados para os dados da loja
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  // Estados de controlo de interface
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Referência para o input de ficheiro (que fica escondido)
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Recupera os dados do vendedor e o ID da loja
  const sellerData = JSON.parse(localStorage.getItem('seller_user') || '{}');
  const shopId = sellerData.shop?.id;

  // 1. Carregar dados iniciais da loja
  useEffect(() => {
    async function loadShopData() {
      if (!shopId) {
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`http://localhost:3333/shops/${shopId}`);
        setName(response.data.name || '');
        setDescription(response.data.description || '');
        setImage(response.data.image || '');
      } catch (error) {
        console.error("Erro ao carregar loja:", error);
      } finally {
        setLoading(false);
      }
    }
    loadShopData();
  }, [shopId]);

  // 2. Função para processar o Upload da Imagem
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Criar o FormData para enviar o ficheiro
    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);
    try {
      const response = await axios.post('http://localhost:3333/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      // Atualiza o estado da imagem com a URL retornada pelo Cloudinary
      setImage(response.data.url);
    } catch (error) {
      console.error("Erro no upload:", error);
      alert("Erro ao carregar a imagem. Tente novamente.");
    } finally {
      setUploading(false);
    }
  };

  // 3. Função para Guardar as alterações do perfil
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await axios.put(`http://localhost:3333/shops/${shopId}`, {
        name,
        description,
        image
      });

      alert('Perfil atualizado com sucesso!');

      // Atualiza o localStorage para refletir o novo nome no Dashboard
      const updatedSeller = {
        ...sellerData,
        shop: { ...sellerData.shop, name: name }
      };
      localStorage.setItem('seller_user', JSON.stringify(updatedSeller));

    } catch (error) {
      console.error("Erro ao guardar:", error);
      alert('Erro ao guardar as alterações.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="shop-profile-layout">
        <Sidebar />
        <main className="shop-profile-content">
          <p>A carregar dados do perfil...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="shop-profile-layout">
      <Sidebar />

      <main className="shop-profile-content">
        <header className="page-header">
          <h2>Perfil da Loja</h2>
          <p>Altere as informações públicas da sua Loja.</p>
        </header>

        <form onSubmit={handleSaveProfile} className="profile-card">

          {/* Seção de Foto */}
          <div className="image-upload-section">
            <div
              className="avatar-wrapper"
              onClick={() => fileInputRef.current?.click()}
              title="Clique para alterar a foto"
            >
              <img
                src={image || 'https://placehold.co/400'}
                alt="Logo da Loja"
                className={`shop-logo-preview ${uploading ? 'uploading' : ''}`}
              />
              <div className="avatar-overlay">
                <span>{uploading ? 'A carregar...' : 'Alterar Foto'}</span>
              </div>
            </div>

            {/* Input de ficheiro escondido */}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleFileChange}
            />

            <p className="upload-hint">Formatos aceites: JPG, PNG. Máx 2MB.</p>
          </div>

          {/* Seção de Dados */}
          <div className="form-fields-section">
            <Input
              label="Nome da Loja"
              placeholder="Nome da tua loja"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <div className="description-group">
              <label>Descrição da Loja</label>
              <textarea
                placeholder="Escreve uma breve descrição sobre a tua loja..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="custom-textarea"
              />
            </div>

            <div className="form-actions">
              <Button type="submit" disabled={saving || uploading}>
                {saving ? 'Salvando...' : 'Salvar Alterações'}
              </Button>
            </div>
          </div>

        </form>
      </main>
    </div>
  );
}