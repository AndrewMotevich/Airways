import { Component, OnInit } from '@angular/core';
import { IFlightDetails } from 'src/app/airways/models/flight-details.interface';
import mockFlightsData from '../../../../../assets/data/flight-details.json';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss']
})
export class FlightDetailsComponent implements OnInit {
  flightsDetails!: IFlightDetails[];

  ngOnInit(): void {
    this.flightsDetails = mockFlightsData.flights;
  }
}
