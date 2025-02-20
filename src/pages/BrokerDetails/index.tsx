import { CheckCircleFilled, GlobalOutlined, InstagramOutlined, PhoneOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import { axiosInstance } from '@/services/API';
import Loader from '@/components/Loader';
import TopBar from '@/components/Topbar';
import { useParams } from 'react-router';

const BrokerDetails = () => {
  const [brokerData, setBrokerData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axiosInstance.get(`/kyv/api/builder/getBroker/${id}`);
        setBrokerData(data.data);
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
          <img className={styles.image} src={brokerData.imageUrl} />
          {brokerData.aadharVerified && <span className={styles.verifyIcon}><CheckCircleFilled /></span>}
        </div>
        <h2>{brokerData?.name?.toUpperCase()}</h2>
        <p>Broker</p>
      </div>
      <div className={styles.details}>
        <div className={styles.detail}>
          <InstagramOutlined />
          {brokerData.instagramProfile}
        </div>
        <div className={styles.detail}>
          <PhoneOutlined />
          +91 {brokerData?.mobile}
        </div>
        <div className={styles.detail}>
          <GlobalOutlined />
          {brokerData?.websiteUrl || 'NA'}
        </div>
      </div>
      <div className={styles.documents}>
        <h2>Documents</h2>
        {brokerData.businessCard && <img src={brokerData.businessCard} />}
      </div>
    </div>
  )
}

export default BrokerDetails;