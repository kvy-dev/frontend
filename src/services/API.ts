import axios from "axios";
import { config } from "utils/config";
// import { checkErrorRedirectToLogin } from "utils/helper";

export const axiosInstance = axios.create({
  baseURL: `${config.API_BASE_URL}`,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const handleLogout = async () => {
  await axiosInstance.get('/kyv/api/user/logout');
  localStorage.clear();
  window.location.replace('/');
}

axiosInstance.interceptors.response.use(
  (config) => config,
  (error) => {
    if (error?.response?.status === 403 || error?.response?.status === 401) {
      handleLogout();
    }
    return Promise.reject(error);
  }
);
