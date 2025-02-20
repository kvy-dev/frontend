import { LeftOutlined } from '@ant-design/icons';
import styles from '../styles.module.scss';
import { Button, Checkbox, Input } from 'antd';
import { useState } from 'react';

interface LoginProps {
  navigateTo: (a: string) => void;
  getOTP: (a: string, b: boolean, c?: string) => void;
  phone: string;
}

const Login = ({ navigateTo, getOTP, phone }: LoginProps) => {
  const [number, setNumber] = useState(phone);
  const [userType, setUserType] = useState(false);
  const [error, setError] = useState(false);

  const handleOnClick = () => {
    if ((!/^[6-9]\d{9}$/.test(number))) {
      setError(true);
      return;
    }
    getOTP(number, userType);
  }

  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <LeftOutlined className={styles.back} onClick={() => navigateTo('start')} />
        <div className={styles.form}>
          <h3>Login</h3>
          <p>Enter your number to continue</p>
          <Input placeholder="Phone number" value={number} onChange={(e) => setNumber(e.target.value)} />
          {error && <span style={{ color: 'red' }}>Enter correct mobile number</span>}
          <br /><br />
          <Checkbox checked={userType} value={userType} onChange={(e) => setUserType(!e.target.value)} /><span>{'     '}I am a builder</span>
          <Button type="primary" onClick={handleOnClick}>Get OTP</Button>
        </div>
      </div>
      <span className={styles.footer}>Don't have an account, <span className={styles.CTA} onClick={() => navigateTo('signup')}>Signup</span> </span>
    </div>
  );
}

export default Login;