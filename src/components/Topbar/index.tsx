import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import { ArrowLeftOutlined, BellOutlined, BuildOutlined, CopyOutlined, HistoryOutlined, HomeOutlined, MenuOutlined, ProfileOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Button, Divider, Drawer } from 'antd';
import Notification from './Notification';
import { axiosInstance } from '@/services/API';

interface Props {
  backLink?: string;
  isMenu?: boolean;
  inline?: boolean;
}

const TopBar = ({ backLink, isMenu, inline }: Props) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [active, setActive] = useState(false);

  const handleLogout = async () => {
    await axiosInstance.post('/kyv/api/logout');
    localStorage.clear();
    window.location.replace('/');
  }
  
  return (
    <div className={styles.container} data-inline={inline}>
      {!isMenu && backLink && <Link to={backLink}><ArrowLeftOutlined /></Link>}
      {isMenu && <MenuOutlined onClick={() => setDrawerVisible(true)} />}
      <Drawer
        open={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        placement='left'
        width={300}
      >
        <Link className={styles.menuItem} to="/"><HomeOutlined /> Dashboard</Link>
        <Divider />
        <Link className={styles.menuItem} to="/properties"><BuildOutlined /> Properties</Link>
        <Divider />
        <Link className={styles.menuItem} to="/brokers"><ProfileOutlined /> Brokers</Link>
        <Divider />
        <Link className={styles.menuItem} to="/reports"><CopyOutlined /> Reports</Link>
        <Divider />
        <Link className={styles.menuItem} to="/visitHistory"><HistoryOutlined /> Visit history</Link>
        <Divider />
        <Link className={styles.menuItem} to="/profile"><UserOutlined /> Profile</Link>
        <Divider />
        <Button onClick={handleLogout}>Logout</Button>
      </Drawer>
      <div className={styles.notification} data-active={active}>
        <BellOutlined onClick={() => setActive(!active)} style={{ padding: '1rem 1rem 0.2rem 1rem' }} />
        {active && (
          <div className={styles.notificationContainer}>
            <Notification />
            <Notification />
            <Notification />
            <Notification />
          </div>
        )}
      </div>
    </div>
  )
}

export default TopBar;