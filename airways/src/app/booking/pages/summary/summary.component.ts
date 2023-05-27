import { Component } from '@angular/core';
import { PassengersService } from '../../services/passengers.service';
import { IPassengerDetails } from '../../models/passenger.interface';
import { FormDataService } from '../../services/form-data.service';
import { FormDataModel, PointModel } from '../../models/form-data.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {
  passengersInfo!: IPassengerDetails[];

  flightDetails!: FormDataModel<PointModel>;

  constructor(private passengersService: PassengersService, private dataService: FormDataService) {
    this.passengersInfo = this.passengersService.passengersInformation.passengers;
    this.flightDetails = this.dataService.getMainFormData();
  }

}
