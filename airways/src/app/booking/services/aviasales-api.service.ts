import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { CityDateType } from '../models/city-data-type.model';

@Injectable({
  providedIn: 'root',
})
export class AviaSalesApiService {
  cities: CityDateType[] = [];

  constructor(private http: HttpClient) {}

  getCities(): Observable<CityDateType[]> {
    return this.http
      .get<CityDateType[]>(
        'https://proxy-lake-two.vercel.app/aviasales_resources/v3/cities.json?locale=en'
      )
      .pipe(
        tap((response) => {
          this.cities = response;
        })
      );
  }
}
