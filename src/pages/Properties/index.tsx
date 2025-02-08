import { ArrowLeftOutlined, BellOutlined, FilterOutlined, SearchOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';
import { Input, Popover } from 'antd';
import { useState } from 'react';
import PropertyList from './components/PropertyList';

const Properties = () => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  }

  return (
    <div className={styles.properties}>
      <div className={styles.topContainer}>
        <div className={styles.notifications}>
          <ArrowLeftOutlined />
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
          />
          <Popover
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
          </Popover>
        </div>
        <div className={styles.propertiesList}>
        </div>
        <PropertyList />
      </div>
    </div>
  );
}

export default Properties;