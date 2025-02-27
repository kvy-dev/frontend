import { Empty } from 'antd';
import styles from '../styles.module.scss';
import VisitHistoryCard from './VisitHistoryCard';

interface Props {
  data: any;
  searchString: string;
}

const VisitList = ({ data, searchString }: Props) => {
  if (data.length === 0) {
    return <Empty description="No visit history" />
  }

  return (
    <div className={styles.visitHistoryListContainer}>
      {
        data.map((d: any) => {
          if (!searchString || searchString && d?.propertyResponseDto?.name.toLowerCase().includes(searchString.toLowerCase())) {
            return <VisitHistoryCard key={d?.id} data={d} />   
          }
        })
      }
    </div>
  )
}

export default VisitList;