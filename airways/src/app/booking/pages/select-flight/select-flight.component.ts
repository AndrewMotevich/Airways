import { Component, OnInit, Output } from '@angular/core';
import { Observable, forkJoin, from, mergeMap, tap, Subject } from 'rxjs';

import dayjs from 'dayjs';
import { IFlightDetails } from '../../models/flight-details.interface';
import { FlightsDataService } from '../../services/flightsData.service';
import { FormDataService } from '../../services/form-data.service';
import { PointModel, FormDataModel, FlightDirection } from '../../models/form-data.model';

@Component({
  selector: 'app-select-flight',
  templateUrl: './select-flight.component.html',
  styleUrls: ['./select-flight.component.scss'],
  providers: [FlightsDataService],
})
export class SelectFlightComponent implements OnInit {
  private departureDateSubject: Subject<string> = new Subject<string>();

  private returnDateSubject: Subject<string> = new Subject<string>();

  private previousDepartureDate: string;

  private previousReturnDate: string;

  flightData$: Observable<FormDataModel<PointModel>>;

  flightsDetailsDepart$!: Observable<IFlightDetails[]>;

  departure: PointModel = { title: '', code: '' };

  ticketsDataDepart: { date: string; cost: string }[] = [];

  flightsDetailsReturn$!: Observable<IFlightDetails[]>;

  arrival: PointModel = { title: '', code: '' };

  ticketsDataReturn: { date: string; cost: string }[] = [];

  @Output() departureDate: string = '';

  @Output() returnDate: string = '';

  constructor(
    private flightsDataService: FlightsDataService,
    private formDataService: FormDataService
  ) {
    this.flightData$ = this.formDataService.getObservableMainFormData();

    this.flightData$.subscribe((formData: FormDataModel<PointModel>) => {
      this.departure =
        formData.from === null
          ? { title: '', code: '' }
          : { title: formData.from.title, code: formData.from.code };
      this.arrival =
        formData.destination === null
          ? { title: '', code: '' }
          : { title: formData.destination.title, code: formData.destination.code };

      this.departureDate = dayjs(formData?.dateStart).format('YYYY-MM-DD').toString() ?? '';
      this.returnDate = dayjs(formData?.dateEnd).format('YYYY-MM-DD').toString() ?? '';
    });

    this.previousDepartureDate = '';
    this.previousReturnDate = '';
  }

  ngOnInit(): void {
    this.formDataService.flightData$.subscribe((flightData) => {
      this.departureDate = dayjs(flightData?.dateStart).format('YYYY-MM-DD').toString() ?? '';
      this.returnDate = dayjs(flightData?.dateEnd).format('YYYY-MM-DD').toString() ?? '';
      this.fetchFlightsData();
    });

    this.fetchFlightsData();
  }

  private fetchFlightsData(): void {
    if (this.departureDate !== this.previousDepartureDate) {
      const departureDates = [
        dayjs(this.departureDate).subtract(2, 'day').format('YYYY-MM-DD'),
        dayjs(this.departureDate).subtract(1, 'day').format('YYYY-MM-DD'),
        this.departureDate,
        dayjs(this.departureDate).add(1, 'day').format('YYYY-MM-DD'),
        dayjs(this.departureDate).add(2, 'day').format('YYYY-MM-DD'),
      ];

      const flightDepartureRequests = departureDates.map((departureDate) =>
        this.flightsDataService.getFlightsData(
          this.departure.code ?? '',
          this.arrival.code ?? '',
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
                this.departure.code ?? '',
                this.arrival.code ?? '',
                this.departureDate,
                'eur',
                true
              );
            },
          });
      });
    }

    if (this.returnDate !== this.previousReturnDate) {
      const returnDates = [
        dayjs(this.returnDate).subtract(2, 'day').format('YYYY-MM-DD'),
        dayjs(this.returnDate).subtract(1, 'day').format('YYYY-MM-DD'),
        this.returnDate,
        dayjs(this.returnDate).add(1, 'day').format('YYYY-MM-DD'),
        dayjs(this.returnDate).add(2, 'day').format('YYYY-MM-DD'),
      ];

      const flightReturnRequests = returnDates.map((returnDate) =>
        this.flightsDataService.getFlightsData(
          this.arrival.code ?? '',
          this.departure.code ?? '',
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
                this.arrival.code ?? '',
                this.departure.code ?? '',
                this.returnDate,
                'eur',
                true
              );
            },
          });
      });
    }

    this.previousDepartureDate = this.departureDate;
    this.previousReturnDate = this.returnDate;
  }

  handleClickOnNextArrivalDate(): void {
    const nextDate = dayjs(this.returnDate).add(1, 'day').format('YYYY-MM-DD');
    this.returnDateSubject.next(nextDate);
    if (nextDate < this.departureDate) {
      this.departureDateSubject.next(nextDate);
    }
    this.formDataService.setFlightDataDate(dayjs(nextDate).toString(), FlightDirection.ARRIVAL);
  }

  handleClickOnPrevArrivalDate(): void {
    const prevDate = dayjs(this.returnDate).subtract(1, 'day').format('YYYY-MM-DD');
    this.returnDateSubject.next(prevDate);
    if (prevDate < this.departureDate) {
      this.departureDateSubject.next(prevDate);
    }
    this.formDataService.setFlightDataDate(dayjs(prevDate).toString(), FlightDirection.ARRIVAL);
  }

  handleClickOnNextDepartureDate(): void {
    const nextDate = dayjs(this.departureDate).add(1, 'day').format('YYYY-MM-DD');
    this.departureDateSubject.next(nextDate);
    if (nextDate > this.returnDate) {
      this.returnDateSubject.next(nextDate);
    }
    this.formDataService.setFlightDataDate(dayjs(nextDate).toString(), FlightDirection.DEPARTURE);
  }

  handleClickOnPrevDepartureDate(): void {
    const prevDate = dayjs(this.departureDate).subtract(1, 'day').format('YYYY-MM-DD');
    this.departureDateSubject.next(prevDate);
    if (prevDate > this.returnDate) {
      this.returnDateSubject.next(prevDate);
    }
    this.formDataService.setFlightDataDate(dayjs(prevDate).toString(), FlightDirection.DEPARTURE);
  }
}
