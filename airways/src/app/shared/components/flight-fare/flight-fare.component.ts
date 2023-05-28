import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ECurrency } from 'src/app/core/models/currency.interface';
import { HeaderDataService } from 'src/app/core/services/header-data.service';

@Component({
  selector: 'app-flight-fare',
  templateUrl: './flight-fare.component.html',
  styleUrls: ['./flight-fare.component.scss']
})
export class FlightFareComponent {
  @Input() adult!: number;

  @Input() child!: number;

  @Input() infant!: number;

  @Input() price!: number;

  currency$: BehaviorSubject<ECurrency>;

  constructor(private dataService: HeaderDataService) {
    this.currency$ = this.dataService.currentCurrency$;
  }

}
