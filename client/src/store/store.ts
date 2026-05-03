import axios from "axios";
import { makeAutoObservable } from "mobx";
import { login, logout, registration } from "../services/AuthService";
import { API_URL } from "../http";
import type { User } from "../models/User";
import type { AuthResponse } from "../models/response/AuthResponse";

export default class Store {
  user = {} as User;
  isAuth = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
   this.isAuth = bool;
  }

  setUser(user: User) {
    this.user = user;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  logError(e: unknown) {
    if (axios.isAxiosError(e)) {
      console.log(e.response?.data?.message);
      return;
    }

    console.log(e);
  }

  async loginAction(email:string, password: string) {
    try {
      const response = await login(email, password);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      this.logError(e);
    }
  }

  async registrationAction(email:string, password: string) {
    try {
      const response = await registration(email, password);
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      this.logError(e);
    }
  }

  async logoutAction() {
    try {
      await logout();
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({} as User);
    } catch (e) {
      this.logError(e);
    }
  }

  async checkAuth() {
    if (!localStorage.getItem('token')) {
      return;
    }

    try {
      this.setLoading(true);
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true});
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({} as User);

      if (!axios.isAxiosError(e) || e.response?.status !== 401) {
        console.log(e);
      }
    } finally {
      this.setLoading(false);
    }
  }
}