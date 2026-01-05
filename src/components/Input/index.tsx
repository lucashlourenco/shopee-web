import React, { InputHTMLAttributes } from 'react';
import './styles.css';

// 1. Extendemos as propriedades padrão do HTML Input para incluir o 'label'
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, ...props }: InputProps) {
  return (
    <div className="input-group" style={{ marginBottom: '15px', width: '100%' }}>

      {/* 2. Se a prop 'label' for passada, ela aparece aqui */}
      {label && (
        <label
          style={{
            display: 'block',
            marginBottom: '5px',
            fontSize: '14px',
            fontWeight: '600',
            color: '#333',
            textAlign: 'left'
          }}
        >
          {label}
        </label>
      )}

      <input
        className="custom-input"
        {...props}
        style={{
          width: '100%',
          padding: '12px',
          borderRadius: '4px',
          border: '1px solid #dbdbdb',
          fontSize: '14px',
          outlineColor: '#ee4d2d' // Laranja Shopee
        }}
      />
    </div>
  );
}