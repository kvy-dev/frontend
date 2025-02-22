import { useEffect, useState } from 'react';
import QrScanner from 'qr-scanner';
import styles from './styles.module.scss';
import { CloseCircleOutlined, QrcodeOutlined } from '@ant-design/icons';
import { axiosInstance } from '@/services/API';
import { message, Result } from 'antd';
import useAadharNotVerifiedPopup from '@/utils/useAadharNotVerifiedPopup';

interface Props {
  disabled: boolean;
  iconOnly?: boolean;
}

const QrCodeScanner = ({ disabled, iconOnly }: Props) => {
  const [qrData, setQrData] = useState('');
  const [error, setError] = useState('');

  interface Message {
    type: 'success' | 'error';
    text: string;
  }
  
  const [showMessage, setShowMessage] = useState<Message | undefined>(undefined);
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);
  const [showQR, setShowQR] = useState(false);
  const {showAadharError, AadharPopup} = useAadharNotVerifiedPopup();
  console.log('qrData', qrData);
  console.log('error', error);

  const handleStartScan = () => {
    if (!videoRef) return;

    const qrScanner = new QrScanner(
      videoRef,
      (result) => {
        setQrData(result.data);
        console.log(result.data);
        axiosInstance.get(`/kyv/api/broker/allowBrokerViaQR?propertyId=${result.data}`)
          .then(res => {
            if (res.data) {
              setShowMessage({
                type: 'success',
                text: 'Access granted'
              });
            } else {
              setShowMessage({
                type: 'error',
                text: 'Access not allowed'
              });
            }
          })
          .finally(() => setTimeout(() => {
            setShowQR(false);
            setShowMessage(undefined);
          }, 5000));
        qrScanner.stop();
      },
      {
        highlightScanRegion: true,
        calculateScanRegion(video) {
          const width = video.videoWidth;
          const height = video.videoHeight;

          const size = Math.min(width, height) * 0.29;
          const x = (width - size) / 2;
          const y = (height - size) / 2;

          return { x, y, width: size, height: size }
        }
      }
    );

    qrScanner.start().catch((err) => setError(err.message));
  };

  useEffect(() => {
    handleStartScan();
  }, [videoRef]);

  const handleOpen = () => {
    if (localStorage.getItem('kvy_user_verified') !== btoa('true')) {
      showAadharError();
      return;
    }
    setShowQR(true);
  }

  return (
    <>
      <AadharPopup />
      <div className={styles.CTA}>
        {!disabled && !iconOnly && <button disabled={disabled} onClick={handleOpen}>SCAN TO ACCESS <QrcodeOutlined /> </button>}
        {iconOnly && <span onClick={handleOpen} className={styles.scanIcon}><QrcodeOutlined /><p>SCAN</p></span>}
      </div>
      {showQR && (
        <>
          {showMessage && (
            <div className={styles.container}>
              <Result
                status={showMessage.type}
                title={showMessage.text}
              />
            </div>
          )}
          {!showMessage && (
            <>
              <div className={styles.blur}>
                <CloseCircleOutlined className={styles.close} onClick={() => { setShowQR(false); setVideoRef(null); }} />
                <div className={styles.header}>
                  <h1>Scan for access</h1>
                  <p>Scan the QR code at entry for access to property</p>
                </div>
              </div>
              <div className={styles.focus}></div>
              <div className={styles.container}>
                <div className={styles.videoContainer}>
                  <video
                    ref={(ref) => setVideoRef(ref)}
                    style={{ width: '100%', height: '100vh', objectFit: 'cover' }}
                    autoPlay
                    playsInline
                    muted
                  ></video>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default QrCodeScanner;