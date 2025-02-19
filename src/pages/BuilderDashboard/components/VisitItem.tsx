import { BuildOutlined, CalendarOutlined, ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import styles from '../styles.module.scss';
import { Button, Spin } from 'antd';
import { axiosInstance } from '@/services/API';
import { useState } from 'react';

const VisitItem = (props: any) => {
  const [ctaLoading, setCTALoading] = useState(false); 
  const { data } = props;

  const updateRequestStatus = (status: string) => {
    setCTALoading(true);
    if (status === 'blacklisted') {
      Promise.all([
        axiosInstance.post('/kyv/api/builder/changeBrokerStatus', {
          "brokerId": data.brokerId,
          "preApproved": "NO",
          "blackListed": "YES"
        }),
        axiosInstance.post('kyv/api/builder/approveRequest', {
          propertyId: data.propertyResponseDto.propertyId,
          brokerId: data.brokerId,
          status: 'REJECTED',
        })
      ])
      .then(res => window.location.reload())
      .catch()
      .finally(() => setCTALoading(false));
    } else {
      axiosInstance.post('kyv/api/builder/approveRequest', {
        propertyId: data.propertyResponseDto.propertyId,
        brokerId: data.brokerId,
        status: status,
      })
      .then(res => window.location.reload())
      .catch()
      .finally(() => setCTALoading(false));
    }
  }

  const getTime = (startTime: string, endTime: string) => {
    const formatTime = (time: string) => {
      let [hours, minutes] = time.split(":").map(Number);
      let period = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12; // Convert 0 to 12-hour format
      return `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };
    return `${formatTime(startTime)} - ${formatTime(endTime)}`;
  }

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
    <div className={styles.visitItem}>
      <div className={styles.propertyDetails}>
        <img className={styles.image} src={data.brokerDetails.imageUrl} alt="Broker" />
        <div className={styles.details}>
          <div className={styles.propertyName}>{data.brokerDetails.name}</div>
          <div className={styles.detail}><ClockCircleOutlined /> {getTime(data.scheduleStartTime, data.scheduleEndTime)}</div>
          <div className={styles.detail}><CalendarOutlined /> {formatDate(data.scheduleDate)}</div>
          <div className={styles.detail}><EnvironmentOutlined /> {data.propertyResponseDto.address}</div>
          <div className={styles.detail}><BuildOutlined /> {data.propertyResponseDto.name}</div>
        </div>
      </div>
      {ctaLoading && <div style={{ marginTop: '1.2rem' }}><center><Spin /></center></div>}
      {
        data.status === 'PENDING' && !ctaLoading && (
          <div className={styles.visitItemAction}>
            <Button disabled={ctaLoading} style={{ color: "#ECE0FC", backgroundColor: "#8569F8"}} onClick={() => updateRequestStatus('APPROVED')}>Accept</Button>
            <Button disabled={ctaLoading} color='danger' variant="outlined" onClick={() => updateRequestStatus('REJECTED')}>Reject</Button>
            <Button disabled={ctaLoading} onClick={() => updateRequestStatus('blacklisted')} variant="text">Blacklist</Button>
          </div>
        )
      }
    </div>
  )
}

export default VisitItem;