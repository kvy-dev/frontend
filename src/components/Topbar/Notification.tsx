const data = {
  profileImageUrl: '',
  notificationTime: new Date(),
  message: '<span><b>BUILDER_NAME</b> has <span data-color=green>accepted</span> your visit scheduled to <b>PROPERTY_NAME</b> for <b>TODAY|TOMORROW TIME</b>.</span',
  visitTime: '<span>Visit time: <b>TIME</b></span>',
  showCTA: false,
  brokerId: "",
  propertyId: "",
}

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";
import styles from './styles.module.scss';
import { Button, Divider } from "antd";
import { axiosInstance } from "@/services/API";
import { useState } from "react";

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

const HtmlRenderer = ({ htmlContent }: { htmlContent: string }) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

const Notification = () => {
  const [ctaLoading, setCTALoading] = useState(false); 
  
  const updateRequestStatus = (e: any, status: string) => {
    e.stopPropagation();
    e.preventDefault();
    setCTALoading(true);
    if (status === 'blacklisted') {
      Promise.all([
        axiosInstance.post('/kyv/api/builder/changeBrokerStatus', {
          "brokerId": data.brokerId,
          "preApproved": "NO",
          "blackListed": "YES"
        }),
        axiosInstance.post('kyv/api/builder/approveRequest', {
          propertyId: data.propertyId,
          brokerId: data.brokerId,
          status: 'REJECTED',
        })
      ])
      .then(() => window.location.reload())
      .catch()
      .finally(() => setCTALoading(false));
    } else {
      axiosInstance.post('kyv/api/builder/approveRequest', {
        propertyId: data.propertyId,
        brokerId: data.brokerId,
        status: status,
      })
      .then(() => {})
      .catch()
      .finally(() => setCTALoading(false));
    }
  }

  const formatDate = (date: Date) => {
    return dayjs(date).format("dddd h:mm A"); // Example: "Monday 1:10 PM"
  };

  const formatTimeAgo = (inputDate: Date) => {
    return dayjs(inputDate).fromNow();
  };

  return (
    <div className={styles.notifContainer}>
      <div className={styles.body}>
        <img src={data.profileImageUrl || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} />
        <div>
          <HtmlRenderer htmlContent={data.message} />
          <br />
          <HtmlRenderer htmlContent={data.visitTime} />
        </div>
      </div>
      {
        data.showCTA && (
          <div className={styles.cta}>
            <Button disabled={ctaLoading} block style={{ color: "#ECE0FC", backgroundColor: "#8569F8"}} onClick={(e: any) => updateRequestStatus(e, 'APPROVED')}>Accept</Button>
            <Button disabled={ctaLoading} block color='danger' variant="outlined" onClick={(e: any) => updateRequestStatus(e, 'REJECTED')}>Reject</Button>
            <Button disabled={ctaLoading} block onClick={(e: any) => updateRequestStatus(e, 'blacklisted')} variant="text">Blacklist</Button>
          </div>
        )
      }
      <div className={styles.footer}>
        <span>{formatDate(data.notificationTime)}</span>
        <span>{formatTimeAgo(data.notificationTime)}</span>
      </div>
      <Divider />
    </div>
  )
}

export default Notification;