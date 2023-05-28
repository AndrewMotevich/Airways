import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IPassengerDetails } from '../../models/passenger.interface';
import { FormDataService } from '../../services/form-data.service';
import { FormDataModel, PointModel } from '../../models/form-data.model';
import { PassengersDataService } from '../../services/passengers-data.service';
import { EPassenger } from '../../models/passengers-data.interface';
import { TripDataService } from '../../services/trip-data.service';
import { TicketsDataService } from '../../services/tickets-data.service';
import { IFlightDetails } from '../../models/flight-details.interface';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit, OnDestroy {
  passengersInfo!: IPassengerDetails[];

  flightDetails!: FormDataModel<PointModel>;

  passengersNumber = { 'adult': 0, 'child': 0, 'infant': 0 };

  ticketPrice: number;

  ticketsData!: IFlightDetails[];

  subscription!: Subscription | null;

  isDisabledAddToCart: boolean = false;

  constructor(
    private passengersService: PassengersDataService,
    private dataService: FormDataService,
    private router: Router,
    private tripData: TripDataService,
    private ticketDataService: TicketsDataService,
  ) {
    this.passengersInfo = this.passengersService.getPassengersData().passengers;
    this.flightDetails = this.dataService.getMainFormData();   

    this.ticketPrice = 167;
  }

  ngOnInit(): void {
    this.passengersInfo.forEach(person => {
      if (person.category === EPassenger.ADULT) {
        this.passengersNumber.adult += 1;
        return;
      }

      if (person.category === EPassenger.CHILD) {
        this.passengersNumber.child += 1;
        return;
      }
      this.passengersNumber.infant += 1;
    });

    this.subscription = this.ticketDataService.getObservableTickets().subscribe((tickets: IFlightDetails[]) => {
      console.log('summary tickets: ', tickets);

      this.ticketsData = tickets;
    });
  }

  onBuy(): void {
    if (!this.isDisabledAddToCart) {
      this.addToCart();
    }

    this.router.navigateByUrl('/shopping-card');
  }

  addToCart(): void {
    this.tripData.addTripToStack();
    this.isDisabledAddToCart = true;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}
