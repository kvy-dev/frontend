import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import { axiosInstance } from '@/services/API';
import Loader from '@/components/Loader';
import TopBar from '@/components/Topbar';
import VisitList from './components/VisitList';

const VisitHistory = () => {
  const [visitHistory, setVisitHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // Ensure loading starts true
  const [loadMore, setLoadMore] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [hasMoreData, setHasMoreData] = useState(true); // Track if more data is available

  const loadData = async () => {
    if (loadMore || !hasMoreData) return; // Prevent redundant API calls

    setLoadMore(true);
    try {
      const res = await axiosInstance.get(`/kyv/api/builder/getAllVisits?pageNumber=${pageNumber}`);
      
      setVisitHistory((prev) => [...prev, ...res.data]);
      
      if (res.data.length === 0) {
        setHasMoreData(false); // Stop fetching when no more data
      }
    } catch (error) {
      console.error("Error fetching visit history:", error);
    } finally {
      setLoading(false);
      setLoadMore(false);
    }
  };

  useEffect(() => {
    if (pageNumber === 0 && visitHistory.length > 0) return; // Avoid duplicate first fetch
    loadData();
  }, [pageNumber]);

  if (loading && pageNumber === 0) {
    return <Loader />;
  }

  return (
    <div className={styles.visitHistory}>
      <div className={styles.topContainer}>
        <TopBar isMenu={true} />
      </div>
      <div className={styles.bottomContainer}>
        <VisitList data={visitHistory} />
        {!hasMoreData && <span><center>No more visits</center></span>}
        {loadMore && <span><center>Loading...</center></span>}
        {!loadMore && hasMoreData && visitHistory.length > 0 && (
          <span onClick={() => setPageNumber((p) => p + 1)}>
            <center>Load more</center>
          </span>
        )}
      </div>
    </div>
  );
};

export default VisitHistory;
