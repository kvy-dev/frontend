import { ArrowLeftOutlined, BellOutlined, CheckCircleFilled, GlobalOutlined, InstagramOutlined, PhoneOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';
import { Avatar, Badge, Button } from 'antd';

const Profile = () => {
  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <div className={styles.notifications}>
          <ArrowLeftOutlined />
        </div>
        <BellOutlined />
      </div>
      <div className={styles.profile}>
        <div className={styles.profileImage}>
          <img className={styles.image} src="https://diversifiedllc.com/wp-content/uploads/2024/02/featured-image-for-blogs-1160x665-4-1024x587-1024x585.jpg" />
          <span className={styles.verifyIcon}><CheckCircleFilled /></span>
          <Button className={styles.cta}>Verify</Button>
        </div>
        <h2>Elan William</h2>
        <p>Broker</p>
      </div>
      <div className={styles.details}>
        <div className={styles.detail}>
          <InstagramOutlined />
          @elanwilliam
        </div>
        <div className={styles.detail}>
          <PhoneOutlined />
          +91 8928485829
        </div>
        <div className={styles.detail}>
          <GlobalOutlined />
          https://www.elanwilliam.com
        </div>
      </div>
      <div className={styles.documents}>
        <h2>Documents</h2>
        <img src="https://www.sarkariyojnaa.info/wp-content/uploads/2021/09/aadhar-card.jpg" />
        <img src="https://5.imimg.com/data5/ECOM/Default/2023/2/FW/NM/CU/19020989/back-6b631fc4-0dd0-44dd-bf4a-13d7fed394ec-500x500.png" />
      </div>
    </div>
  )
}

export default Profile;