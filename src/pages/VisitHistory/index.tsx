import styles from './styles.module.scss';
import TopBar from '@/components/Topbar';
import VisitList from './components/VisitList';
import useInfiniteScroll from '@/utils/useInfiniteScroll';
import { Empty, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';

const VisitHistory = () => {
  const {
    data: visitHistory,
    PageLoader,
    LoadMore,
    loading,
  } = useInfiniteScroll('/kyv/api/builder/getAllVisits?', []);

  const [searchString, setSearchString] = useState('');

  return (
    <div className={styles.visitHistory}>
      <div className={styles.topContainer}>
        <TopBar isMenu={true} />
      </div>
      <div className={styles.bottomContainer}>
        <PageLoader />
        <div className={styles.toolFilters}>
          <Input 
            placeholder="Search via property name"
            allowClear
            prefix={<SearchOutlined />}
            className={styles.searchInput}
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
          />
        </div>
        {visitHistory.length === 0 && !loading && <Empty description="No visits present" />}
        {!loading && <VisitList data={visitHistory} searchString={searchString} />}
        <div className={styles.widthContainer}>
          <LoadMore />
        </div>
      </div>
    </div>
  );
};

export default VisitHistory;
