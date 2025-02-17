import styles from '../styles.module.scss';

interface Props {
  name: string;
  visits: number;
  requested: number;
}

const PersonalisedGreeting = ({ name, visits, requested }: Props) => {
  return (
    <div className={styles.personalisedGreeting}>
      <h3 className={styles.name}>Hi {name},</h3>
      <h1 className={styles.welcome}>Welcome back</h1>
      <div className={styles.message}>
        <p className={styles.dayType}>Busy day!</p>
        <p className={styles.visits}>You have</p>
        <p className={styles.visits}><span className={styles.visitNumber}>{visits}</span> visits scheduled and <span className={styles.visitNumber}>{requested}</span> visits requested</p>
      </div>
    </div>
  );
}

export default PersonalisedGreeting;