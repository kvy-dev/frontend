import { CheckCircleFilled, GlobalOutlined, InstagramOutlined, PhoneOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';
import { Button, Divider } from 'antd';
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
  };

  useEffect(() => {
    getData();
  }, []);

  const handleLogout = async () => {
    await axiosInstance.get('/kyv/api/user/logout');
    localStorage.clear();
    window.location.replace('/');
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <TopBar backLink="/" />
      </div>
      <div className={styles.profile}>
        <div className={styles.profileImage}>
          <img
            className={styles.image}
            src={
              profileData?.imageUrl ||
              'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg'
            }
          />
          {(!profileData?.aadharVerified || profileData?.aadharVerified === 'NO') && (
            <Button className={styles.cta}>Verify Aadhar</Button>
          )}
        </div>
        <h2>
          {profileData?.name}{' '}
          {profileData?.aadharVerified === 'YES' && (
            <span className={styles.verifyIcon}>
              <CheckCircleFilled />
            </span>
          )}
        </h2>
        <EditProfile
          initialValues={{
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
          <a href={profileData?.instagramProfile} target="_blank">
            {profileData?.instagramProfile || 'NA'}
          </a>
        </div>
        <div className={styles.detail}>
          <PhoneOutlined />
          <a href={`tel:+91${profileData?.mobile}`}>+91 {profileData?.mobile}</a>
        </div>
        <div className={styles.detail}>
          <GlobalOutlined />
          <a href={profileData?.websiteUrl}>{profileData?.websiteUrl || 'NA'}</a>
        </div>
      </div>
      <div className={styles.documents}>
        <h2>Documents</h2>
        <img
          src="https://www.sarkariyojnaa.info/wp-content/uploads/2021/09/aadhar-card.jpg"
          alt="Aadhaar Card"
          style={{
            width: '100%',
            maxWidth: '300px',
            filter: 'blur(10px)', // Always apply blur
            transition: 'filter 0.3s ease',
          }}
        />
        {profileData?.businessCard && <img src={profileData?.businessCard} />}
      </div>
      <Divider />
      <Button onClick={handleLogout} block>
        Logout
      </Button>
    </div>
  );
};

export default Profile;