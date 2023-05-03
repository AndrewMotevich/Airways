import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalWindowService {
  isLogin = false;

  showModal(): void {
    this.isLogin = !this.isLogin;
  }
}
