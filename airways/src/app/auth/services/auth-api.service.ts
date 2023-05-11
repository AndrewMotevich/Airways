import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, Observable } from 'rxjs';
import { LoginService } from './login.service';
import { AuthFormDataService } from './auth-form-data.service';
import { ModalWindowService } from './modal-window.service';

function parseJwt(token: string): object {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );

  return JSON.parse(jsonPayload);
}

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  accessToken = '';

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private authLoginData: AuthFormDataService,
    private modalWindowService: ModalWindowService
  ) {}

  login(): Observable<{ accessToken: string }> {
    const loginData = this.authLoginData.getLoginFormData();
    return this.http
      .post<{ accessToken: string }>('https://airways-api.vercel.app/auth/login', loginData, {
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          this.accessToken = response.accessToken;
          this.loginService.setIsLogin(true);
          this.modalWindowService.isModal = false;
        })
      );
  }

  refresh(): Observable<{ accessToken: string }> {
    return this.http
      .get<{ accessToken: string }>('https://airways-api.vercel.app/auth/refresh', {
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          this.accessToken = response.accessToken;
          this.loginService.setIsLogin(true);
          this.modalWindowService.isModal = false;
          console.log(parseJwt(this.accessToken));
        })
      );
  }
}
