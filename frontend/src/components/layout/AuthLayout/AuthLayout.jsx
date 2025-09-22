import styles from './authlayout.module.css';

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
