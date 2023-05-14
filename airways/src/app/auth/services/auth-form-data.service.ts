import { Injectable } from '@angular/core';
import { LoginFormDataType, RegisterFormDataType } from '../models/login-form-data-type.model';

@Injectable({
  providedIn: 'root',
})
export class AuthFormDataService {
  private registerFormData?: RegisterFormDataType;

  private loginFormData?: LoginFormDataType;

  setRegisterFormData(registerData: RegisterFormDataType): void {
    this.registerFormData = registerData;
  }

  setLoginFormData(loginData: LoginFormDataType): void {
    this.loginFormData = loginData;
  }

  getRegisterFormData(): RegisterFormDataType | {} {
    return this.registerFormData || {};
  }

  getLoginFormData(): LoginFormDataType | {} {
    return this.loginFormData || {};
  }
}
