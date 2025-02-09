import { ArrowLeftOutlined, BellOutlined, CheckCircleFilled, GlobalOutlined, InstagramOutlined, PhoneOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { axiosInstance } from '@/services/API';

const Profile = () => {
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    const getData = async () => {
      const data = await axiosInstance.get('/kyv/api/user/me');
      setProfileData(data.data);
    }

    getData();
  }, []);

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
          <img className={styles.image} src={profileData?.imageUrl} />
          {profileData?.aadharVerified && <span className={styles.verifyIcon}><CheckCircleFilled /></span>}
          {!profileData?.aadharVerified && <Button className={styles.cta}>Verify</Button>}
        </div>
        <h2>{profileData?.name?.toUpperCase()}</h2>
        <p>Broker</p>
      </div>
      <div className={styles.details}>
        <div className={styles.detail}>
          <InstagramOutlined />
          @{profileData?.instagramProfile}
        </div>
        <div className={styles.detail}>
          <PhoneOutlined />
          +91 {profileData?.mobile}
        </div>
        <div className={styles.detail}>
          <GlobalOutlined />
          {profileData?.websiteUrl}
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