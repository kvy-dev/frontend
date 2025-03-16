import PersonalisedGreeting from "./components/PersonalisedGreeting";
import styles from './styles.module.scss';
import { Empty, Tabs, TabsProps } from "antd";
import { useEffect, useState } from "react";
import VisitList from "./components/VisitList";
import { axiosInstance } from "@/services/API";
import Loader from "@/components/Loader";
import TopBar from "@/components/Topbar";
import usePushNotifications from "@/utils/usePushNotifications";
import InstallBanner from "@/components/InstallBanner";

const BuilderDashboard = () => {
  usePushNotifications();
  interface Visit {
    status: string;
  }

  const [upcomingVisit, setUpcomingVisit] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');
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
      key: "pending",
      label: 'Pending requests',
    },
    {
      key: "schedule",
      label: 'Schedule',
    },
  ];

  const scheduled = upcomingVisit.filter((d) => d.status === 'APPROVED').length;
  const requested = upcomingVisit.filter((d) => d.status === 'PENDING').length;

  if (loading) {
    return <Loader />
  }

  return (
    <div className={styles.builderDashboard}>
      <InstallBanner />
      <div className={styles.topContainer}>
        <div className={styles.notifications}>
          <TopBar isMenu={true} />
        </div>
        <div className={styles.widthContainer}>
          <PersonalisedGreeting name={localStorage.getItem('kvy_user_name') !== 'null' ? localStorage.getItem('kvy_user_name') : 'User'} visits={scheduled} requested={requested} />
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.widthContainer}>
          <Tabs 
            defaultActiveKey="pending" 
            activeKey={activeTab} 
            items={tabItems} 
            onChange={onChange} 
            type="card"
            tabBarGutter={2}
          />
        </div>
        {scheduled === 0 && activeTab === 'schedule' && <Empty description="No scheduled visit" />}
        {requested === 0 && activeTab === 'pending' && <Empty description="No pending requests" />}
        <VisitList data={upcomingVisit} activeTab={activeTab} />
      </div>
    </div>
  )
}

export default BuilderDashboard;