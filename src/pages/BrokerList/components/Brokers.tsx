import styles from '../styles.module.scss';
import BrokerCard from './BrokerCard';

interface Props {
  data: any;
  searchString: string;
}

const Brokers = ({ data, searchString }: Props) => {
  return (
    <div className={styles.brokerListContainer}>
      {
        [...data, ...data, ...data].map((d: any) => {
          if (!searchString || d?.name?.includes(searchString))
            return <BrokerCard key={d?.propertyId} data={d} />   
        })
      }
    </div>
  )
}

export default Brokers;