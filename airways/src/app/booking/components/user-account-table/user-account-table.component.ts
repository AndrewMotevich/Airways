import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TripDataType } from '../../models/trip-data-type';
import { HistoryApiService } from '../../services/history-api.service';
import { HistoryDataService } from '../../services/history-data.service';

@Component({
  selector: 'app-user-account-table',
  templateUrl: './user-account-table.component.html',
  styleUrls: ['./user-account-table.component.scss'],
})
export class UserAccountTableComponent implements OnInit {
  currentHistoryStack: TripDataType[] = [];

  constructor(
    public historyApi: HistoryApiService,
    public historyData: HistoryDataService,
    private router: Router
  ) {}

  setCurrentHistory(trip: TripDataType): void {
    this.historyData.setHistoryItem(trip);
    this.router.navigate(['/history-summary']);
  }

  ngOnInit(): void {
    this.historyApi.history.subscribe((res) => {
      this.currentHistoryStack = res;
    });
    this.historyApi.getHistory();
  }

  // eslint-disable-next-line class-methods-use-this
  elemSum(elem: TripDataType): number {
    return (
      (elem.ticketsData.data[0].price +
        (elem.ticketsData.data[1] !== undefined ? elem.ticketsData.data[1].price : 0)) *
      (elem.mainData.passengers !== null ? elem.mainData.passengers : 1)
    );
  }
}
