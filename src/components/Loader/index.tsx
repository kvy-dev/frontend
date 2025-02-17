import Lottie from 'lottie-react';
import styles from './styles.module.scss';
import animationData from "../../assets/loading.json";

const Loader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loader}>
        <Lottie animationData={animationData} loop={true} />
      </div>
    </div>
  );
};

export default Loader;