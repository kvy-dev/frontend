import { BuildOutlined, CalendarOutlined, ClockCircleOutlined, PhoneOutlined } from '@ant-design/icons';
import styles from '../styles.module.scss';

interface Props {
  data: any;
}

const VisitHistoryCard = ({ data }: Props) => {

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

  const getTime = (startTime: string) => {
    const formatTime = (time: string) => {
      let [hours, minutes] = time.split(":").map(Number);
      let period = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12; // Convert 0 to 12-hour format
      return `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };
    return `${formatTime(startTime)}`;
  }

  return (
    <div className={styles.visitHistoryCard}>
      <div className={styles.visitHistoryDetails}>
      <img className={styles.image} src={data.brokerDetails.imageUrl} alt="visitHistory" />
        <div className={styles.details}>
          <div className={styles.visitHistoryName}>{data.brokerDetails.name}</div>
          <div className={styles.detail}><CalendarOutlined /> {formatDate(data.scheduleDate)}</div>
          <div className={styles.detail}><ClockCircleOutlined /> {getTime(data.scheduleStartTime)}</div>
          <div className={styles.detail}><PhoneOutlined /> +91 {data?.brokerDetails.mobile}</div>
          <div className={styles.detail}><BuildOutlined /> {data?.propertyResponseDto?.name}</div>
        </div>
      </div>
    </div>
  )
}

export default VisitHistoryCard;