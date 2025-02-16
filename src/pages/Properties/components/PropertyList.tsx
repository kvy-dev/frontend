import styles from '../styles.module.scss';
import PropertyCard from './PropertyCard';

interface Props {
  data: any;
  searchString: string;
}

const PropertyList = ({ data, searchString }: Props) => {
  return (
    <div className={styles.propertyListContainer}>
      {
        [...data, ...data, ...data].map((d: any) => {
          if (!searchString || d?.name?.includes(searchString))
            return <PropertyCard key={d?.propertyId} data={d} />   
        })
      }
    </div>
  )
}

export default PropertyList;