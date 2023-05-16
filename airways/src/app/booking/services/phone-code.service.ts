import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPhoneCode } from '../models/phone-code.interface';

@Injectable({
  providedIn: 'root'
})
export class PhoneCodeService {
  private jsonUrl = "assets/data/phone-code.json";

  constructor(private http: HttpClient) { }

  getPhoneCode(): Observable<IPhoneCode[]> {
    return this.http.get<IPhoneCode[]>(this.jsonUrl);
  }
}
