import styles from './styles.module.scss';
import TopBar from '@/components/Topbar';
import VisitList from './components/VisitList';
import useInfiniteScroll from '@/utils/useInfiniteScroll';

const VisitHistory = () => {
  const {
    data: visitHistory,
    PageLoader,
    LoadMore,
    loading,
  } = useInfiniteScroll('/kyv/api/builder/getAllVisits?', [])
  return (
    <div className={styles.visitHistory}>
      <div className={styles.topContainer}>
        <TopBar isMenu={true} />
      </div>
      <div className={styles.bottomContainer}>
        <PageLoader />
        {!loading && <VisitList data={visitHistory} />}
        <LoadMore />
      </div>
    </div>
  );
};

export default VisitHistory;
