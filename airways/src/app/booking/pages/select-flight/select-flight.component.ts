/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnInit, Output } from '@angular/core';
import { Observable, combineLatest, map, of, tap } from 'rxjs';
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
  flightsDetails$!: Observable<IFlightDetails[]>;

  departure: string = 'Dublin';

  arrival: string = 'Warsaw Modlin';

  ticketsData: { date: string; cost: string }[] = [];

  @Output() departureDate: string = '2023-05-15';

  @Output() returnDate: string = '2023-05-17';

  constructor(private flightsDataService: FlightsDataService) {}

  ngOnInit(): void {
    this.flightsDetails$ = this.flightsDataService
      .getFlightsData('BEG', 'LED', this.departureDate, this.returnDate, 'eur', false)
      .pipe(
        tap((flightsData) => {
          this.ticketsData = flightsData.map((flight) => ({
            date: dayjs(flight.departure_at).format('YYYY-MM-DD'),
            cost: flight.price.toString(),
          }));
        })
      );
  }
}
// ngOnInit(): void {
//   const flightsData$ = this.flightsDataService
//     .getFlightsData('BEG', 'LED', this.departureDate, this.returnDate, 'eur', false)
//     .pipe(
//       tap((flightsData) => {
//         this.ticketsData = flightsData.map((flight) => ({
//           date: dayjs(flight.departure_at).format('YYYY-MM-DD'),
//           cost: flight.price.toString(),
//         }));
//       })
//     );

//   this.flightsDetails$ = combineLatest([flightsData$, of(this.ticketsData)]).pipe(
//     map(([flightsData, ticketsData]) => flightsData.map((flight) => ({
//         ...flight,
//         date: dayjs(flight.departure_at).format('YYYY-MM-DD'),
//         cost: flight.price.toString(),
//         ticketData: ticketsData.find(
//           (t) => t.date === dayjs(flight.departure_at).format('YYYY-MM-DD')
//         )?.cost,
//       })))
//   );
// }
// }
