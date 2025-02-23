import { LeftOutlined } from '@ant-design/icons';
import styles from '../styles.module.scss';
import { Button, Checkbox, Input } from 'antd';
import { useState } from 'react';

interface SignupProps {
  navigateTo: (a: string) => void;
  data: any;
  getOTP: (a: string, b: boolean, c?: string) => void;
}

const Signup = ({ navigateTo, getOTP, data }: SignupProps) => {
  const [name, setName] = useState(data.name);
  const [phone, setPhone] = useState(data.phone);
  const [userType, setUserType] = useState(false);
  const [error, setError] = useState(false);

  const handleOnClick = () => {
    if ((!/^[6-9]\d{9}$/.test(phone)) || name.length === 0) {
      setError(true);
      return;
    }
    getOTP(phone, userType, name);
  }

  return (
    <div className={styles.container}>
      <div className={styles.signupContainer}>
        <LeftOutlined className={styles.back} onClick={() => navigateTo('start')} />
        <div className={styles.form}>
          <h3>Create account</h3>
          <p>Enter your details to create an account</p>
          <Input placeholder="Name" autoFocus value={name} onChange={(e) => setName(e.target.value)} />
          <Input inputMode="numeric" pattern="[0-9]*" maxLength={10} placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
          {error && <span style={{ color: 'red' }}>Enter correct details</span>}
          <br /><br />
          <Checkbox checked={userType} value={userType} onChange={(e) => setUserType(!e.target.value)} /><span>{'     '}I am a builder</span>
          <Button type="primary" onClick={handleOnClick}>Get OTP</Button>
        </div>
      </div>
      <span className={styles.footer}>Already have an account, <span className={styles.CTA} onClick={() => navigateTo('login')}>Login</span> </span>
    </div>
  );
}

export default Signup;