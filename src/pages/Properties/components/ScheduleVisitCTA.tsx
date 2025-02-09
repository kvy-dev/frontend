import { Button, message, Modal, TimePicker } from "antd";
import styles from '../styles.module.scss';
import { useState } from "react";
import { axiosInstance } from "@/services/API";

interface Props {
  propertyId: Number;
}

const ScheduleVisitCTA = ({ propertyId }: Props) => {
  const [timePickerVisible, toggleTimePickerVisible] = useState(false);
  const [timeRange, setTimeRange] = useState([new Date(), new Date()]);
  const [messageApi, contextHolder] = message.useMessage();
  const [day, setDay] = useState(0);

  function formatTime(dateString: any) {
    const date = new Date(dateString);
  
    // Extract hours, minutes, and seconds
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
  
    return `${hours}:${minutes}:${seconds}`;
  }
  

  const handleSubmit = async () => {
    console.log(timeRange);
    const requestData = {
      propertyId : propertyId,
      dayIndicator : day,
      startTime : formatTime(timeRange[0]),
      endTime : formatTime(timeRange[1])
    }
    console.log(requestData);
    const response = await axiosInstance.post('/kyv/api/broker/scheduleVisit', requestData);
    toggleTimePickerVisible(false);
    messageApi.open({
      type: 'success',
      content: 'Visit scheduled',
    });
  }

  return (
    <>
      {contextHolder}
      <div className={styles.scheduleVisitCTA}>
        <span>Schedule visit</span>
        <div className={styles.cta}>
          <Button className={styles.button} onClick={() => { toggleTimePickerVisible(true); setDay(0); }}>Today</Button>
          <Button className={styles.button} onClick={() => { toggleTimePickerVisible(true); setDay(1); }}>Tomorrow</Button>
        </div>
      </div>
      {
        <Modal title="Schedule visit" centered open={timePickerVisible} onOk={handleSubmit} onCancel={() => toggleTimePickerVisible(false)} okText="Schedule">
          <TimePicker.RangePicker onChange={(e) => setTimeRange(e && e[0] && e[1] ? [e[0].toDate(), e[1].toDate()] : [new Date(), new Date()])} />
        </Modal>
      }
    </>
  )
}

export default ScheduleVisitCTA;