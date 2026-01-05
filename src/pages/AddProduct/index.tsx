import React, { useState } from 'react';
import { Sidebar } from '../../components/Sidebar/index.tsx';
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

  // Estados de UI
  const [images, setImages] = useState<string[]>([]);
  const [variationName, setVariationName] = useState('');
  const [variations, setVariations] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // --- Funções Auxiliares ---

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);

      // Adiciona os arquivos ao estado de envio
      setSelectedFiles(prev => [...prev, ...filesArray]);

      // Gera os previews para exibição na tela
      const newPreviews = filesArray.map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newPreviews]);
    }
  };

  // FUNÇÃO PARA REMOVER IMAGEM
  const handleRemoveImage = (index: number) => {
    // Remove do array de arquivos reais
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));

    // Remove do array de URLs de preview
    const newImages = [...images];
    URL.revokeObjectURL(newImages[index]); // Limpa a memória
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleAddVariation = () => {
    if (variationName.trim()) {
      setVariations([...variations, variationName]);
      setVariationName('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const storedUser = localStorage.getItem('seller_user');
      const user = JSON.parse(storedUser || '{}');
      const shopId = user.shop?.id;

      if (!shopId) {
        alert('❌ Erro: Loja não encontrada. Faça login novamente.');
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('price', price);
      formData.append('stock', stock);
      formData.append('shopId', shopId);
      formData.append('variations', JSON.stringify(variations));

      selectedFiles.forEach((file) => {
        formData.append('files', file);
      });

      const response = await fetch('http://localhost:3333/products', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('✅ Produto cadastrado com sucesso!');
        setName('');
        setDescription('');
        setCategory('');
        setPrice('');
        setStock('');
        setImages([]);
        setSelectedFiles([]);
        setVariations([]);
      } else {
        const errorData = await response.json();
        alert(`❌ Erro: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Erro ao conectar com a API:", error);
      alert('❌ Erro de conexão: Verifique se o backend está ligado.');
    } finally {
      setLoading(false);
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
            <section className="form-section">
              <h3>Informações Básicas</h3>

              <div className="form-group">
                <label>Imagens do Produto * (Máx. 9)</label>
                <div className="image-upload-area">
                  {images.map((img, index) => (
                    <div key={index} className="preview-container">
                      <img src={img} alt="Preview" className="img-preview" />
                      <button
                        type="button"
                        className="remove-image-badge"
                        onClick={() => handleRemoveImage(index)}
                      >
                        ×
                      </button>
                    </div>
                  ))}

                  {images.length < 9 && (
                    <label className="upload-btn">
                      + Adicionar
                      <input
                        type="file"
                        onChange={handleImageUpload}
                        hidden
                        accept="image/*"
                        multiple // Permite selecionar vários de uma vez
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Nome do Produto *</label>
                <Input
                  placeholder="Nome do produto"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
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
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Estoque *</label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={stock}
                    onChange={e => setStock(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Variações (Ex: Cor, Tamanho)</label>
                <div className="variation-input-group">
                  <Input
                    placeholder="Ex: Vermelho, G..."
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
              <Button type="submit" disabled={loading} style={{ width: 'auto', padding: '0 40px' }}>
                {loading ? 'Publicando...' : 'Salvar e Publicar'}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}