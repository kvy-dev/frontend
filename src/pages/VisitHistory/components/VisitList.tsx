import styles from '../styles.module.scss';
import VisitHistoryCard from './VisitHistoryCard';

interface Props {
  data: any;
  searchString: string;
}

const VisitList = ({ data, searchString }: Props) => {
  return (
    <div className={styles.visitHistoryListContainer}>
      {
        [...data, ...data, ...data].map((d: any) => {
          if (!searchString || d?.name?.includes(searchString))
            return <VisitHistoryCard key={d?.propertyId} data={d} />   
        })
      }
    </div>
  )
}

export default VisitList;