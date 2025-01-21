import styles from '../styles.module.scss';

const SplashScreen = () => {
  return (
    <div className={styles.container}>
      <div className={styles.splashScreen}>
        <h1>KNOW YOUR VISITOR</h1>
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 300 300">
          <polygon points="0,300 300,300 300,150 150,0 0,150" fill="none" stroke="#ECE0FC" stroke-width="6" />

          <circle cx="150" cy="120" r="20" fill="none" stroke="#ECE0FC" stroke-width="6" />
          <path d="M130 160 Q150 200 170 160 Q170 220 130 220 Z" fill="none" stroke="#ECE0FC" stroke-width="6" />

          <circle cx="150" cy="180" r="60" fill="none" stroke="#ECE0FC" stroke-width="6" />
          <line x1="195" y1="195" x2="240" y2="240" stroke="#ECE0FC" stroke-width="6" />
        </svg>

        <div className={styles.buttons}>
          <div className={styles.signup}>Create account</div>
          <div className={styles.login}>Login</div>
        </div>
      </div>
    </div>
  );
}

export default SplashScreen;