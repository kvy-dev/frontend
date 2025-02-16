import { ArrowLeftOutlined, BellOutlined, SearchOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';
import { Input } from 'antd';
import { useEffect, useState } from 'react';
import PropertyList from './components/PropertyList';
import { Link } from 'react-router-dom';
import { axiosInstance } from '@/services/API';
import Loader from '@/components/Loader';
import AddEditPropertyModal from './components/AddEditPropertyModal';

const Properties = () => {
  // const [open, setOpen] = useState(false);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchString, setSearchString] = useState('');
  const [activeTab, setActiveTab] = useState('listed');

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
        <div className={styles.notifications}>
          <Link to="/"><ArrowLeftOutlined /></Link>
        </div>
        <BellOutlined />
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.toolFilters}>
          <Input 
            placeholder="Search property"
            allowClear
            prefix={<SearchOutlined />}
            className={styles.searchInput}
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
          />
          {localStorage.getItem('kvy_user_type') === 'builder' && <AddEditPropertyModal />}
        </div>
        {
          localStorage.getItem('kvy_user_type') === 'builder' && (
            <div className={styles.tabContainer}>
              <span className={styles.tab} onClick={() => setActiveTab('listed')} data-selected={activeTab === "listed" ? "active" : ""}>Listed</span>
              <span className={styles.tab} onClick={() => setActiveTab('busy')} data-selected={activeTab === "busy" ? "active" : ""}>Busy</span>
              <span className={styles.tab} onClick={() => setActiveTab('unlisted')} data-selected={activeTab === "unlisted" ? "active" : ""}>Unlisted</span>
            </div>
          )
        }
        <PropertyList data={properties} searchString={searchString} />
      </div>
    </div>
  );
}

export default Properties;