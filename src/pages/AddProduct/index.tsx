import React, { useState } from 'react';
import { Sidebar } from '../../components/Sidebar/index.tsx'; // Importe a sidebar que criamos
import { Input } from '../../components/Input/index.tsx';
import { Button } from '../../components/Button/index.tsx';
import { CategoryModal } from '../../components/CategoryModal/index.tsx';
import './styles.css';

export function AddProduct() {
  // Estados do Formulário
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // Imagens
  const [images, setImages] = useState<string[]>([]);

  // Variações
  const [variationName, setVariationName] = useState('');
  const [variations, setVariations] = useState<string[]>([]);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- Funções Auxiliares ---

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFiles([...selectedFiles, file]); // Salva o arquivo real para o upload
      const previewUrl = URL.createObjectURL(file);
      setImages([...images, previewUrl]);
    }
  };

  const handleAddVariation = () => {
    if (variationName.trim()) {
      setVariations([...variations, variationName]);
      setVariationName('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('price', price);
      formData.append('stock', stock);
      formData.append('variations', JSON.stringify(variations));

      // Envia os arquivos físicos para o Multer no backend
      selectedFiles.forEach((file) => {
        formData.append('files', file);
      });

      const response = await fetch('http://localhost:3333/products', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('✅ Produto cadastrado com sucesso no PostgreSQL e imagem no Cloudinary!');
        // Limpa os campos após o sucesso
        setName('');
        setDescription('');
        setPrice('');
        setStock('');
        setImages([]);
        setSelectedFiles([]);
      } else {
        const errorData = await response.json();
        alert(`❌ Erro: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Erro ao conectar com a API:", error);
      alert('❌ O servidor Backend (insinuante-api) está desligado.');
    }
  };

  return (
    <div className="page-layout">
      <Sidebar />

      <main className="main-content">
        <CategoryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={(path) => setCategory(path)}
        />

        <div className="product-container">
          <h2>Adicionar Novo Produto</h2>

          <form onSubmit={handleSubmit}>
            {/* Seção 1: Informações Básicas */}
            <section className="form-section">
              <h3>Informações Básicas</h3>

              <div className="form-group">
                <label>Imagens do Produto *</label>
                <div className="image-upload-area">
                  {images.map((img, index) => (
                    <img key={index} src={img} alt="Preview" className="img-preview" />
                  ))}
                  <label className="upload-btn">
                    + Adicionar Imagem
                    <input type="file" onChange={handleImageUpload} hidden accept="image/*" />
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>Nome do Produto *</label>
                <Input
                  placeholder="Nome do produto"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Categoria *</label>
                <div
                  className="category-trigger"
                  onClick={() => setIsModalOpen(true)}
                >
                  {category || 'Selecione uma categoria...'}
                  <span className="edit-icon">✎</span>
                </div>
              </div>

              <div className="form-group">
                <label>Descrição do Produto</label>
                <textarea
                  rows={5}
                  className="custom-textarea"
                  placeholder="Descreva seu produto..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>
            </section>

            {/* Seção 2: Informações de Venda */}
            <section className="form-section">
              <h3>Informações de Venda</h3>

              <div className="form-row">
                <div className="form-group">
                  <label>Preço (R$) *</label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Estoque *</label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={stock}
                    onChange={e => setStock(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Variações (Ex: Cor, Tamanho)</label>
                <div className="variation-input-group">
                  <Input
                    placeholder="Ex: Vermelho, Azul, G, M..."
                    value={variationName}
                    onChange={e => setVariationName(e.target.value)}
                    style={{ marginBottom: 0 }}
                  />
                  <button type="button" onClick={handleAddVariation} className="add-var-btn">
                    Adicionar
                  </button>
                </div>

                <div className="variations-list">
                  {variations.map((v, idx) => (
                    <span key={idx} className="variation-tag">{v}</span>
                  ))}
                </div>
              </div>
            </section>

            <div className="form-actions">
              <Button type="button" variant="social" style={{ width: 'auto' }}>Cancelar</Button>
              <Button type="submit" style={{ width: 'auto', padding: '0 40px' }}>Salvar e Publicar</Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}