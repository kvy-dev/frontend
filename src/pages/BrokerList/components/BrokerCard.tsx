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
    <Link to={`/brokers/${data.userId}`}>
      <div className={styles.brokerCard}>
        <div className={styles.brokerDetails}>
        <img className={styles.image} src={data.imageUrl || 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg'} alt="Broker" />
          <div className={styles.details}>
            <div className={styles.brokerName}>{data.name || `User ${data.userId}`}</div>
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