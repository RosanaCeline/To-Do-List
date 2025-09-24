import styles from './InputField.module.css';

// Componente do input + erro utilizado nas páginas de cadastro e login

export default function InputField({ type = 'text', placeholder, value, onChange, required = false, autoComplete, error }) {
  return (
    <div className={styles.container}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        className={`${styles.input} ${error ? styles.inputError : ''}`}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
