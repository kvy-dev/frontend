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
      userType: 'broker',
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

  const getOTP = async (phone: string, isBuilder: boolean, name?: string) => {
    try {
      const res = await axiosInstance.get(`/kyv/api/user/checkUsernameAvailability?mobile=${phone}`);
      const condition = res.data && !name || !res.data && name;

      if (condition) {
        const requestData = {
          mobile: Number(phone)
        }
        await axiosInstance.post('/kyv/api/auth/requestOtp', requestData);
  
        setAuthState(prev => ({
          ...prev,
          authStep: 'otp',
          authData: {
            name: name ? name : '',
            phone: phone,
            userType: isBuilder ? 'builder' : 'broker'
          }
        }));
      } else {
        messageApi.open({
          type: 'error',
          content: (name || '').length === 0 ? 'User does not exist. Please signup' : 'User already exists. Please login'
        });
      }
    } catch (err: any) {
      messageApi.open({
        type: 'error',
        content: (err as any)?.response?.data?.message
      })
    }
  }

  const verifyOTP = async (phone: string, otp: string, name?: string) => {
    try {
      const requestData = name ? {
        mobile: Number(phone),
        name,
        otp,
        userType: authState?.authData?.userType,
        formtype: 'SIGNUP'
      } : {
        mobile: Number(phone),
        otp,
        userType: authState?.authData?.userType,
        formtype: 'LOGIN'
      };
      const data = await axiosInstance.post('/kyv/api/auth/registerOrLoginWithOtp', requestData);
      if (data.data.verified) {
        localStorage.setItem('kyv_access_token', data.data.accessToken);
        localStorage.setItem('kvy_user_type', data.data.userObjectDto?.userType);
        localStorage.setItem('kvy_user_verified', btoa(data.data.userObjectDto.aadharVerified === 'YES' ? 'true' : 'false'));
        localStorage.setItem('kvy_user_name', data.data.userObjectDto.name);
        dispatch({type: 'update_user', payload: data.data.userObjectDto});
        window.location.reload();
        setAuthState({
          authData: {
            phone: '',
            name: '',
            userType: 'broker'
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
    } catch (err) {
      messageApi.open({
        type: 'error',
        content: 'User does not exist with the number',
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