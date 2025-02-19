import { GlobalOutlined, InstagramOutlined, PhoneOutlined } from '@ant-design/icons';
import styles from '../styles.module.scss';
import BrokerRelationCTA from './BrokerRelationCTA';
import { Link } from 'react-router-dom';

interface Props {
  data: any;
  activeTab: string;
  refetch: () => void;
}

const BrokerCard = ({ data, activeTab, refetch }: Props) => {
  return (
    <Link to={`/brokers/${1}`}>
      <div className={styles.brokerCard}>
        <div className={styles.brokerDetails}>
        <img className={styles.image} src={data.imageUrl} alt="Broker" />
          <div className={styles.details}>
            <div className={styles.brokerName}>{data.name}</div>
            <div className={styles.detail}><GlobalOutlined /> {data.websiteUrl || '--'}</div>
            <div className={styles.detail}><PhoneOutlined /> +91 {data.mobile || '--'}</div>
            <div className={styles.detail}><InstagramOutlined /> {data.instagramProfile || '--'}</div>
          </div>
        </div>
        <div className={styles.cta}>
          <BrokerRelationCTA brokerId={data.userId} activeTab={activeTab} refetch={refetch} />
        </div>
      </div>
    </Link>
  )
}

export default BrokerCard;