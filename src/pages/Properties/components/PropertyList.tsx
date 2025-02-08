import styles from '../styles.module.scss';
import PropertyCard from './PropertyCard';

const PropertyList = () => {
  return (
    <div className={styles.propertyListContainer}>
      <PropertyCard />   
      <PropertyCard />   
      <PropertyCard />   
      <PropertyCard />   
      <PropertyCard />   
      <PropertyCard />   
      <PropertyCard />   
    </div>
  )
}

export default PropertyList;