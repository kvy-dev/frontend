import { LeftOutlined } from '@ant-design/icons';
import styles from '../styles.module.scss';
import { Button, Input } from 'antd';

interface LoginProps {
  navigateTo: (a: string) => void;
}

const Login = ({ navigateTo }: LoginProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <LeftOutlined className={styles.back} onClick={() => navigateTo('start')} />
        <div className={styles.form}>
          <h3>Login</h3>
          <p>Enter your number to continue</p>
          <Input placeholder="Phone number" />
          <Button type="primary" onClick={() => navigateTo('otp')}>Get OTP</Button>
        </div>
      </div>
      <span className={styles.footer}>Don't have an account, <span className={styles.CTA} onClick={() => navigateTo('signup')}>Signup</span> </span>
    </div>
  );
}

export default Login;