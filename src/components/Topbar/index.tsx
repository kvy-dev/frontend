import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import { ArrowLeftOutlined, BellOutlined, BuildOutlined, HistoryOutlined, HomeOutlined, MenuOutlined, ProfileOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Divider, Drawer } from 'antd';

interface Props {
  backLink?: string;
  isMenu?: boolean;
}

const TopBar = ({ backLink, isMenu }: Props) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  
  return (
    <div className={styles.container}>
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
        <Link className={styles.menuItem} to="/visitHistory"><HistoryOutlined /> Visit history</Link>
        <Divider />
        <Link className={styles.menuItem} to="/profile"><UserOutlined /> Profile</Link>
        <Divider />
      </Drawer>
      <BellOutlined />
    </div>
  )
}

export default TopBar;