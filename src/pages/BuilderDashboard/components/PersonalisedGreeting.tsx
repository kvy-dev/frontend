import styles from '../styles.module.scss';
import clock from "../../../assets/clock.png";

interface Props {
  name: string;
  visits: number;
  requested: number;
}

const PersonalisedGreeting = ({ name, visits, requested }: Props) => {
  const message = visits < 5 ? 'Relaxed day 😄' : 'Busy day 😮‍💨';

  return (
    <div className={styles.personalisedGreeting}>
      <h3 className={styles.name}>Hi {name},</h3>
      <h1 className={styles.welcome}>Welcome back</h1>
      <div className={styles.message}>
        <img src={clock} style={{ height: '120px', position: 'absolute', right: '10px', top: '-10%' }} />
        <p className={styles.dayType}>{message}</p>
        <p className={styles.visits}>You have</p>
        <p className={styles.visits}><span className={styles.visitNumber}>{visits}</span> visits scheduled and <span className={styles.visitNumber}>{requested}</span> visits requested</p>
      </div>
    </div>
  );
}

export default PersonalisedGreeting;