import { BellOutlined } from "@ant-design/icons";
import PersonalisedGreeting from "./components/PersonalisedGreeting";
import styles from './styles.module.scss';
import { Tabs, TabsProps } from "antd";
import { useState } from "react";
import VisitList from "./components/VisitList";

const BrokerDashboard = () => {
  const [activeTab, setActiveTab] = useState('today');
  const onChange = (key: string) => {
    setActiveTab(key);
    console.log(activeTab);
  };
  
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

  return (
    <div className={styles.brokerDashboard}>
      <div className={styles.topContainer}>
        <div className={styles.notifications}>
          <BellOutlined />
        </div>
        <PersonalisedGreeting />
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
        <VisitList />
      </div>
      {/* Navigation */}
    </div>
  )
}

export default BrokerDashboard;