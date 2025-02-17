import styles from '../styles.module.scss';
import VisitItem from './VisitItem';

interface Props {
  data: any;
  activeTab: string;
}

const VisitList = ({ data, activeTab }: Props) => {

  function filterSchedulesByTab(scheduleArray: any, activeTab: string) {
    return scheduleArray.filter((schedule: any) => {
      if (activeTab === "pending") {
        return schedule.status === 'PENDING'; // Keep today's schedules
      } else if (activeTab === "schedule") {
        return schedule.status === 'APPROVED'; // Keep tomorrow's schedules
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