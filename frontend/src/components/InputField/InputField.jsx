import styles from './InputField.module.css';

export default function InputField({ type = 'text', placeholder, value, onChange, required = false, error }) {
  return (
    <div className={styles.container}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`${styles.input} ${error ? styles.inputError : ''}`}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
