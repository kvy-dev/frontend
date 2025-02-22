import { LeftOutlined } from '@ant-design/icons';
import styles from '../styles.module.scss';
import { Button, Input } from 'antd';
import { useState } from 'react';

interface LoginProps {
  navigateTo: (a: string) => void;
  getOTP: (a: string, b: boolean, c?: string) => void;
  phone: string;
}

const Login = ({ navigateTo, getOTP, phone }: LoginProps) => {
  const [number, setNumber] = useState(phone);
  const [error, setError] = useState(false);

  const handleOnClick = () => {
    if ((!/^[6-9]\d{9}$/.test(number))) {
      setError(true);
      return;
    }
    getOTP(number, false);
  }

  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <LeftOutlined className={styles.back} onClick={() => navigateTo('start')} />
        <div className={styles.form}>
          <h3>Login</h3>
          <p>Enter your number to continue</p>
          <Input inputMode="numeric" pattern="[0-9]*" placeholder="Phone number" value={number} onChange={(e) => setNumber(e.target.value)} maxLength={10} />
          {error && <span style={{ color: 'red' }}>Enter correct mobile number</span>}
          <br /><br />
          <Button type="primary" onClick={handleOnClick}>Get OTP</Button>
        </div>
      </div>
      <span className={styles.footer}>Don't have an account, <span className={styles.CTA} onClick={() => navigateTo('signup')}>Signup</span> </span>
    </div>
  );
}

export default Login;