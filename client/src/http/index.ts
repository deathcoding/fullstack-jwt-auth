import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import type { AuthResponse } from "../models/response/AuthResponse";

export const API_URL = 'http://localhost:5000/api'

type RetryRequestConfig = InternalAxiosRequestConfig & {
  _isRetry?: boolean;
};

let refreshPromise: Promise<string> | null = null;

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
})

const setAuthorizationHeader = (
  config: InternalAxiosRequestConfig,
  token: string,
) => {
  config.headers.Authorization = `Bearer ${token}`;
};

$api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    setAuthorizationHeader(config, token);
  }

  return config;
})

$api.interceptors.response.use((config) => {
  return config;
}, async (error) => {
  const originalRequest = error.config as RetryRequestConfig | undefined;
  const token = localStorage.getItem('token');

  if (error.response?.status === 401 && originalRequest && !originalRequest._isRetry && token){
    originalRequest._isRetry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = axios
          .get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true })
          .then((response) => {
            const newAccessToken = response.data.accessToken;
            localStorage.setItem('token', newAccessToken);
            return newAccessToken;
          })
          .catch((refreshError) => {
            localStorage.removeItem('token');
            throw refreshError;
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      const newAccessToken = await refreshPromise;
      setAuthorizationHeader(originalRequest, newAccessToken);
      return $api.request(originalRequest);
    } catch {
      return Promise.reject(error);
    }
  }

  return Promise.reject(error);
})

export default $api;
