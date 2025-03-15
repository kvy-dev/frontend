import styles from '../styles.module.scss';

interface SplashScreenProps {
  navigateTo: (a: string) => void;
  handleAuthTypeChange: (a: string) => void;
}

const SplashScreen = ({ navigateTo, handleAuthTypeChange }: SplashScreenProps) => {
  const handleClick = (type: string) => {
    navigateTo(type);
    handleAuthTypeChange(type);
  }

  return (
    <div className={styles.splashScreenContainer}>
      <div className={styles.splashScreen}>
        <img src="/logo.jpeg" alt="logo" className={styles.logo} />
        <div className={styles.buttons}>
          <div className={styles.signup} onClick={() => handleClick('signup')}>Create account</div>
          <div className={styles.login} onClick={() => handleClick('login')}>Login</div>
        </div>
      </div>
    </div>
  );
}

export default SplashScreen;