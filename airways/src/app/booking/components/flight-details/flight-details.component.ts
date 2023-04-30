import { Component, DEFAULT_CURRENCY_CODE, OnInit } from '@angular/core';
import { IFlightDetails } from 'src/app/booking/models/flight-details.interface';
import { FlightsDataService } from 'src/app/booking/services/flightsData.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss'],
  providers: [FlightsDataService, { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' }]
})
export class FlightDetailsComponent implements OnInit {
  flightsDetails$!: Observable<IFlightDetails[]>;

  constructor(private flightsDataService: FlightsDataService) { }

  ngOnInit(): void {
    this.flightsDetails$ = this.flightsDataService.getFlightsData();
  }
}
