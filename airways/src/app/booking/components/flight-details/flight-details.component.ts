import { Component, DEFAULT_CURRENCY_CODE, Input } from '@angular/core';
import { IFlightDetails } from '../../models/flight-details.interface';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss'],
  providers: [{ provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' }],
})
export class FlightDetailsComponent {
  @Input() flight!: IFlightDetails;
}
