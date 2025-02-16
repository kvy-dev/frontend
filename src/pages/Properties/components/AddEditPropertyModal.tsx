import { Input, Modal } from "antd";
import { useState } from "react";
import styles from '../styles.module.scss';
import { EditFilled, PhoneOutlined } from "@ant-design/icons";

interface Props {
  edit?: boolean;
}

const AddEditPropertyModal = ({ edit }: Props) => {
  const [showPropertModalForm, toggleShowPropertyModalFOrm] = useState(false);
  
  return (
    <>
      <div className={styles.addPropertyCTA} onClick={() => toggleShowPropertyModalFOrm(true)}>{edit ? <EditFilled className={styles.edit} /> : 'Add property'}</div>
      <Modal
        open={showPropertModalForm}
        onCancel={() => toggleShowPropertyModalFOrm(false)}
        okText="Add property"
      >
        <p>Enter broker mobile number</p>
        <Input prefix={<PhoneOutlined />} />
      </Modal>
    </>
  )
}

export default AddEditPropertyModal;