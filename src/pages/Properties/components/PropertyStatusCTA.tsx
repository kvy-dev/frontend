import { Button, message } from "antd";
import styles from '../styles.module.scss';

interface Props {
  propertyId: Number;
}

const PropertyStatusCTA = ({ propertyId }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();

  const handleChangePropertyStatus = async (relation: string) => {
    messageApi.open({
      type: 'success',
      content: `${propertyId} changed to ${relation}`,
    });
  }

  return (
    <>
      {contextHolder}
      <div className={styles.propertyStatusCTA}>
        <span>Property status</span>
        <div className={styles.cta}>
          {/* <Button className={styles.button} onClick={() => { handleChangePropertyStatus('LISTED') }}>Listed</Button> */}
          <Button className={styles.button} onClick={() => { handleChangePropertyStatus('BUSY') }}>Busy</Button>
          <Button className={styles.button} onClick={() => { handleChangePropertyStatus('UNLISTED') }}>Unlist</Button>
        </div>
      </div>
    </>
  )
}

export default PropertyStatusCTA;