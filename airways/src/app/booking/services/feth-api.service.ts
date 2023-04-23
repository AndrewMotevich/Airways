import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { City } from '../models/city.model';

@Injectable({
  providedIn: 'root',
})
export class FetchApiService {
  cities: City[] = [];

  constructor(private http: HttpClient) {}

  getCities(): Observable<City[]> {
    return this.http
      .get<City[]>('https://proxy-lake-two.vercel.app/aviasales_resources/v3/cities.json?locale=en')
      .pipe(
        tap((response) => {
          this.cities = response;
        })
      );
  }
}
