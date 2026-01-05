import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Sidebar } from '../../components/Sidebar/index.tsx';
import { Input } from '../../components/Input/index.tsx';
import { Button } from '../../components/Button/index.tsx';
import { CategoryModal } from '../../components/CategoryModal/index.tsx';
import './styles.css';

export function EditProduct() {
  const { id } = useParams(); // Pega o ID da URL (/editar-produto/:id)
  const navigate = useNavigate();
  
  // Estados do Formulário
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // Estados de UI
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 1. Carregar os dados atuais do produto
  useEffect(() => {
    async function loadProduct() {
      try {
        const response = await axios.get(`http://localhost:3333/products/${id}`);
        const p = response.data;
        
        setName(p.name);
        setDescription(p.description);
        setCategory(p.category);
        setPrice(p.price.toString());
        setStock(p.stock.toString());
        setImages(p.images || [p.image]);
      } catch (error) {
        console.error("Erro ao carregar produto:", error);
        alert("Erro ao carregar dados do produto.");
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [id]);

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    // Nota: Se remover imagens novas (blob), deve-se remover de selectedFiles também
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Aqui enviamos um PUT para atualizar
      await axios.put(`http://localhost:3333/products/${id}`, {
        name,
        description,
        category,
        price,
        stock,
        images // Enviamos a lista de URLs que restou
      });

      alert('✅ Produto atualizado com sucesso!');
      navigate('/meus-produtos'); // Volta para a lista
    } catch (error) {
      alert('❌ Erro ao atualizar produto.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="page-layout"><Sidebar /><main className="main-content">Carregando...</main></div>;

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
          <h2>Editar Produto</h2>
          <form onSubmit={handleSubmit}>
            <section className="form-section">
              <div className="form-group">
                <label>Imagens do Produto</label>
                <div className="image-upload-area">
                  {images.map((img, index) => (
                    <div key={index} className="preview-container">
                      <img src={img} alt="Preview" className="img-preview" />
                      <button type="button" className="remove-image-badge" onClick={() => handleRemoveImage(index)}>×</button>
                    </div>
                  ))}
                </div>
              </div>

              <Input label="Nome do Produto" value={name} onChange={e => setName(e.target.value)} required />
              
              <div className="form-group">
                <label>Categoria</label>
                <div className="category-trigger" onClick={() => setIsModalOpen(true)}>
                  {category || 'Selecione uma categoria...'}
                </div>
              </div>

              <div className="form-group">
                <label>Descrição</label>
                <textarea 
                  className="custom-textarea" 
                  value={description} 
                  onChange={e => setDescription(e.target.value)} 
                  rows={5} 
                />
              </div>

              <div className="form-row">
                <Input label="Preço" type="number" value={price} onChange={e => setPrice(e.target.value)} required />
                <Input label="Estoque" type="number" value={stock} onChange={e => setStock(e.target.value)} required />
              </div>
            </section>

            <div className="form-actions">
              <Button type="button" variant="social" onClick={() => navigate('/meus-produtos')}>Cancelar</Button>
              <Button type="submit" disabled={saving}>
                {saving ? 'Salvando...' : 'Salvar Alterações'}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}