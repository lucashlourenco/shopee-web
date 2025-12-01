import React, { useState, useEffect } from 'react';
import { CATEGORIES_DATA, Category } from '../../utils/categories.ts';
import { Button } from '../Button/index.tsx';
import './styles.css';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (fullPath: string) => void;
}

export function CategoryModal({ isOpen, onClose, onConfirm }: CategoryModalProps) {
  const [selectedL1, setSelectedL1] = useState<Category | null>(null);
  const [selectedL2, setSelectedL2] = useState<Category | null>(null);
  const [selectedL3, setSelectedL3] = useState<Category | null>(null);

  // Reseta as seleções ao fechar/abrir
  useEffect(() => {
    if (isOpen) {
      setSelectedL1(null);
      setSelectedL2(null);
      setSelectedL3(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (selectedL1 && selectedL2 && selectedL3) {
      const fullPath = `${selectedL1.name} > ${selectedL2.name} > ${selectedL3.name}`;
      onConfirm(fullPath);
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <header className="modal-header">
          <h3>Editar Categoria</h3>
          <button onClick={onClose} className="close-btn">×</button>
        </header>

        <div className="category-columns">
          {/* Coluna 1 */}
          <ul className="cat-list">
            {CATEGORIES_DATA.map(cat => (
              <li 
                key={cat.id} 
                className={selectedL1?.id === cat.id ? 'active' : ''}
                onClick={() => { setSelectedL1(cat); setSelectedL2(null); setSelectedL3(null); }}
              >
                {cat.name} <span>›</span>
              </li>
            ))}
          </ul>

          {/* Coluna 2 */}
          <ul className="cat-list">
            {selectedL1?.subcategories?.map(cat => (
              <li 
                key={cat.id} 
                className={selectedL2?.id === cat.id ? 'active' : ''}
                onClick={() => { setSelectedL2(cat); setSelectedL3(null); }}
              >
                {cat.name} <span>›</span>
              </li>
            ))}
          </ul>

          {/* Coluna 3 */}
          <ul className="cat-list">
            {selectedL2?.subcategories?.map(cat => (
              <li 
                key={cat.id} 
                className={selectedL3?.id === cat.id ? 'active' : ''}
                onClick={() => setSelectedL3(cat)}
              >
                {cat.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="modal-footer">
          <p>
            Selecionado: 
            <strong>
              {selectedL1 ? ` ${selectedL1.name}` : ''} 
              {selectedL2 ? ` > ${selectedL2.name}` : ''} 
              {selectedL3 ? ` > ${selectedL3.name}` : ''}
            </strong>
          </p>
          <div className="modal-actions">
            <button onClick={onClose} className="btn-cancel">Cancelar</button>
            <Button 
              onClick={handleConfirm} 
              disabled={!selectedL3} 
              style={{width: 'auto', padding: '10px 20px'}}
            >
              Confirmar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}