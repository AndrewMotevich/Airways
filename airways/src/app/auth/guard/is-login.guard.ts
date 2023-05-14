import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ModalWindowService } from '../services/modal-window.service';
import { AuthApiService } from '../services/auth-api.service';

@Injectable({
  providedIn: 'root',
})
export class IsLoginGuard implements CanActivate {
  constructor(
    private loginService: AuthApiService,
    private modalWindowService: ModalWindowService
  ) {}

  canActivate(): boolean {
    if (this.loginService.getIsLogin() === false) {
      this.modalWindowService.openModel();
    }
    return this.loginService.getIsLogin();
  }
}
