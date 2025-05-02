import axios from 'axios';
import {access_token, refresh_token} from "@/assets/constants/storage.ts";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api`,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry &&
      localStorage.getItem(refresh_token)
    ) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(
          `${api.defaults.baseURL}/auth/refresh`,
          {
            refreshToken: localStorage.getItem(refresh_token),
          });

        localStorage.setItem(access_token, res.data.accessToken);
        localStorage.setItem(refresh_token, res.data.refreshToken);

        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem(access_token);
        localStorage.removeItem(refresh_token);

        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
