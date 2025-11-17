import React from 'react';
import './styles.css';

// Usamos ButtonHTMLAttributes para aceitar props como onClick, disabled, etc.
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: 'primary' | 'social'; // Podemos ter variações
};

export function Button({ children, variant = 'primary', ...props }: ButtonProps) {
  // Define a classe CSS com base na variação
  const buttonClass = `custom-button ${variant}`;

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
}