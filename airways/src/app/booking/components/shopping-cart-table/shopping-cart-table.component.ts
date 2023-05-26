import { Component } from '@angular/core';

@Component({
  selector: 'app-shopping-cart-table',
  templateUrl: './shopping-cart-table.component.html',
  styleUrls: ['./shopping-cart-table.component.scss'],
})
export class ShoppingCartTableComponent {
  dataSource = [
    {
      flightNumber: 'FR 1925',
      flight: 'Dublin - Warsaw\nModlin - Dublin',
      tripType: 'Rounded Trip',
      date: '1 Mar, 2023, 8:40 - 12:00\n18 Mar, 2023, 7:40 - 11:00',
      passengers: '1 x Adult\n1 x Child\n1 x Infant',
      price: '551.38',
    },
    {
      flightNumber: 'FR 1936',
      flight: 'Gdansk - Warsaw',
      tripType: 'One way',
      date: '28 May, 2023, 15:40 - 16:40',
      passengers: '1 x Adult',
      price: '20.96',
    },
  ];
}
