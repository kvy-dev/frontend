import { Input, Modal } from "antd";
import { useState } from "react";
import styles from '../styles.module.scss';
import { PhoneOutlined } from "@ant-design/icons";

const AddBrokerModal = () => {
  const [showAddBrokerForm, toggleShowBrokerForm] = useState(false);
  
  return (
    <>
      <div className={styles.addBrokerCTA} onClick={() => toggleShowBrokerForm(true)}>Add broker</div>
      <Modal
        open={showAddBrokerForm}
        onCancel={() => toggleShowBrokerForm(false)}
        okText="Add broker"
      >
        <p>Enter broker mobile number</p>
        <Input prefix={<PhoneOutlined />} />
      </Modal>
    </>
  )
}

export default AddBrokerModal;