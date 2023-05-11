import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private isLogin = true;

  setIsLogin(value: boolean): void {
    this.isLogin = value;
  }

  getIsLogin(): boolean {
    return this.isLogin;
  }
}
