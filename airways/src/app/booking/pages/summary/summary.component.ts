import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPassengerDetails } from '../../models/passenger.interface';
import { FormDataService } from '../../services/form-data.service';
import { FormDataModel, PointModel } from '../../models/form-data.model';
import { PassengersDataService } from '../../services/passengers-data.service';
import { EPassenger } from '../../models/passengers-data.interface';
import { TripDataService } from '../../services/trip-data.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  passengersInfo!: IPassengerDetails[];

  flightDetails!: FormDataModel<PointModel>;

  adultTotal: number = 0;

  childTotal: number = 0;

  infantTotal: number = 0;

  ticketPrice: number;

  constructor(
    private passengersService: PassengersDataService,
    private dataService: FormDataService,
    private router: Router,
    private tripData: TripDataService
  ) {
    this.passengersInfo = this.passengersService.getPassengersData().passengers;
    this.flightDetails = this.dataService.getMainFormData();
    this.ticketPrice = 167;
  }

  ngOnInit(): void {
    this.passengersInfo.forEach(person => {
      if (person.category === EPassenger.ADULT) {
        this.adultTotal += 1;
        return;
      }

      if (person.category === EPassenger.CHILD) {
        this.childTotal += 1;
        return;
      }
      this.infantTotal += 1;
    })
  }

  onBuy(): void {
    this.router.navigateByUrl('/shopping-card');
  }

  addToCart(): void {
    this.tripData.addTripToStack();
  }
}
