import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://188.120.236.240:8085/api',
});

export default api;
