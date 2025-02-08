import { BuildOutlined, ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import styles from '../styles.module.scss';
import QrCodeScanner from '@/components/QRScanner';
import { Tag } from 'antd';
import ScheduleVisitCTA from './ScheduleVisitCTA';

const PropertyCard = () => {
  return (
    <div className={styles.propertyCard}>
      <div className={styles.propertyDetails}>
        <img className={styles.image} src="https://www.reiasindia.com/uploads/blog/what-makes-buying-property-in-delhi-different-or-special.jpg" alt="Property" />
        <div className={styles.details}>
          <div className={styles.propertyName}>Mahagony Mansion</div>
          <div className={styles.status}>Open for visit</div>
          <div className={styles.detail}><ClockCircleOutlined /> 10:00 AM - 12:00 PM</div>
          <div className={styles.detail}><EnvironmentOutlined /> 123 Main St</div>
          <div className={styles.detail}><BuildOutlined /> Builder Name</div>
        </div>
      </div>
      <div className={styles.propertyTags}>
        <Tag style={{ margin: '5px' }}>150sq yd</Tag>
        <Tag style={{ margin: '5px' }}>150sq yd</Tag>
        <Tag style={{ margin: '5px' }}>150sq yd</Tag>
        <Tag style={{ margin: '5px' }}>150sq yd</Tag>
        <Tag style={{ margin: '5px' }}>150sq yd</Tag>
        <Tag style={{ margin: '5px' }}>150sq yd</Tag>
        <Tag style={{ margin: '5px' }}>150sq yd</Tag>
      </div>
      <div className={styles.cta}>
        <QrCodeScanner />
        <ScheduleVisitCTA />
      </div>
    </div>
  )
}

export default PropertyCard;