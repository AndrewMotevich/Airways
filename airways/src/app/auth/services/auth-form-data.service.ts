import { Injectable } from '@angular/core';
import { LoginFormDataType, RegisterFormDataType } from '../models/login-form-data-type.model';

@Injectable({
  providedIn: 'root',
})
export class AuthFormDataService {
  private registerFormData?: RegisterFormDataType;

  private loginFormData?: LoginFormDataType;

  setRegisterFormData(obj: RegisterFormDataType): void {
    this.registerFormData = obj;
  }

  setLoginFormData(obj: LoginFormDataType): void {
    this.loginFormData = obj;
  }

  getRegisterFormData(): RegisterFormDataType | undefined {
    return this.registerFormData;
  }

  getLoginFormData(): LoginFormDataType | undefined {
    return this.loginFormData;
  }
}
