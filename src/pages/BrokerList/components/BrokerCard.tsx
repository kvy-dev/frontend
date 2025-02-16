import { InstagramOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import styles from '../styles.module.scss';
import BrokerRelationCTA from './BrokerRelationCTA';
import { Link } from 'react-router-dom';

interface Props {
  data: any;
}

const BrokerCard = ({ data }: Props) => {

  function formatDate(dateString: string) {
    const date = new Date(dateString);
  
    // Get day, month, year
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" }); // Jan, Feb, etc.
    const year = date.getFullYear();
  
    // Add ordinal suffix to the day
    const suffix = (d: any) => {
      if (d > 3 && d < 21) return "th"; // Covers 11th, 12th, 13th
      switch (d % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };
  
    return `${day}${suffix(day)} ${month} ${year}`;
  }


  return (
    <Link to={`/brokers/${1}`}>
      <div className={styles.brokerCard}>
        <div className={styles.brokerDetails}>
        <img className={styles.image} src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D" alt="Broker" />
          <div className={styles.details}>
            <div className={styles.brokerName}>Elan Sal</div>
            <div className={styles.detail}><MailOutlined /> elan.sal@gmail.com</div>
            <div className={styles.detail}><PhoneOutlined /> +91 950638289</div>
            <div className={styles.detail}><InstagramOutlined /> @elansal</div>
          </div>
        </div>
        <div className={styles.cta}>
          <BrokerRelationCTA brokerId={1} />
        </div>
      </div>
    </Link>
  )
}

export default BrokerCard;