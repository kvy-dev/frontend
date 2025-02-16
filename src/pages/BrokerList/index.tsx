import { ArrowLeftOutlined, BellOutlined, SearchOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';
import { Input } from 'antd';
import { useEffect, useState } from 'react';
import Brokers from './components/Brokers';
import { Link } from 'react-router-dom';
import { axiosInstance } from '@/services/API';
import Loader from '@/components/Loader';
import AddBrokerModal from './components/AddBrokerModal';
import TopBar from '@/components/Topbar';

const BrokerList = () => {
  // const [open, setOpen] = useState(false);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchString, setSearchString] = useState('');
  const [activeTab, setActiveTab] = useState('approved');

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
    <div className={styles.properties}>
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
          <span className={styles.tab} onClick={() => setActiveTab('circle')} data-selected={activeTab === "circle" ? "active" : ""}>In circle</span>
          <span className={styles.tab} onClick={() => setActiveTab('untagged')} data-selected={activeTab === "untagged" ? "active" : ""}>Untagged</span>
        </div>
        <Brokers data={properties} searchString={searchString} />
      </div>
    </div>
  );
}

export default BrokerList;