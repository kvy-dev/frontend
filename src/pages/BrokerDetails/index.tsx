import { CheckCircleFilled, GlobalOutlined, InstagramOutlined, PhoneOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import { axiosInstance } from '@/services/API';
import Loader from '@/components/Loader';
import TopBar from '@/components/Topbar';
import { useLocation, useParams } from 'react-router';

const BrokerDetails = () => {
  const [brokerData, setBrokerData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const location = useLocation();

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
        <TopBar backLink={location.search.includes('dashboard') ? '/' : '/brokers'} />
      </div>
      <div className={styles.profile}>
        <div className={styles.profileImage}>
          <img className={styles.image} src={brokerData.imageUrl || 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg'} />
        </div>
        <h2>{brokerData?.name?.toUpperCase()} {brokerData.aadharVerified && <span className={styles.verifyIcon}><CheckCircleFilled /></span>}</h2>
        <p>Broker</p>
      </div>
      <div className={styles.details}>
      <div className={styles.detail}>
          <InstagramOutlined />
          <a href={brokerData?.instagramProfile} target="_blank">{brokerData?.instagramProfile || 'NA'}</a>
        </div>
        <div className={styles.detail}>
          <PhoneOutlined />
          <a href={`tel:+91${brokerData?.mobile}`}>+91 {brokerData?.mobile}</a>
        </div>
        <div className={styles.detail}>
          <GlobalOutlined />
          <a href={brokerData?.websiteUrl}>{brokerData?.websiteUrl || 'NA'}</a>
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