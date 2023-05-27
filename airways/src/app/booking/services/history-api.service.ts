import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthApiService } from 'src/app/auth/services/auth-api.service';
import { TripDataType } from '../models/trip-data-type';

@Injectable({
  providedIn: 'root',
})
export class HistoryApiService {
  history = new BehaviorSubject<TripDataType[]>([]);

  isLoading = false;

  getHistory(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.auth.getAccessToken.subscribe((res) => {
        this.getTrips(res.accessToken).subscribe((his) => {
          this.history.next(his.history.history);
          this.isLoading = false;
        });
      });
    }, 2000);
  }

  constructor(private http: HttpClient, private auth: AuthApiService) {}

  saveHistory(trips: TripDataType[]): void {
    this.auth.getAccessToken.subscribe((res) => {
      trips.forEach((elem) => {
        this.saveTrips(res.accessToken, elem).subscribe();
      });
    });
  }

  getTrips(accessToken: string): Observable<{ history: { history: TripDataType[] } }> {
    return this.http.get<{ history: { history: TripDataType[] } }>(
      'https://airways-api.vercel.app/history/trips',
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );
  }

  saveTrips(accessToken: string, trip: TripDataType): Observable<[]> {
    return this.http.post<[]>('https://airways-api.vercel.app/history/trips', trip, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
  }
}
