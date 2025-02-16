import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import { axiosInstance } from '@/services/API';
import Loader from '@/components/Loader';
import TopBar from '@/components/Topbar';
import VisitList from './components/VisitList';

const VisitHistory = () => {
  // const [open, setOpen] = useState(false);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get(`/kyv/api/broker/listProperties?pageNumber=0&pageSize=100&builderId=2`)
    .then(res => setProperties(res.data))
    .finally(() => setLoading(false));
  }, []);

  // const handleOpenChange = (open: boolean) => {
  //   setOpen(open);
  // }

  if (loading) {
    return <Loader />
  }

  return (
    <div className={styles.visitHistory}>
      <div className={styles.topContainer}>
        <TopBar isMenu={true} />
      </div>
      <div className={styles.bottomContainer}>
        <VisitList data={properties} searchString={''} />
      </div>
    </div>
  );
}

export default VisitHistory;