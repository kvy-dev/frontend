import styles from '../styles.module.scss';
import VisitItem from './VisitItem';

const VisitList = () => {
  return (
    <div className={styles.visitList}>
      <VisitItem />    
      <VisitItem />    
      <VisitItem />    
      <VisitItem />    
      <VisitItem />    
      <VisitItem />    
      <VisitItem />    
    </div>
  )
}

export default VisitList;