import { LeftOutlined } from '@ant-design/icons';
import styles from '../styles.module.scss';
import { Button, Input } from 'antd';

interface OTPProps {
  navigateTo: (a: string) => void;
  authType: string;
}

const OTP = ({ navigateTo, authType }: OTPProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.OTPContainer}>
        <LeftOutlined className={styles.back} onClick={() => navigateTo(authType)} />
        <div className={styles.form}>
          <h3>Enter OTP</h3>
          <p>OTP sent to ******9568</p>
          <Input.OTP length={4} />
          <Button type="primary" onClick={() => navigateTo('start')}>Verify</Button>
        </div>
      </div>
    </div>
  );
}

export default OTP;