import { LeftOutlined } from '@ant-design/icons';
import styles from '../styles.module.scss';
import { Button, Input } from 'antd';
import { useState } from 'react';

interface OTPProps {
  navigateTo: (a: string) => void;
  authType: string;
  data: any;
  verifyOTP: (a: string, b: string, c: string) => void;
}

const OTP = ({ navigateTo, authType, data, verifyOTP }: OTPProps) => {
  const [otp, setOtp] = useState('');

  const maskPhoneNumber = (phoneNumber: string) => {
    return phoneNumber.replace(/^(\d{6})/, '******');
  }

  return (
    <div className={styles.container}>
      <div className={styles.OTPContainer}>
        <LeftOutlined className={styles.back} onClick={() => navigateTo(authType)} />
        <div className={styles.form}>
          <h3>Enter OTP</h3>
          <p>OTP sent to {maskPhoneNumber(data.phone)}</p>
          <Input.OTP length={4} value={otp} onChange={(e) => setOtp(e)} />
          <Button type="primary" onClick={() => verifyOTP(data.phone, otp, data.name)}>Verify</Button>
        </div>
      </div>
    </div>
  );
}

export default OTP;