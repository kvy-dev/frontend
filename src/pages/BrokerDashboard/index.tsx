import { BellOutlined, BuildOutlined, UserOutlined } from "@ant-design/icons";
import PersonalisedGreeting from "./components/PersonalisedGreeting";
import styles from './styles.module.scss';
import { Tabs, TabsProps } from "antd";
import { useEffect, useState } from "react";
import VisitList from "./components/VisitList";
import { axiosInstance } from "@/services/API";
import Loader from "@/components/Loader";
import QrCodeScanner from "@/components/QRScanner";
import { Link } from "react-router-dom";

const BrokerDashboard = () => {
  const [upcomingVisit, setUpcomingVisit] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('today');
  const onChange = (key: string) => {
    setActiveTab(key);
  };

  useEffect(() => {
    axiosInstance.get('/kyv/api/broker/upcomingVisits')
    .then(res => setUpcomingVisit(res.data))
    .finally(() => setLoading(false));
  }, []);
  
  const tabItems: TabsProps['items'] = [
    {
      key: "today",
      label: 'Today',
    },
    {
      key: "tomorrow",
      label: 'Tomorrow',
    },
  ];

  if (loading) {
    return <Loader />
  }

  return (
    <div className={styles.brokerDashboard}>
      <div className={styles.topContainer}>
        <div className={styles.notifications}>
          <BellOutlined />
        </div>
        <PersonalisedGreeting name={localStorage.getItem('kvy_user_name') || 'User'} visits={upcomingVisit?.length} />
      </div>
      <div className={styles.bottomContainer}>
        <Tabs 
          defaultActiveKey="today" 
          activeKey={activeTab} 
          items={tabItems} 
          onChange={onChange} 
          type="card"
          tabBarGutter={2}
        />
        <VisitList data={upcomingVisit} activeTab={activeTab} />
      </div>
      {/* Navigation */}
      <div className={styles.navigation}>
        <Link to="/properties">
          <span className={styles.navIcon}>
            <BuildOutlined />
            <span className={styles.navIconText}>Properties</span>
          </span>
        </Link>
        <QrCodeScanner disabled={false} iconOnly={true} />
        <Link to="/profile">
          <span className={styles.navIcon}>
            <UserOutlined />
            <span className={styles.navIconText}>Profile</span>
          </span>
        </Link>
      </div>
    </div>
  )
}

export default BrokerDashboard;