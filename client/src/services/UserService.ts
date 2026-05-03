import $api from "../http";
import type { AxiosResponse } from 'axios'
import type { User } from "../models/User";

export const fetchUsers = (): Promise<AxiosResponse<User[]>> => {
  return $api.get<User[]>('/users');
};
