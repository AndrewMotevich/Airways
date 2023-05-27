import { AfterViewInit, Component } from '@angular/core';
import { TripDataType } from '../../models/trip-data-type';
import { HistoryApiService } from '../../services/history-api.service';

@Component({
  selector: 'app-user-account-table',
  templateUrl: './user-account-table.component.html',
  styleUrls: ['./user-account-table.component.scss'],
})
export class UserAccountTableComponent implements AfterViewInit {
  currentHistoryStack: TripDataType[] = [];

  constructor(public historyApi: HistoryApiService) {}

  ngAfterViewInit(): void {
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
