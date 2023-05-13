import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IFlightDetails } from '../../models/flight-details.interface';
import { FlightsDataService } from '../../services/flightsData.service';

@Component({
  selector: 'app-select-flight',
  templateUrl: './select-flight.component.html',
  styleUrls: ['./select-flight.component.scss'],
  providers: [FlightsDataService],
})
export class SelectFlightComponent implements OnInit {
  flightsDetails$!: Observable<IFlightDetails[]>;

  constructor(private flightsDataService: FlightsDataService) {}

  ngOnInit(): void {
    this.flightsDetails$ = this.flightsDataService.getFlightsData();
  }
}
