import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ECurrency } from 'src/app/core/models/currency.interface';
import { HeaderDataService } from 'src/app/core/services/header-data.service';

type TFareItem = {
  title: string;
  count: number;
  price: number;
  tax: number;
  fare: number;
}

@Component({
  selector: 'app-flight-fare',
  templateUrl: './flight-fare.component.html',
  styleUrls: ['./flight-fare.component.scss']
})
export class FlightFareComponent implements OnInit {
  @Input() passengersTotal!: { adult: number, child: number, infant: number };

  @Input() price!: number;

  @Input() currentCurrency!: string;

  priceDecrease: { [key: string]: number } = {
    adult: 1,
    child: 0.7,
    infant: 0.5
  }

  taxDecrease: { [key: string]: number } = {
    adult: 0.4,
    child: 0.3,
    infant: 0.2
  }

  total: number = 0;

  fareInfo: TFareItem[] = [];

  ngOnInit(): void {
    Object.entries(this.passengersTotal).map(([key, count]) => {
      if (!count) return;

      const price = parseFloat((this.price * this.priceDecrease[key]).toFixed(2));
      const tax = parseFloat((price * this.taxDecrease[key]).toFixed(2));
      const fare = price - tax;

      this.total += parseFloat((price * count).toFixed(2));

      this.fareInfo.push({
        title: `${count} x ${key} Fare`,
        count,
        price,
        tax,
        fare
      });
    })
  }
}
