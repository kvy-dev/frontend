import { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import Login from './components/Login';
import Signup from './components/Signup';
import OTP from './components/OTP';
import { axiosInstance } from '@/services/API';
import { useDispatch } from 'react-redux';
import { message } from 'antd';

const Auth = () => {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [authState, setAuthState] = useState({
    authData: {
      phone: '',
      name: '',
    },
    otp: '',
    authStep: 'start',
    userData: '',
    error: '',
    authType: '',
  });

  const navigateTo = (step: string) => {
    setAuthState(prev => ({
      ...prev,
      authStep: step
    }));
  }

  const handleAuthTypeChange = (type: string) => {
    setAuthState(prev => ({
      ...prev,
      authType: type
    }));
  }

  const getOTP = async (phone: string, name?: string) => {
    setAuthState(prev => ({
      ...prev,
      authStep: 'otp',
      authData: {
        name: name ? name : '',
        phone: phone,
      }
    }));
    const requestData = {
      mobile: Number(phone)
    }
    await axiosInstance.post('/kyv/api/auth/requestOtp', requestData);
  }

  const verifyOTP = async (phone: string, otp: string, name?: string) => {
    const requestData = name ? {
      mobile: Number(phone),
      name,
      otp,
      userType: 'broker',
    } : {
      mobile: Number(phone),
      otp,
      userType: 'broker',
    };
    const data = await axiosInstance.post('/kyv/api/auth/registerOrLoginWithOtp', requestData);
    if (data.data.verified) {
      localStorage.setItem('kyv_access_token', data.data.accessToken);
      dispatch({type: 'update_user', payload: data.data.userObjectDto});
      setAuthState({
        authData: {
          phone: '',
          name: '',
        },
        otp: '',
        authStep: 'start',
        userData: '',
        error: '',
        authType: '',
      });
    } else {
      messageApi.open({
        type: 'error',
        content: 'Enter correct credentials',
      });
    }
  }

  return (
    <>
      {contextHolder}
      {authState.authStep === 'start' && <SplashScreen navigateTo={navigateTo} handleAuthTypeChange={handleAuthTypeChange} />}
      {authState.authStep === 'login' && <Login navigateTo={navigateTo} getOTP={getOTP} phone={authState?.authData?.phone} />}
      {authState.authStep === 'signup' && <Signup navigateTo={navigateTo} getOTP={getOTP} data={authState.authData} />}
      {authState.authStep === 'otp' && <OTP navigateTo={navigateTo} authType={authState.authType} data={authState?.authData} verifyOTP={verifyOTP} />}
    </>
  )
}

export default Auth;