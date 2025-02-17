import { Empty } from 'antd';
import styles from '../styles.module.scss';
import VisitHistoryCard from './VisitHistoryCard';

interface Props {
  data: any;
}

const VisitList = ({ data }: Props) => {
  if (data.length === 0) {
    return <Empty description="No visit history" />
  }

  return (
    <div className={styles.visitHistoryListContainer}>
      {
        data.map((d: any) => {
          return <VisitHistoryCard key={d?.id} data={d} />   
        })
      }
    </div>
  )
}

export default VisitList;