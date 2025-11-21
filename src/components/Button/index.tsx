import React from 'react';
import './styles.css';


type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: 'primary' | 'social';
};

export function Button({ children, variant = 'primary', ...props }: ButtonProps) {
  const buttonClass = `custom-button ${variant}`;

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
}