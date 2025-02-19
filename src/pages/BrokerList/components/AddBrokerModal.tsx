import { Input, Modal } from "antd";
import { useState } from "react";
import styles from '../styles.module.scss';
import { PhoneOutlined } from "@ant-design/icons";
import { axiosInstance } from "@/services/API";

const AddBrokerModal = () => {
  const [showAddBrokerForm, toggleShowBrokerForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mobile, setMobile] = useState('');

  const handleSubmit = () => {
    if ((!/^[6-9]\d{9}$/.test(mobile)))
      return;
    setLoading(true);
    axiosInstance.post('/kyv/api/builder/addNewBroker', { mobile: mobile })
    .then(() => toggleShowBrokerForm(false))
    .catch((err) => console.log(err))
    .finally(() => setLoading(false));
  }
  
  return (
    <>
      <div className={styles.addBrokerCTA} onClick={() => toggleShowBrokerForm(true)}>Add broker</div>
      <Modal
        open={showAddBrokerForm}
        onCancel={() => toggleShowBrokerForm(false)}
        okText="Add broker"
        onOk={handleSubmit}
        loading={loading}
      >
        <p>Enter broker mobile number</p>
        <Input prefix={<PhoneOutlined />} value={mobile} onChange={(e) => setMobile(e.target.value)} />
      </Modal>
    </>
  )
}

export default AddBrokerModal;