import { Component, Input } from '@angular/core';
import { IPassengerDetails } from 'src/app/booking/models/passenger.interface';

@Component({
  selector: 'app-passengers-info',
  templateUrl: './passengers-info.component.html',
  styleUrls: ['./passengers-info.component.scss']
})
export class PassengersInfoComponent {
  @Input() passengers!: IPassengerDetails[];
}
