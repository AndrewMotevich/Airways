import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { LoginService } from '../services/login.service';
import { ModalWindowService } from '../services/modal-window.service';

@Injectable({
  providedIn: 'root',
})
export class IsLoginGuard implements CanActivate {
  constructor(private loginService: LoginService, private modalWindowService: ModalWindowService) {}

  canActivate(): boolean {
    if (this.loginService.getIsLogin() === false) {
      this.modalWindowService.isLogin = true;
    }
    return this.loginService.getIsLogin();
  }
}
