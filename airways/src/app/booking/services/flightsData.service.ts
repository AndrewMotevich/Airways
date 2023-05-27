import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IFlightsData } from '../models/flights-data.interface';
import { IFlightDetails } from '../models/flight-details.interface';
import { ECurrency } from '../../core/models/currency.interface';

@Injectable({
  providedIn: 'root',
})
export class FlightsDataService {
  private readonly proxyURL: string = 'https://proxy-lake-two.vercel.app/aviasales/v3/';

  private readonly basePricesUrl: string = 'prices_for_dates';

  private readonly token: string = '5fa9c05370aa75d1664db80c2cf8e70b';

  constructor(private http: HttpClient) {}

  getFlightsData(
    origin: string,
    destination: string,
    departureAt: string,
    currency: ECurrency,
    isOneWay: boolean
  ): Observable<IFlightDetails[]> {
    if (!origin || !destination || !departureAt || !currency || !isOneWay) {
      return [] as unknown as Observable<IFlightDetails[]>;
    }

    let url = `${this.proxyURL}${this.basePricesUrl}?origin=${origin}&destination=${destination}&unique=false&sorting=price&direct=false&currency=${currency}&market=ru&limit=30&page=1&one_way=${isOneWay}&token=${this.token}`;

    if (departureAt) {
      url += `&departure_at=${departureAt}`;
    }

    return this.http.get<IFlightsData>(url).pipe(
      map((response: IFlightsData) =>
        response.data?.map((item) => ({
          ...item,
          seats: Math.trunc(Math.random() * 150),
          currency: response.currency,
        }))
      )
    );
  }
}
