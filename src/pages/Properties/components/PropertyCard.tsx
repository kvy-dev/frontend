import { BuildOutlined, ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import styles from '../styles.module.scss';
import QrCodeScanner from '@/components/QRScanner';
import { Tag } from 'antd';
import ScheduleVisitCTA from './ScheduleVisitCTA';
import AddEditPropertyModal from './AddEditPropertyModal';
import PropertyStatusCTA from './PropertyStatusCTA';
import GeneratedQR from '@/components/GeneratedQR';

interface Props {
  data: any;
  activeTab: string;
  refetch: () => void;
}

const PropertyCard = ({ data, activeTab, refetch }: Props) => {

  const userType = localStorage.getItem('kvy_user_type');

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
    <div className={styles.propertyCard}>
      {userType === 'builder' && <AddEditPropertyModal edit={true} data={data} />}
      <div className={styles.propertyDetails}>
        <img className={styles.image} src="https://www.reiasindia.com/uploads/blog/what-makes-buying-property-in-delhi-different-or-special.jpg" alt="Property" />
        <div className={styles.details}>
          <div className={styles.propertyName}>{data?.name}</div>
          <div className={styles.status} data-status={data.status}>{data?.status}</div>
          <div className={styles.detail}><ClockCircleOutlined /> {formatDate(data.possessionDate)}</div>
          <div className={styles.detail}><EnvironmentOutlined /> {data.address}</div>
          {userType === 'broker' && <div className={styles.detail}><BuildOutlined /> {data.builderName.name}</div>}
        </div>
      </div>
      <p className={styles.description}>
        {data.description}
      </p>
      <div className={styles.propertyTags}>
        {data.areaSqYards && <Tag style={{ margin: '5px' }}>{data.areaSqYards} sqyds</Tag>}
        {data.facing && <Tag style={{ margin: '5px' }}>{data.facing} facing</Tag>}
        {
          data?.units?.map((d: any) => <Tag style={{ margin: '5px' }}>{d.floor} floor</Tag>)
        }
      </div>
      <div className={styles.cta}>
        {(data?.status === 'OPEN' || data.preApproved) && userType === 'broker' && <QrCodeScanner disabled={false} />}
        {data?.status === 'RESTRICTED' && userType === 'broker' && !data.preApproved && <ScheduleVisitCTA propertyId={data.propertyId} />}
        {userType === 'builder' && <PropertyStatusCTA propertyId={data.propertyId} activeTab={activeTab} refetch={refetch} />}
      </div>
      <div>
        {userType === 'builder' && <GeneratedQR qrValue={String(data.propertyId)} />}
      </div>
    </div>
  )
}

export default PropertyCard;