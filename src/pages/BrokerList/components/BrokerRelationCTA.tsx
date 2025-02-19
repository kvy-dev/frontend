import { Button, message } from "antd";
import styles from '../styles.module.scss';
import { axiosInstance } from "@/services/API";

interface Props {
  brokerId: Number;
  activeTab: string;
  refetch: () => void;
}

const BrokerRelationCTA = ({ brokerId, activeTab, refetch }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();

  const handleChangeBrokerRelation = async (e: any, relation: string) => {
    e.stopPropagation();
    e.preventDefault();
    messageApi.open({
      type: 'success',
      content: 'Visit scheduled',
    });
    refetch();
  }

  return (
    <>
      {contextHolder}
      <div className={styles.brokerRelationCTA}>
        <span>Broker relation</span>
        <div className={styles.cta}>
          {activeTab === 'others' && <Button variant="solid" className={styles.button} onClick={(e) => { handleChangeBrokerRelation(e, '') }}>Pre approve</Button>}
          {activeTab === 'approved' && <Button className={styles.button} onClick={(e) => { handleChangeBrokerRelation(e, '') }}>Unapprove</Button>}
          {activeTab !== 'blacklisted' && <Button type="primary" danger onClick={(e) => { handleChangeBrokerRelation(e, '') }}>Blacklist</Button>}
          {activeTab === 'blacklisted' && <Button type="dashed" onClick={(e) => { handleChangeBrokerRelation(e, '') }}>Remove from blacklist</Button>}
        </div>
      </div>
    </>
  )
}

export default BrokerRelationCTA;