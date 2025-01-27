import { useEffect, useState } from 'react';
import SplashScreen from './components/SplashScreen';
import Login from './components/Login';
import Signup from './components/Signup';
import OTP from './components/OTP';

const Auth = () => {
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

  // to debug
  useEffect(() => {
    console.log(authState);
  }), [authState];

  return (
    <>
      {authState.authStep === 'start' && <SplashScreen navigateTo={navigateTo} handleAuthTypeChange={handleAuthTypeChange} />}
      {authState.authStep === 'login' && <Login navigateTo={navigateTo} />}
      {authState.authStep === 'signup' && <Signup navigateTo={navigateTo} />}
      {authState.authStep === 'otp' && <OTP navigateTo={navigateTo} authType={authState.authType} />}
    </>
  )
}

export default Auth;