import { Component, Input, OnInit } from '@angular/core';
import dayjs from 'dayjs';
import { IFlightDetails } from 'src/app/booking/models/flight-details.interface';
import { FormDataModel, PointModel } from 'src/app/booking/models/form-data.model';
import { IPassengerDetails } from 'src/app/booking/models/passenger.interface';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.scss'],
})
export class FlightCardComponent implements OnInit {
  @Input() passengers!: IPassengerDetails[];

  @Input() flight!: IFlightDetails;

  from!: PointModel | null;

  destination!: PointModel | null;

  departureDate!: string;

  ngOnInit(): void {
    this.departureDate = `${dayjs(this.flight.departure_at)
      .format('dddd, D MMMM, YYYY HH:mm')
      .toString()} — ${dayjs(this.flight.departure_at)
      .add(this.flight.duration_to, 'm')
      .format('HH:mm')
      .toString()}`;
  }
}
