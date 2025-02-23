import { Form, Input, message, Modal } from "antd";
import { useState } from "react";
import styles from '../styles.module.scss';
import { PhoneOutlined } from "@ant-design/icons";
import { axiosInstance } from "@/services/API";

const AddBrokerModal = () => {
  const [showAddBrokerForm, toggleShowBrokerForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mobile, setMobile] = useState('');
  const [messageApi, contextHolder] = message.useMessage();
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if ((!/^[6-9]\d{9}$/.test(mobile))) {
      setError(true);
      return;
    }
    setLoading(true);
    axiosInstance.post('/kyv/api/builder/addNewBroker', { mobileNumber: mobile })
    .then((res: any) => {
      const data = res.data;
      if (data.isSuccess) {
        messageApi.open({
          type: 'success',
          content: 'Broker invited successfully',
        });
      } else {
        messageApi.open({
          type: 'error',
          content: data.errorMessage.message,
        });
      }
      setMobile('');
      toggleShowBrokerForm(false);
      setError(false);
    })
    .catch((err) => console.log(err))
    .finally(() => setLoading(false));
  }
  
  return (
    <>
      {contextHolder}
      <div className={styles.addBrokerCTA} onClick={() => toggleShowBrokerForm(true)}>Add broker</div>
      <Modal
        open={showAddBrokerForm}
        onCancel={() => { toggleShowBrokerForm(false); setMobile(''); setError(false); }}
        okText="Add broker"
        onOk={handleSubmit}
        loading={loading}
        destroyOnClose
      >
        <p>Enter broker mobile number</p>
        <Form.Item>
          <Input prefix={<PhoneOutlined />} maxLength={10} value={mobile} onChange={(e) => setMobile(e.target.value)} />
          {error && <span style={{ color: 'red' }}>Enter correct mobile number</span>}
        </Form.Item>
      </Modal>
    </>
  )
}

export default AddBrokerModal;