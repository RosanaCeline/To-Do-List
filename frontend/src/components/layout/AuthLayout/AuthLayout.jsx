import { useEffect } from "react";
import styles from './AuthLayout.module.css';

// Layout utilizado nas páginas de cadastro e login

export default function AuthLayout({ title, children, imageUrl, reverse }) {
  useEffect(() => {
    document.title = title;
  }, [title]);

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
