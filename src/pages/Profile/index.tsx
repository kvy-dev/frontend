import { CheckCircleFilled, GlobalOutlined, InstagramOutlined, PhoneOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { axiosInstance } from '@/services/API';
import Loader from '@/components/Loader';
import TopBar from '@/components/Topbar';
import EditProfile from '@/components/EditProfile';

const Profile = () => {
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    const data = await axiosInstance.get('/kyv/api/user/me');
    setProfileData(data.data);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <Loader />
  }

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <TopBar backLink='/' />
      </div>
      <div className={styles.profile}>
        <div className={styles.profileImage}>
          <img className={styles.image} src={profileData?.imageUrl} />
          {profileData?.aadharVerified && <span className={styles.verifyIcon}><CheckCircleFilled /></span>}
          {!profileData?.aadharVerified && <Button className={styles.cta}>Verify Aadhar</Button>}
        </div>
        <h2>{profileData?.name}</h2>
        <EditProfile initialValues={{
            name: profileData?.name,
            phone: profileData?.mobile,
            instagramProfile: profileData?.instagramProfile,
            websiteUrl: profileData?.websiteUrl,
          }}
          onSuccess={getData}
        />
      </div>
      <div className={styles.details}>
        <div className={styles.detail}>
          <InstagramOutlined />
          <a href={profileData?.instagramProfile} target="_blank">{profileData?.instagramProfile || 'NA'}</a>
        </div>
        <div className={styles.detail}>
          <PhoneOutlined />
          <a href={`tel:+91${profileData?.mobile}`}>+91 {profileData?.mobile}</a>
        </div>
        <div className={styles.detail}>
          <GlobalOutlined />
          <a href={profileData?.websiteUrl}>{profileData?.websiteUrl}</a>
        </div>
      </div>
      <div className={styles.documents}>
        <h2>Documents</h2>
        <img src="https://www.sarkariyojnaa.info/wp-content/uploads/2021/09/aadhar-card.jpg" />
        {profileData?.businessCard && <img src={profileData?.businessCard} />}
      </div>
    </div>
  )
}

export default Profile;