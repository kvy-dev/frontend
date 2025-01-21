import { useEffect, useState } from 'react';
import QrScanner from 'qr-scanner';
import styles from './styles.module.scss';
import { CloseCircleOutlined } from '@ant-design/icons';

const QrCodeScanner = () => {
  const [qrData, setQrData] = useState('');
  const [error, setError] = useState('');
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);
  console.log('qrData', qrData);
  console.log('error', error);

  const handleStartScan = () => {
    if (!videoRef) return;

    const qrScanner = new QrScanner(
      videoRef,
      (result) => {
        setQrData(result.data);
        alert(JSON.stringify(result.data));
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

          return { x, y, width: size, height: size}
        }
      }
    );

    qrScanner.start().catch((err) => setError(err.message));
  };

  useEffect(() => {
    handleStartScan();
  }, [videoRef]);

  return (
    <div className={styles.container}>
      <CloseCircleOutlined className={styles.close} />
      <div className={styles.header}>
        <h1>Scan for access</h1>
        <p>Scan the QR code at entry for access to property</p>
      </div>

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
  );
};

export default QrCodeScanner;