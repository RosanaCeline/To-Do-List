import React from "react";
import styles from "./CancelButton.module.css";

// Botão específico para cancelar a task

export default function CancelButton({ 
  children, 
  onClick, 
  className = "", 
  type = "button", 
  resetCallback,
  ...props 
}) {
  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (resetCallback) resetCallback();
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`${styles.button} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
