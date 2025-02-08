import { LeftOutlined } from '@ant-design/icons';
import styles from '../styles.module.scss';
import { Button, Input } from 'antd';

interface SignupProps {
  navigateTo: (a: string) => void;
}

const Signup = ({ navigateTo }: SignupProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.signupContainer}>
        <LeftOutlined className={styles.back} onClick={() => navigateTo('start')} />
        <div className={styles.form}>
          <h3>Create account</h3>
          <p>Enter your details to create an account</p>
          <Input placeholder="Name" />
          <Input placeholder="Phone number" />
          <Button type="primary" onClick={() => navigateTo('otp')}>Get OTP</Button>
        </div>
      </div>
      <span className={styles.footer}>Already have an account, <span className={styles.CTA} onClick={() => navigateTo('login')}>Login</span> </span>
    </div>
  );
}

export default Signup;