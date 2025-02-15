import { BuildOutlined, ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import styles from '../styles.module.scss';
import QrCodeScanner from '@/components/QRScanner';
import { Button } from 'antd';

const VisitItem = (props: any) => {
  const { data } = props;

  const getTime = (startTime: string, endTime: string) => {
    const formatTime = (time: string) => {
      let [hours, minutes] = time.split(":").map(Number);
      let period = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12; // Convert 0 to 12-hour format
      return `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  return `${formatTime(startTime)} - ${formatTime(endTime)}`;
  }

  return (
    <div className={styles.visitItem}>
      <div className={styles.propertyDetails}>
        <img className={styles.image} src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D" alt="Broker" />
        <div className={styles.details}>
          <div className={styles.propertyName}>Elan Jas</div>
          <div className={styles.detail}><ClockCircleOutlined /> {getTime(data.scheduleStartTime, data.scheduleEndTime)}</div>
          <div className={styles.detail}><EnvironmentOutlined /> {data.propertyResponseDto.address}</div>
          <div className={styles.detail}><BuildOutlined /> {data.builderName}</div>
        </div>
      </div>
      <div className={styles.visitItemAction}>
        <Button style={{ color: "#ECE0FC", backgroundColor: "#8569F8"}}>Accept</Button>
        <Button color='danger' variant="outlined">Reject</Button>
        <Button variant="text">Blacklist</Button>
      </div>
    </div>
  )
}

export default VisitItem;