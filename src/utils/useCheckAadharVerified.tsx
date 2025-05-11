import { axiosInstance } from "@/services/API";
import { useEffect } from "react";

const useCheckAadharVerified = (isBuilder?: Boolean) => {
  useEffect(() => {
    const checkAadharVerified = async () => {
      if (!isBuilder) {
        try {
          const response = await axiosInstance.get('/kyv/api/user/aadharVerified');
          localStorage.setItem('kvy_user_verified', btoa(response.data));
        } catch (error) {
          console.error('Error checking Aadhar verification:', error);
        }
      }
    };

    checkAadharVerified();
  }, []);
}

export default useCheckAadharVerified;