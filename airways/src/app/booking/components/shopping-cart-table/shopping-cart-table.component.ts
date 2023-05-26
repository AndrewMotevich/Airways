import { AfterViewInit, Component } from '@angular/core';
import { HistoryApiService } from '../../services/history-api.service';

@Component({
  selector: 'app-shopping-cart-table',
  templateUrl: './shopping-cart-table.component.html',
  styleUrls: ['./shopping-cart-table.component.scss'],
})
export class ShoppingCartTableComponent implements AfterViewInit {
  dataSource = [
    {
      flightNumber: 'FR 1925',
      flight: 'Dublin - Warsaw\nModlin - Dublin',
      tripType: 'Rounded Trip',
      date: '1 Mar, 2023, 8:40 - 12:00\n18 Mar, 2023, 7:40 - 11:00',
      passengers: '1 x Adult\n1 x Child\n1 x Infant',
      price: '551.38',
    },
  ];

  constructor(private history: HistoryApiService) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.history.history.subscribe((res) => console.log(res));
    }, 1000);
  }
}
