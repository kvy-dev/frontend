import { BuildOutlined, CalendarOutlined, ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import styles from '../styles.module.scss';
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
        <img className={styles.image} src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D" alt="Broker" />
        <div className={styles.details}>
          <div className={styles.propertyName}>Elan Jas</div>
          <div className={styles.detail}><ClockCircleOutlined /> {getTime(data.scheduleStartTime, data.scheduleEndTime)}</div>
          <div className={styles.detail}><CalendarOutlined /> {formatDate(data.scheduleDate)}</div>
          <div className={styles.detail}><EnvironmentOutlined /> {data.propertyResponseDto.address}</div>
          <div className={styles.detail}><BuildOutlined /> {data.propertyResponseDto.name}</div>
        </div>
      </div>
      {
        data.status === 'PENDING' && (
          <div className={styles.visitItemAction}>
            <Button style={{ color: "#ECE0FC", backgroundColor: "#8569F8"}}>Accept</Button>
            <Button color='danger' variant="outlined">Reject</Button>
            <Button variant="text">Blacklist</Button>
          </div>
        )
      }
    </div>
  )
}

export default VisitItem;