import React from 'react';
import './styles.css';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input(props: InputProps) {
  return (
    <input className="custom-input" {...props} />
  );
}