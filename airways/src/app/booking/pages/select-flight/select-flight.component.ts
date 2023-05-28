import { Component, OnInit, Output } from '@angular/core';
import { Observable, forkJoin, from, mergeMap, tap, Subject } from 'rxjs';

import dayjs from 'dayjs';
import { Router } from '@angular/router';
import { IFlightDetails } from '../../models/flight-details.interface';
import { FlightsDataService } from '../../services/flightsData.service';
import { FormDataService } from '../../services/form-data.service';
import { PointModel, FormDataModel, FlightDirection } from '../../models/form-data.model';
import { ECurrency } from '../../../core/models/currency.interface';
import { HeaderDataService } from '../../../core/services/header-data.service';
// import { TripDataService } from '../../services/trip-data.service';
import { TicketsDataService } from '../../services/tickets-data.service';

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

  private previousArrivalCode: string;

  private previousDepartureCode: string;

  private previousReturnCurrency?: ECurrency;

  private previousDepartureCurrency?: ECurrency;

  flightData$: Observable<FormDataModel<PointModel>>;

  flightsDetailsDepart$!: Observable<IFlightDetails[]>;

  currency$: Observable<ECurrency>;

  ticketsData$: Observable<IFlightDetails[]>;

  departure: PointModel = { title: '', code: '' };

  currency!: ECurrency;

  ticketsDataDepart: { date: string; cost: string; seats: number }[] = [];

  flightsDetailsReturn$!: Observable<IFlightDetails[]>;

  arrival: PointModel = { title: '', code: '' };

  ticketsDataReturn: { date: string; cost: string; seats: number }[] = [];

  flightDepartureCurrency!: ECurrency;

  flightReturnCurrency!: ECurrency;

  isOneWay!: boolean;

  passengersCount: number = 0;

  departureTicketsCount: number = 0;

  returnTicketsCount: number = 0;

  allDepartureTicketsSelected: boolean = false;

  allReturnTicketsSelected: boolean = false;

  allTicketsSelected: boolean = this.allDepartureTicketsSelected && this.allReturnTicketsSelected;

  @Output() departureDate: string = '';

  @Output() returnDate: string = '';

  constructor(
    private flightsDataService: FlightsDataService,
    private formDataService: FormDataService,
    private headerDataService: HeaderDataService,
    // private tripData: TripDataService,
    private ticketsDataService: TicketsDataService,
    private router: Router
  ) {
    this.flightData$ = this.formDataService.getObservableMainFormData();

    this.ticketsData$ = this.ticketsDataService.getObservableTickets();

    this.currency$ = this.headerDataService.currentCurrency$;

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
      this.isOneWay = formData.roundedTrip === 'one';
    });

    this.previousDepartureDate = '';
    this.previousReturnDate = '';
    this.previousArrivalCode = '';
    this.previousDepartureCode = '';
  }

  ngOnInit(): void {
    this.formDataService.flightData$.subscribe((flightData) => {
      this.departureDate = dayjs(flightData?.dateStart).format('YYYY-MM-DD').toString() ?? '';
      this.returnDate = dayjs(flightData?.dateEnd).format('YYYY-MM-DD').toString() ?? '';
      this.fetchFlightsData();
    });

    this.headerDataService.currentCurrency$.subscribe((currency) => {
      this.currency = currency;
      this.fetchFlightsData();
    });

    this.fetchFlightsData();

    this.flightData$.subscribe((formData: FormDataModel<PointModel>) => {
      this.passengersCount = formData.passengers;
      this.isOneWay = formData.roundedTrip === 'one';

      this.allDepartureTicketsSelected = this.departureTicketsCount >= 1;
      this.allReturnTicketsSelected = this.returnTicketsCount >= 1;
      this.allTicketsSelected = this.allDepartureTicketsSelected && this.allReturnTicketsSelected;
    });

    this.ticketsData$.subscribe((tickets: IFlightDetails[]) => {
      this.departureTicketsCount = tickets.filter(
        (ticket) => ticket.destination_airport === this.arrival.code
      ).length;

      this.returnTicketsCount = tickets.filter(
        (ticket) => ticket.destination_airport === this.departure.code
      ).length;

      this.allDepartureTicketsSelected = this.departureTicketsCount >= 1;
      this.allReturnTicketsSelected = this.returnTicketsCount >= 1;
      this.allTicketsSelected = this.allDepartureTicketsSelected && this.allReturnTicketsSelected;
    });
  }

  private fetchFlightsData(): void {
    if (
      this.departureDate !== this.previousDepartureDate ||
      this.previousArrivalCode !== this.arrival.code ||
      this.previousDepartureCode !== this.departure.code ||
      this.previousDepartureCurrency !== this.currency
    ) {
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
          this.currency,
          this.isOneWay
        )
      );

      forkJoin(flightDepartureRequests).subscribe((responses: IFlightDetails[][]) => {
        if (responses) {
          const ticketsDataDepart$ = responses
            ?.map((flightsData) =>
              flightsData?.map((flight) => ({
                date: dayjs(flight.departure_at).format('YYYY-MM-DD'),
                cost: flight.price.toString(),
                seats: flight.seats ?? 0,
              }))
            )
            .filter(Boolean);

          if (ticketsDataDepart$) {
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
                    this.currency,
                    this.isOneWay
                  );
                },
              });
          }
        }
      });

      this.flightDepartureCurrency = this.currency;
      this.previousDepartureCurrency = this.currency;
    }

    if (
      (this.returnDate !== this.previousReturnDate ||
        this.previousArrivalCode !== this.arrival.code ||
        this.previousDepartureCode !== this.departure.code ||
        this.previousReturnCurrency !== this.currency) &&
      !this.isOneWay
    ) {
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
          this.currency,
          this.isOneWay
        )
      );
      forkJoin(flightReturnRequests).subscribe((responses: IFlightDetails[][]) => {
        if (responses) {
          const ticketsDataReturn$ = responses
            ?.map((flightsData) =>
              flightsData?.map((flight) => ({
                date: dayjs(flight.departure_at).format('YYYY-MM-DD'),
                cost: flight.price.toString(),
                seats: flight.seats ?? 0,
              }))
            )
            .filter(Boolean);

          if (ticketsDataReturn$) {
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
                    this.currency,
                    this.isOneWay
                  );
                },
              });
          }
        }
      });

      this.flightReturnCurrency = this.currency;
      this.previousReturnCurrency = this.currency;
    }

    this.previousDepartureDate = this.departureDate;
    this.previousReturnDate = this.returnDate;
    this.previousArrivalCode = this.arrival.code ?? '';
    this.previousDepartureCode = this.departure.code ?? '';
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

  private goToBookingPage(): void {
    this.router.navigate(['/booking']);
  }

  goToMainFlightFormPage(): void {
    this.router.navigate(['/']);
  }

  continueButtonHandler(): void {
    // мне кажется, эту логику надо перенести в Booking Process Page
    // this.tripData.addTripToStack();
    // send form to store bucket and:
    this.goToBookingPage();
  }
}
