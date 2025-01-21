import axios from "axios";
import { config } from "utils/config";
// import { checkErrorRedirectToLogin } from "utils/helper";

export const axiosInstance = axios.create({
  baseURL: `${config.API_BASE_URL}`,
  timeout: 10000,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (config) => config,
  (error) => {
    if (error?.response?.status === 403 || error?.response?.status === 401) {
      // checkErrorRedirectToLogin(error.response.status);
    }
    return Promise.reject(error);
  }
);
