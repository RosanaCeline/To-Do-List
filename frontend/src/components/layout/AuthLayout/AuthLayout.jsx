import styles from './AuthLayout.module.css';

// Layout utilizado nas páginas de cadastro e login

export default function AuthLayout({ children, imageUrl, reverse }) {
  return (
    <div className={`${styles.container} ${reverse ? styles.reverse : ''}`}>
      <div className={styles.imageSide}>
        <img src={imageUrl} alt="Auth Illustration" className={styles.image} />
      </div>
      <div className={styles.contentSide}>
        <div className={styles.card}>{children}</div>
      </div>
    </div>
  );
}
