import $api from "../http";
import type { AxiosResponse } from 'axios'
import type { AuthResponse } from "../models/response/AuthResponse";

export const login = async (
  email: string,
  password: string,
): Promise<AxiosResponse<AuthResponse>> => {
  return $api.post<AuthResponse>('/login', { email, password });
};

export const registration = async (
  email: string,
  password: string,
): Promise<AxiosResponse<AuthResponse>> => {
  return $api.post<AuthResponse>('/registration', { email, password });
};

export const logout = async (): Promise<void> => {
  await $api.post('/logout');
};
