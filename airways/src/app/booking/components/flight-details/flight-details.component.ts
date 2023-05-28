import { Component, DEFAULT_CURRENCY_CODE, Input } from '@angular/core';
import { IFlightDetails } from '../../models/flight-details.interface';
import { TicketsDataService } from '../../services/tickets-data.service';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss'],
  providers: [{ provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' }],
})
export class FlightDetailsComponent {
  @Input() flight!: IFlightDetails;

  isSelected: boolean = false;

  constructor(private ticketsDataService: TicketsDataService) {}

  selectTicketHandler(): void {
    // здесь можно посмотреть, какие данные из билета сохраняются:
    // console.log(this.flight);
    this.isSelected = true;
    this.ticketsDataService.updateTickets(this.flight);
    // здесь можно увидеть все сохраненные на данный момент билеты:
    // console.log(this.ticketsDataService.getTickets());
  }

  unselectTicket(): void {
    this.isSelected = false;
  }
}
