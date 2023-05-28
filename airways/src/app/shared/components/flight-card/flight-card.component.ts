import { Component, Input } from '@angular/core';
import { FormDataModel, PointModel } from 'src/app/booking/models/form-data.model';
import { IPassengerDetails } from 'src/app/booking/models/passenger.interface';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.scss']
})
export class FlightCardComponent {
  @Input() passengers!: IPassengerDetails[];

  @Input() flight!: FormDataModel<PointModel>;
}
