// src/components/Button/Button.jsx
import React from 'react';
import styles from './Button.module.css';

// Botão genérico utilizado nas páginas de cadastro, login e de tarefas

export default function Button({ children, type = 'button', onClick, className = '', ...props }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
