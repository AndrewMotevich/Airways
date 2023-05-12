import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, Observable } from 'rxjs';
import { LoginService } from './login.service';
import { AuthFormDataService } from './auth-form-data.service';
import { ModalWindowService } from './modal-window.service';

function parseJwt(token: string): { firstName: string } {
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

  tokenData?: { email: string; firstName: string; lastName: string };

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private authLoginData: AuthFormDataService,
    private modalWindowService: ModalWindowService
  ) {}

  register(): Observable<{ message: string }> {
    const registerData = this.authLoginData.getRegisterFormData();
    const email = registerData?.email;
    const password = registerData?.password;
    return this.http
      .post<{ message: string }>('https://airways-api.vercel.app/auth/registration', registerData, {
        withCredentials: true,
      })
      .pipe(
        tap(() => {
          this.login({ email, password }).subscribe();
        })
      );
  }

  login(obj: object | undefined = undefined): Observable<{ accessToken: string }> {
    const loginData = this.authLoginData.getLoginFormData();
    return this.http
      .post<{ accessToken: string }>(
        'https://airways-api.vercel.app/auth/login',
        obj || loginData,
        {
          withCredentials: true,
        }
      )
      .pipe(
        tap((response) => {
          this.accessToken = response.accessToken;
          this.loginService.setIsLogin(true);
          this.modalWindowService.isModal = false;
          this.tokenData = parseJwt(this.accessToken) as {
            email: string;
            firstName: string;
            lastName: string;
          };
        })
      );
  }

  logout(): Observable<{ message: string }> {
    return this.http
      .get<{ message: string }>('https://airways-api.vercel.app/auth/logout', {
        withCredentials: true,
      })
      .pipe(
        tap(() => {
          this.accessToken = '';
          this.loginService.setIsLogin(false);
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
          this.tokenData = parseJwt(this.accessToken) as {
            email: string;
            firstName: string;
            lastName: string;
          };
        })
      );
  }
}
