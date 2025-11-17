import React from 'react';
import './styles.css';

// Usamos InputHTMLAttributes para que nosso componente aceite
// todas as propriedades de um <input> normal (como placeholder, type, etc.)
type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input(props: InputProps) {
  return (
    <input className="custom-input" {...props} />
  );
}