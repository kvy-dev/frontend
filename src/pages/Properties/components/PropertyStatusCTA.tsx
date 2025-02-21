import { Button, message } from "antd";
import styles from '../styles.module.scss';
import { axiosInstance } from "@/services/API";

interface Props {
  propertyId: Number;
  activeTab: string;
  refetch: () => void;
}

const PropertyStatusCTA = ({ propertyId, activeTab, refetch }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();

  const handleChangePropertyStatus = async (status: string) => {
    axiosInstance.patch(`/kyv/api/property/${propertyId}/status?newStatus=${status}`)
    .then((res: any) => {
      refetch();
      messageApi.open({
        type: 'success',
        content: `${propertyId} changed to ${status}`,
      });
    })
  }

  return (
    <>
      {contextHolder}
      <div className={styles.propertyStatusCTA}>
        <span>Property status</span>
        <div className={styles.cta}>
          {activeTab !== 'LISTED' && <Button className={styles.button} onClick={() => { handleChangePropertyStatus('LISTED') }}>Listed</Button>}
          {activeTab !== 'BUSY' && <Button className={styles.button} onClick={() => { handleChangePropertyStatus('BUSY') }}>Busy</Button>}
          {activeTab !== 'UNLISTED' && <Button className={styles.button} onClick={() => { handleChangePropertyStatus('UNLISTED') }}>Unlist</Button>}
        </div>
      </div>
    </>
  )
}

export default PropertyStatusCTA;