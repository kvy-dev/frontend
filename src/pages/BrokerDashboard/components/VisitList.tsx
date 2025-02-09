import styles from '../styles.module.scss';
import VisitItem from './VisitItem';

interface Props {
  data: any;
  activeTab: string;
}

const VisitList = ({ data, activeTab }: Props) => {

  function filterSchedulesByTab(scheduleArray: any, activeTab: string) {
    return scheduleArray.filter((schedule: any) => {
      // Extract server date (YYYY-MM-DD) from `serverTime`
      const serverDate = new Date(schedule.serverTime.split("T")[0]); // Convert to Date object

      // Calculate tomorrow's date
      const tomorrowDate = new Date(serverDate);
      tomorrowDate.setDate(serverDate.getDate() + 1);

      // Format dates to YYYY-MM-DD for comparison
      const formattedServerDate = serverDate.toISOString().split("T")[0];
      const formattedTomorrowDate = tomorrowDate.toISOString().split("T")[0];

      if (activeTab === "today") {
        return schedule.scheduleDate === formattedServerDate; // Keep today's schedules
      } else if (activeTab === "tomorrow") {
        return schedule.scheduleDate === formattedTomorrowDate; // Keep tomorrow's schedules
      }

      return true; // Return everything if activeTab is neither "today" nor "tomorrow"
    });
  }

  return (
    <div className={styles.visitList}>
      {
        filterSchedulesByTab(data, activeTab).map((d: any) => (
          <VisitItem key={d?.id} data={d} />
        ))
      }
    </div>
  )
}

export default VisitList;