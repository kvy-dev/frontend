import { CheckCircleFilled, GlobalOutlined, InstagramOutlined, PhoneOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import { axiosInstance } from '@/services/API';
import Loader from '@/components/Loader';
import TopBar from '@/components/Topbar';

const BrokerDetails = () => {
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axiosInstance.get('/kyv/api/user/me');
        setProfileData(data.data);
      } catch (err) {

      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  if (loading) {
    return <Loader />
  }

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <TopBar backLink='/brokers' />
      </div>
      <div className={styles.profile}>
        <div className={styles.profileImage}>
          <img className={styles.image} src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D" />
          <span className={styles.verifyIcon}><CheckCircleFilled /></span>
        </div>
        <h2>{profileData?.name?.toUpperCase()}</h2>
        <p>Broker</p>
      </div>
      <div className={styles.details}>
        <div className={styles.detail}>
          <InstagramOutlined />
          @elansal
        </div>
        <div className={styles.detail}>
          <PhoneOutlined />
          +91 {profileData?.mobile}
        </div>
        <div className={styles.detail}>
          <GlobalOutlined />
          www.elansal.com
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

export default BrokerDetails;