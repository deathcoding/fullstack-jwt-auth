import { makeAutoObservable } from "mobx";
import type { User } from "../models/User";
import { login, logout, registration } from "../services/AuthService";

export default class Store {
  user = {} as User;
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
   this.isAuth = bool;
  }

  setUser(user: User) {
    this.user = user;
  }

  async loginAction(email:string, password: string) {
    try {
      const response = await login(email, password);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e.response?.data?.message);
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
      console.log(e.response?.data?.message);
    }
  }

  async logoutAction() {
    try {
      await logout();
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({} as User);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  // async checkAuth() {
  //   try {

  //   } catch (e) {

  //   }
  // }
}