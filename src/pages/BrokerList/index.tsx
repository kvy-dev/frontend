import { SearchOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';
import { Empty, Input } from 'antd';
import { useEffect, useState } from 'react';
import Brokers from './components/Brokers';
import AddBrokerModal from './components/AddBrokerModal';
import TopBar from '@/components/Topbar';
import useInfiniteScroll from '@/utils/useInfiniteScroll';
import _ from 'lodash';

const BrokerList = () => {
  const [searchString, setSearchString] = useState('');
  const [activeTab, setActiveTab] = useState('approved');
  const [searchTerm, setSearchTerm] = useState('');

  const {
    data: brokers,
    PageLoader,
    LoadMore,
    loading,
    initialFetch,
  } = useInfiniteScroll(`kyv/api/builder/getAllBrokers?searchTerm=${searchString || ''}&preApproved=${activeTab === 'approved'}&blackListed=${activeTab === 'blacklisted'}&`, [activeTab, searchTerm]);

  useEffect(() => {
    _.debounce(() => {
      setSearchTerm(searchString);
    }, 900)();
  }, [searchString]);

  return (
    <div className={styles.brokers}>
      <div className={styles.topContainer}>
        <TopBar isMenu={true} />
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.toolFilters}>
          <Input 
            placeholder="Search broker"
            allowClear
            prefix={<SearchOutlined />}
            className={styles.searchInput}
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
          />
          <AddBrokerModal />
        </div>
        <div className={styles.tabContainer}>
          <span className={styles.tab} onClick={() => setActiveTab('approved')} data-selected={activeTab === "approved" ? "active" : ""}>Approved</span>
          <span className={styles.tab} onClick={() => setActiveTab('others')} data-selected={activeTab === "others" ? "active" : ""}>Others</span>
          <span className={styles.tab} onClick={() => setActiveTab('blacklisted')} data-selected={activeTab === "blacklisted" ? "active" : ""}>Blacklisted</span>
        </div>
        <PageLoader />
        {
          brokers.length === 0 && !loading && <Empty description="No brokers present" />
        }
        <div className={styles.brokerListContainer}>
          {
            !loading && <Brokers data={brokers} activeTab={activeTab} refetch={initialFetch} />
          }
          <div className={styles.stretch} style={{ gridColumn: '1 / -1' }}>
            <LoadMore />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrokerList;