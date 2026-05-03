import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import type { AuthResponse } from "../models/response/AuthResponse";

export const API_URL = 'http://localhost:5000/api'

type RetryRequestConfig = InternalAxiosRequestConfig & {
  _isRetry?: boolean;
};

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
})

$api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
})

$api.interceptors.response.use((config) => {
  return config;
}, async (error) => {
  const originalRequest = error.config as RetryRequestConfig | undefined;
  const token = localStorage.getItem('token');

  if (error.response?.status === 401 && originalRequest && !originalRequest._isRetry && token){
    try {
      originalRequest._isRetry = true;
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true });
      localStorage.setItem('token', response.data.accessToken);
      return $api.request(originalRequest);
    } catch {
      localStorage.removeItem('token');
    };
    throw error;
  }

  return Promise.reject(error);
})

export default $api;
