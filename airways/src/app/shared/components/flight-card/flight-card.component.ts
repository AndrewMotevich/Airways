import { Component, Input, OnInit } from '@angular/core';
import dayjs from 'dayjs';
import { FormDataModel, PointModel } from 'src/app/booking/models/form-data.model';
import { IPassengerDetails } from 'src/app/booking/models/passenger.interface';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.scss']
})
export class FlightCardComponent implements OnInit {
  @Input() passengers!: IPassengerDetails[];

  @Input() flight!: FormDataModel<PointModel>;

  from!: PointModel | null;

  destination!: PointModel | null;

  departureDate!: string;

  ngOnInit(): void {
    console.log('flight:', this.flight);
    const { from, destination, dateStart, dateEnd } = this.flight;
    this.from = from;
    this.destination = destination;
    this.departureDate = dayjs(dateStart).format('dddd, D MMMM, YYYY HH:mm').toString();

  }
}
