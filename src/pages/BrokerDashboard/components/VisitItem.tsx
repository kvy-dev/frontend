import { BuildOutlined, ClockCircleOutlined, CloseCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import styles from '../styles.module.scss';
import QrCodeScanner from '@/components/QRScanner';
import { Button } from 'antd';
import { axiosInstance } from '@/services/API';

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

  const revokeRequest = () => {
    axiosInstance.post(`/kyv/api/broker/revoke/${data.id}`)
      .then(() => {
        window.location.reload();
      }
    );
  }

  if (data?.status === 'REJECTED') {
    return null;
  }

  return (
    <div className={styles.visitItem}>
      <div className={styles.propertyDetails}>
        <img className={styles.image} src={data.propertyResponseDto.imageUrl || "https://www.reiasindia.com/uploads/blog/what-makes-buying-property-in-delhi-different-or-special.jpg"} alt="Property" />
        <div className={styles.details}>
          <div className={styles.propertyName}>{data.propertyResponseDto.name}</div>
          <div className={styles.status} data-status={data.status}>{data.status}</div>
          <div className={styles.detail}><ClockCircleOutlined /> {getTime(data.scheduleStartTime, data.scheduleEndTime)}</div>
          <div className={styles.detail}><EnvironmentOutlined /> {data.propertyResponseDto.address}</div>
          <div className={styles.detail}><BuildOutlined /> {data.builderName}</div>
        </div>
      </div>
      <div className={styles.visitItemAction}>
        <Button block danger onClick={revokeRequest} style={{ marginTop: '1rem' }}><CloseCircleOutlined /> Revoke access request</Button>
        <QrCodeScanner disabled={data.status === 'PENDING'} />
      </div>
    </div>
  )
}

export default VisitItem;