import { BuildOutlined, UserOutlined } from "@ant-design/icons";
import PersonalisedGreeting from "./components/PersonalisedGreeting";
import styles from './styles.module.scss';
import { Tabs, TabsProps } from "antd";
import { useEffect, useState } from "react";
import VisitList from "./components/VisitList";
import { axiosInstance } from "@/services/API";
import Loader from "@/components/Loader";
import QrCodeScanner from "@/components/QRScanner";
import { Link } from "react-router-dom";
import TopBar from "@/components/Topbar";
import useAadharNotVerifiedPopup from "@/utils/useAadharNotVerifiedPopup";
import { onMessageListener, requestForToken } from "@/firebase";
import useNotifications from "../../utils/useNotificationStore";
import useCheckAadharVerified from "@/utils/useCheckAadharVerified";

const BrokerDashboard = () => {
  const { handleNotification } = useNotifications();
  useCheckAadharVerified();

  useEffect(() => {
    requestForToken();
    onMessageListener().then((payload: any) => {
      const { title, body, click_action } = payload.notification;
      handleNotification({ title, body, click_action });
      alert("New Notification");
    });
  }, []);
  const [upcomingVisit, setUpcomingVisit] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('today');
  const onChange = (key: string) => {
    setActiveTab(key);
  };

  const { showAadharError, AadharPopup } = useAadharNotVerifiedPopup();

  useEffect(() => {
    setLoading(true);
    axiosInstance.get('/kyv/api/broker/upcomingVisits')
    .then(res => setUpcomingVisit(res.data))
    .finally(() => setLoading(false));

    console.log(localStorage.getItem('kvy_user_verified'), btoa('false'), localStorage.getItem('aadharShown'));
    if (localStorage.getItem('kvy_user_verified') === btoa('false') && localStorage.getItem('aadharShown') !== 'true') {
      showAadharError();
      localStorage.setItem('aadharShown', 'true');
    }
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
      <AadharPopup />
      <div className={styles.topContainer}>
        <div className={styles.notifications}>
          <TopBar inline={true} />
        </div>
        <PersonalisedGreeting name={localStorage.getItem('kvy_user_name') !== 'null' ? localStorage.getItem('kvy_user_name') : 'User'} visits={upcomingVisit?.filter((d: any) => d.status !== 'REJECTED')?.length} />
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