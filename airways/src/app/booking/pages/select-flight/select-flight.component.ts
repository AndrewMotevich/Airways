import { Component, OnInit, Output } from '@angular/core';
import { Observable, tap } from 'rxjs';
import dayjs from 'dayjs';
import { IFlightDetails } from '../../models/flight-details.interface';
import { FlightsDataService } from '../../services/flightsData.service';

@Component({
  selector: 'app-select-flight',
  templateUrl: './select-flight.component.html',
  styleUrls: ['./select-flight.component.scss'],
  providers: [FlightsDataService],
})
export class SelectFlightComponent implements OnInit {
  flightsDetailsDepart$!: Observable<IFlightDetails[]>;

  departure: { title: string; code: string } = { title: 'Belgrade', code: 'BEG' };

  ticketsDataDepart: { date: string; cost: string }[] = [];

  flightsDetailsReturn$!: Observable<IFlightDetails[]>;

  arrival: { title: string; code: string } = { title: 'Saint-Petersburg', code: 'LED' };

  ticketsDataReturn: { date: string; cost: string }[] = [];

  @Output() departureDate: string = '2023-05-15';

  @Output() returnDate: string = '2023-05-17';

  constructor(private flightsDataService: FlightsDataService) {}

  ngOnInit(): void {
    // add запрос на cheapest билет (и просто наличие) на +- 2 дня от искомой даты
    this.flightsDetailsDepart$ = this.flightsDataService
      .getFlightsData(this.departure.code, this.arrival.code, this.departureDate, 'eur', false)
      .pipe(
        tap((flightsData) => {
          this.ticketsDataDepart = flightsData.map((flight) => ({
            date: dayjs(flight.departure_at).format('YYYY-MM-DD'),
            cost: flight.price.toString(),
          }));
        })
      );

    // add запрос на cheapest билет (и просто наличие) на +- 2 дня от искомой даты
    this.flightsDetailsReturn$ = this.flightsDataService
      .getFlightsData(this.arrival.code, this.departure.code, this.returnDate, 'eur', false)
      .pipe(
        tap((flightsData) => {
          this.ticketsDataReturn = flightsData.map((flight) => ({
            date: dayjs(flight.departure_at).format('YYYY-MM-DD'),
            cost: flight.price.toString(),
          }));
        })
      );
  }
}
