import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IFlightsData } from '../models/flights-data.interface';
import { IFlightDetails } from '../models/flight-details.interface';

@Injectable({
  providedIn: 'root',
})
export class FlightsDataService {
  constructor(private http: HttpClient) {}

  private url =
    'https://proxy-lake-two.vercel.app/aviasales/v3/prices_for_dates?origin=LON&destination=LED&departure_at=2023-05-16&return_at=2023-05-25&unique=false&sorting=price&direct=false&currency=eur&market=ru&limit=30&page=1&one_way=true&token=5fa9c05370aa75d1664db80c2cf8e70b';

  getFlightsData(): Observable<IFlightDetails[]> {
    return this.http
      .get<IFlightsData>(this.url)
      .pipe(
        map((response: IFlightsData) =>
          response.data.map((item) => ({ ...item, seats: Math.trunc(Math.random() * 150) }))
        )
      );
  }
}
