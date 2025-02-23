import { Button, message, Modal, TimePicker } from "antd";
import styles from '../styles.module.scss';
import { useState } from "react";
import { axiosInstance } from "@/services/API";
import useAadharNotVerifiedPopup from "@/utils/useAadharNotVerifiedPopup";

interface Props {
  propertyId: Number;
}

const ScheduleVisitCTA = ({ propertyId }: Props) => {
  const [timePickerVisible, toggleTimePickerVisible] = useState(false);
  const [timeRange, setTimeRange] = useState([new Date(), new Date()]);
  const [messageApi, contextHolder] = message.useMessage();
  const { showAadharError, AadharPopup } = useAadharNotVerifiedPopup();
  const [day, setDay] = useState(0);

  function formatTime(dateString: any) {
    const date = new Date(dateString);
  
    // Extract hours, minutes, and seconds
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
  
    return `${hours}:${minutes}:${seconds}`;
  }
  
  const disabledTime = (checkCurrentTime = false) => {
    const now = new Date(); // Get the current time
  
    return {
      disabledHours: () => {
        let disabled = [...Array(24).keys()].filter((hour) => hour < 10 || hour >= 18); // Disable before 10 AM & after 5 PM
        
        // If flag is enabled and selecting today, disable past hours
        if (checkCurrentTime) {
          disabled = disabled.concat([...Array(now.getHours()).keys()]);
        }
  
        return disabled;
      },
      disabledMinutes: (selectedHour: number) => {
        if (selectedHour === 10 || selectedHour === 18) {
          return [...Array(60).keys()]; // Disable all minutes for 10 AM & 5 PM
        }
  
        // If flag is enabled and selecting the current hour, disable past minutes
        if (checkCurrentTime && selectedHour === now.getHours()) {
          return [...Array(now.getMinutes()).keys()];
        }
  
        return [];
      },
    };
  };
  
  

  const handleSubmit = async () => {
    const requestData = {
      propertyId : propertyId,
      dayIndicator : day,
      startTime : formatTime(timeRange[0]),
      endTime : formatTime(timeRange[1])
    }
    const response = await axiosInstance.post('/kyv/api/broker/scheduleVisit', requestData);
    toggleTimePickerVisible(false);
    if (response.data.erroMessage) {
      messageApi.error({
        type: 'success',
        content: 'Visit already scheduled for this time',
      });
    } else {
      messageApi.open({
        type: 'success',
        content: 'Visit scheduled',
      });
    }
  }

  const handleOpen = (day: number) => {
    if (localStorage.getItem('kvy_user_verified') !== btoa('true')) {
      showAadharError();
      return;
    }
    toggleTimePickerVisible(true);
    setDay(day);
  }

  return (
    <>
      {contextHolder}
      <AadharPopup />
      <div className={styles.scheduleVisitCTA}>
        <span>Schedule visit</span>
        <div className={styles.cta}>
          <Button className={styles.button} onClick={() => handleOpen(0)}>Today</Button>
          <Button className={styles.button} onClick={() => handleOpen(1)}>Tomorrow</Button>
        </div>
      </div>
      {
        <Modal title="Schedule visit" centered open={timePickerVisible} onOk={handleSubmit} onCancel={() => toggleTimePickerVisible(false)} okText="Schedule">
          <TimePicker.RangePicker format="HH:mm" disabledTime={() => disabledTime(day === 0)} onChange={(e) => setTimeRange(e && e[0] && e[1] ? [e[0].toDate(), e[1].toDate()] : [new Date(), new Date()])} />
        </Modal>
      }
    </>
  )
}

export default ScheduleVisitCTA;