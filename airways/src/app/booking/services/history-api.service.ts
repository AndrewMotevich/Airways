import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, mergeMap } from 'rxjs';
import { AuthApiService } from 'src/app/auth/services/auth-api.service';
import { TripDataType } from '../models/trip-data-type';

@Injectable({
  providedIn: 'root',
})
export class HistoryApiService {
  history = this.auth.getAccessToken.pipe(mergeMap((res) => this.getTrips(res.accessToken)));

  constructor(private http: HttpClient, private auth: AuthApiService) {}

  saveHistory(trips: TripDataType[]): void {
    trips.forEach((elem) => {
      this.auth.getAccessToken
        .pipe(mergeMap((res) => this.saveTrips(res.accessToken, elem)))
        .subscribe();
    });
  }

  getTrips(accessToken: string): Observable<[]> {
    return this.http.get<[]>('https://airways-api.vercel.app/history/trips', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
  }

  saveTrips(accessToken: string, trip: TripDataType): Observable<[]> {
    return this.http.post<[]>('https://airways-api.vercel.app/history/trips', trip, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
  }
}
