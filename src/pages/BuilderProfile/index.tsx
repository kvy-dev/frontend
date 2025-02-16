import { ArrowLeftOutlined, BellOutlined, CheckCircleFilled, GlobalOutlined, InstagramOutlined, PhoneOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';
import { Button, Switch } from 'antd';
import { useEffect, useState } from 'react';
import { axiosInstance } from '@/services/API';
import Loader from '@/components/Loader';
import { Link } from 'react-router-dom';
import TopBar from '@/components/Topbar';

const BuilderProfile = () => {
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const getData = async () => {
  //     const data = await axiosInstance.get('/kyv/api/user/me');
  //     setProfileData(data.data);
  //     setLoading(false);
  //   }

  //   getData();
  // }, []);

  if (loading) {
    return <Loader />
  }

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <TopBar isMenu={true} />
      </div>
      <div className={styles.profile}>
        <div className={styles.profileImage}>
          <img className={styles.image} src="https://www.dlf.in/offices/blog/images/future-here.jpg" />
        </div>
        <h2>{profileData?.name?.toUpperCase()}DLF Builders</h2>
        <p>Builder</p>
      </div>
      <div className={styles.details}>
        <div className={styles.detail}>
          <InstagramOutlined />
          @{profileData?.instagramProfile}dlf_builders
        </div>
        <div className={styles.detail}>
          <PhoneOutlined />
          +91 {profileData?.mobile} 9999999999
        </div>
        <div className={styles.detail}>
          <GlobalOutlined />
          {profileData?.websiteUrl}https://www.dlf.com
        </div>
      </div>
      <div className={styles.employees}>
        <h2>Employees <Button type="dashed" color="primary" >Add +</Button></h2>
        <div className={styles.heading}>
          <span>Name</span>
          <span>Role</span>
        </div>
        <div className={styles.row}>
          <span>Employee 1</span>
          <span>Admin</span>
          <Switch
            style={{ width: "100px" }}
            checkedChildren={"Enabled"}
            unCheckedChildren={"Disabled"}
            defaultChecked
          />
        </div>
        <div className={styles.row}>
          <span>Employee 1</span>
          <span>Admin</span>
          <Switch
            style={{ width: "100px" }}
            checkedChildren={"Enabled"}
            unCheckedChildren={"Disabled"}
            defaultChecked
          />
        </div>
        <div className={styles.row}>
          <span>Employee 1</span>
          <span>Admin</span>
          <Switch
            style={{ width: "100px" }}
            checkedChildren={"Enabled"}
            unCheckedChildren={"Disabled"}
            defaultChecked
          />
        </div>
        <div className={styles.row}>
          <span>Employee 1</span>
          <span>Admin</span>
          <Switch
            style={{ width: "100px" }}
            checkedChildren={"Enabled"}
            unCheckedChildren={"Disabled"}
            defaultChecked
          />
        </div>
      </div>
    </div>
  )
}

export default BuilderProfile;