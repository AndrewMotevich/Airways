import { Injectable } from '@angular/core';
import { IFlightDetails } from '../models/flight-details.interface';

@Injectable()
export class TicketsDataService {
  private tickets: IFlightDetails[] = [];

  getTickets(): IFlightDetails[] {
    return this.tickets;
  }

  setTickets(ticket: IFlightDetails): void {
    this.tickets = [ticket];
  }

  updateTickets(ticket: IFlightDetails): void {
    const newState: IFlightDetails[] = [...this.tickets, ticket];
    this.tickets = newState;
  }
}
