import { SearchOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';
import { Empty, Input } from 'antd';
import { useEffect, useState } from 'react';
import PropertyList from './components/PropertyList';
import AddEditPropertyModal from './components/AddEditPropertyModal';
import TopBar from '@/components/Topbar';
import useInfiniteScroll from '@/utils/useInfiniteScroll';
import _ from 'lodash';
import useCheckAadharVerified from '@/utils/useCheckAadharVerified';

const Properties = () => {
  const [searchString, setSearchString] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('LISTED');
  useCheckAadharVerified(localStorage.getItem('kvy_user_type') === 'builder');

  const {
    data: properties,
    PageLoader,
    LoadMore,
    loading,
    initialFetch,
  } = useInfiniteScroll(`/kyv/api/property/listProperties?searchTerm=${searchString}&propertyListedStatus=${activeTab}&`, [activeTab, searchTerm]);

  useEffect(() => {
    _.debounce(() => {
      setSearchTerm(searchString);
    }, 900)();
  }, [searchString]);

  return (
    <div className={styles.properties}>
      <div className={styles.topContainer}>
        <TopBar isMenu={localStorage.getItem('kvy_user_type') === 'builder'} backLink='/' />
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
          {localStorage.getItem('kvy_user_type') === 'builder' && <AddEditPropertyModal refetch={initialFetch} />}
        </div>
        {
          localStorage.getItem('kvy_user_type') === 'builder' && (
            <div className={styles.tabContainer}>
              <span className={styles.tab} onClick={() => setActiveTab('LISTED')} data-selected={activeTab === "LISTED" ? "active" : ""}>Listed</span>
              <span className={styles.tab} onClick={() => setActiveTab('BUSY')} data-selected={activeTab === "BUSY" ? "active" : ""}>Busy</span>
              <span className={styles.tab} onClick={() => setActiveTab('UNLISTED')} data-selected={activeTab === "UNLISTED" ? "active" : ""}>Unlisted</span>
            </div>
          )
        }
        <PageLoader />
        {
          ((!properties?.length || properties.length === 0) && !loading) && <Empty description="No properties present" />
        }
        <div className={styles.propertyListContainer}>
          {
            !loading && <PropertyList data={properties} activeTab={activeTab} refetch={initialFetch} />
          }
          <div className={styles.stretch} style={{ gridColumn: '1 / -1' }}>
            <LoadMore />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Properties;