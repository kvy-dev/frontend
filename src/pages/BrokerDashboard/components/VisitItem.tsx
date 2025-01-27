import { BuildOutlined, ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import styles from '../styles.module.scss';
import QrCodeScanner from '@/components/QRScanner';

const VisitItem = () => {
  return (
    <div className={styles.visitItem}>
      <div className={styles.propertyDetails}>
        <img className={styles.image} src="https://www.reiasindia.com/uploads/blog/what-makes-buying-property-in-delhi-different-or-special.jpg" alt="Property" />
        <div className={styles.details}>
          <div className={styles.propertyName}>Mahagony Mansion</div>
          <div className={styles.status}>Scheduled</div>
          <div className={styles.detail}><ClockCircleOutlined /> 10:00 AM - 12:00 PM</div>
          <div className={styles.detail}><EnvironmentOutlined /> 123 Main St</div>
          <div className={styles.detail}><BuildOutlined /> Builder Name</div>
        </div>
      </div>
      <div className={styles.visitItemAction}>
        <QrCodeScanner />
      </div>
    </div>
  )
}

export default VisitItem;