import { Button, Modal, TimePicker } from "antd";
import styles from '../styles.module.scss';
import { useState } from "react";

const ScheduleVisitCTA = () => {
  const [timePickerVisible, toggleTimePickerVisible] = useState(false);

  return (
    <>
      <div className={styles.scheduleVisitCTA}>
        <span>Schedule visit</span>
        <div className={styles.cta}>
          <Button className={styles.button} onClick={() => toggleTimePickerVisible(true)}>Today</Button>
          <Button className={styles.button} onClick={() => toggleTimePickerVisible(true)}>Tomorrow</Button>
        </div>
      </div>
      {
        <Modal title="Schedule visit" centered open={timePickerVisible} onOk={() => null} onCancel={() => toggleTimePickerVisible(false)} okText="Schedule">
          <TimePicker.RangePicker />
        </Modal>
      }
    </>
  )
}

export default ScheduleVisitCTA;