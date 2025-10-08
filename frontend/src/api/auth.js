import axiosInstance from './axios';

export const authAPI = {
  signup: (data) => axiosInstance.post('/api/auth/signup', data),
  login: (data) => axiosInstance.post('/api/auth/login', data),
};
