import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { filter, mergeMap, toArray } from 'rxjs/operators';
import { CityDateType } from '../models/city-data-type.model';
import { AirportsDataType } from '../models/airports-data-type';

@Injectable({
  providedIn: 'root',
})
export class AviaSalesApiService {
  cities: CityDateType[] = [];

  airports: AirportsDataType[] = [];

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

  getAirports(): Observable<AirportsDataType[]> {
    return this.http
      .get<AirportsDataType[]>(
        'https://proxy-lake-two.vercel.app/aviasales_resources/v3/airports.json?locale=en'
      )
      .pipe(
        mergeMap((response: AirportsDataType[]) => response),
        filter(
          (airport: AirportsDataType) =>
            airport.iata_type === 'airport' && airport.flightable === true
        ),
        toArray(),
        tap((filteredResponse: AirportsDataType[]) => {
          this.airports = filteredResponse;
        })
      );
  }
}
