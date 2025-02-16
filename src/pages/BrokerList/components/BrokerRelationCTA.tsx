import { Button, message, Modal, TimePicker } from "antd";
import styles from '../styles.module.scss';
import { useState } from "react";
import { axiosInstance } from "@/services/API";

interface Props {
  brokerId: Number;
}

const BrokerRelationCTA = ({ brokerId }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();

  const handleChangeBrokerRelation = async (relation: string) => {
    messageApi.open({
      type: 'success',
      content: 'Visit scheduled',
    });
  }

  return (
    <>
      {contextHolder}
      <div className={styles.brokerRelationCTA}>
        <span>Broker relation</span>
        <div className={styles.cta}>
          {/* <Button className={styles.button} onClick={() => { handleChangeBrokerRelation('') }}>Pre-Approve</Button> */}
          <Button className={styles.button} onClick={() => { handleChangeBrokerRelation('') }}>To circle</Button>
          <Button type="primary" danger onClick={() => { handleChangeBrokerRelation('') }}>Blacklist</Button>
          {/* <Button type="dashed" onClick={() => { handleChangeBrokerRelation('') }}>Remove from blacklist</Button> */}
        </div>
      </div>
    </>
  )
}

export default BrokerRelationCTA;