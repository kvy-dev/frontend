import styles from '../styles.module.scss';

interface Props {
  name: string;
  visits: number;
}

const PersonalisedGreeting = ({ name, visits }: Props) => {
  const message = visits < 5 ? 'Relaxed day 😄' : 'Busy day 😮‍💨';

  return (
    <div className={styles.personalisedGreeting}>
      <h3 className={styles.name}>Hi {name},</h3>
      <h1 className={styles.welcome}>Welcome back</h1>
      <div className={styles.message}>
        <img src="src/assets/clock.png" style={{ height: '120px', position: 'absolute', right: '10px', top: '-10%' }} />
        <p className={styles.dayType}>{message}</p>
        <p className={styles.visits}>You have</p>
        <p className={styles.visits}><span className={styles.visitNumber}>{visits}</span> visits scheduled</p>
      </div>
    </div>
  );
}

export default PersonalisedGreeting;