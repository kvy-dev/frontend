import { ArrowLeftOutlined, BellOutlined, FilterOutlined, SearchOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';
import { Input, Popover } from 'antd';
import { useEffect, useState } from 'react';
import PropertyList from './components/PropertyList';
import { Link } from 'react-router-dom';
import { axiosInstance } from '@/services/API';
import Loader from '@/components/Loader';

const Properties = () => {
  const [open, setOpen] = useState(false);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    axiosInstance.get(`/kyv/api/broker/listProperties?pageNumber=0&pageSize=100&builderId=2`)
    .then(res => setProperties(res.data))
    .finally(() => setLoading(false));
  }, []);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  }

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
          {/* <Popover
            content={<a onClick={() => setOpen(false)}>Close</a>}
            title="Title"
            trigger="click"
            open={open}
            placement='bottomLeft'
            onOpenChange={handleOpenChange}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
              <FilterOutlined /> 
              <span>Filter</span>
            </div>
          </Popover> */}
        </div>
        <div className={styles.propertiesList}>
        </div>
        <PropertyList data={properties} searchString={searchString} />
      </div>
    </div>
  );
}

export default Properties;