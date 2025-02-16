import { Button, message, Modal, TimePicker } from "antd";
import styles from '../styles.module.scss';
import { useState } from "react";
import { axiosInstance } from "@/services/API";

interface Props {
  propertyId: Number;
}

const PropertyStatusCTA = ({ propertyId }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();

  const handleChangePropertyStatus = async (relation: string) => {
    messageApi.open({
      type: 'success',
      content: 'Visit scheduled',
    });
  }

  return (
    <>
      {contextHolder}
      <div className={styles.propertyStatusCTA}>
        <span>Property status</span>
        <div className={styles.cta}>
          {/* <Button className={styles.button} onClick={() => { handleChangePropertyStatus('') }}>Listed</Button> */}
          <Button className={styles.button} onClick={() => { handleChangePropertyStatus('') }}>Busy</Button>
          <Button className={styles.button} onClick={() => { handleChangePropertyStatus('') }}>Unlist</Button>
        </div>
      </div>
    </>
  )
}

export default PropertyStatusCTA;