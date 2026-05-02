import $api from "../http";
import type { AxiosResponse } from 'axios'
import type { User } from "../models/User";

export default class UserService {
  static fetchUsers(): Promise<AxiosResponse<User[]>> {
    return $api.get<User[]>('/users');
  }
}

