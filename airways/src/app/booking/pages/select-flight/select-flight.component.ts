import { Component, OnInit, Output } from '@angular/core';
import { Observable, forkJoin, from, mergeMap, tap } from 'rxjs';
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

  departure: { title: string; code: string } = { title: 'Belgrade', code: 'BEG' }; // add real data

  ticketsDataDepart: { date: string; cost: string }[] = [];

  flightsDetailsReturn$!: Observable<IFlightDetails[]>;

  arrival: { title: string; code: string } = { title: 'Saint-Petersburg', code: 'LED' }; // add real data

  ticketsDataReturn: { date: string; cost: string }[] = [];

  @Output() departureDate: string = '2023-05-22'; // add real data

  @Output() returnDate: string = '2023-05-25'; // add real data

  constructor(private flightsDataService: FlightsDataService) {}

  ngOnInit(): void {
    const departureDates = [
      dayjs(this.departureDate).subtract(2, 'day').format('YYYY-MM-DD'),
      dayjs(this.departureDate).subtract(1, 'day').format('YYYY-MM-DD'),
      this.departureDate,
      dayjs(this.departureDate).add(1, 'day').format('YYYY-MM-DD'),
      dayjs(this.departureDate).add(2, 'day').format('YYYY-MM-DD'),
    ];

    const flightDepartureRequests = departureDates.map((departureDate) =>
      this.flightsDataService.getFlightsData(
        this.departure.code,
        this.arrival.code,
        departureDate,
        'eur', // add real data
        true
      )
    );

    forkJoin(flightDepartureRequests).subscribe((responses: IFlightDetails[][]) => {
      const ticketsDataDepart$ = responses.map((flightsData) =>
        flightsData.map((flight) => ({
          date: dayjs(flight.departure_at).format('YYYY-MM-DD'),
          cost: flight.price.toString(),
        }))
      );

      this.ticketsDataDepart = [];

      from(ticketsDataDepart$)
        .pipe(
          mergeMap((ticketsData$) => ticketsData$),
          tap((ticketsData) => this.ticketsDataDepart.push(ticketsData))
        )
        .subscribe({
          complete: () => {
            this.flightsDetailsDepart$ = this.flightsDataService.getFlightsData(
              this.departure.code,
              this.arrival.code,
              this.departureDate,
              'eur',
              true
            );
          },
        });
    });

    const returnDates = [
      dayjs(this.returnDate).subtract(2, 'day').format('YYYY-MM-DD'),
      dayjs(this.returnDate).subtract(1, 'day').format('YYYY-MM-DD'),
      this.returnDate,
      dayjs(this.returnDate).add(1, 'day').format('YYYY-MM-DD'),
      dayjs(this.returnDate).add(2, 'day').format('YYYY-MM-DD'),
    ];

    const flightReturnRequests = returnDates.map((returnDate) =>
      this.flightsDataService.getFlightsData(
        this.arrival.code,
        this.departure.code,
        returnDate,
        'eur', // add real data
        true
      )
    );

    forkJoin(flightReturnRequests).subscribe((responses: IFlightDetails[][]) => {
      const ticketsDataReturn$ = responses.map((flightsData) =>
        flightsData.map((flight) => ({
          date: dayjs(flight.departure_at).format('YYYY-MM-DD'),
          cost: flight.price.toString(),
        }))
      );

      this.ticketsDataReturn = [];

      from(ticketsDataReturn$)
        .pipe(
          mergeMap((ticketsData$) => ticketsData$),
          tap((ticketsData) => this.ticketsDataReturn.push(ticketsData))
        )
        .subscribe({
          complete: () => {
            this.flightsDetailsReturn$ = this.flightsDataService.getFlightsData(
              this.arrival.code,
              this.departure.code,
              this.returnDate,
              'eur',
              true
            );
          },
        });
    });
  }
}
