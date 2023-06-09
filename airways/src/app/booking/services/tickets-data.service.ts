import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IFlightDetails } from '../models/flight-details.interface';

@Injectable({ providedIn: 'root' })
export class TicketsDataService {
  private tickets: IFlightDetails[] = [];

  private ticketsSubject: BehaviorSubject<IFlightDetails[]> = new BehaviorSubject<IFlightDetails[]>(
    []
  );

  private observableTickets$ = this.ticketsSubject.asObservable();

  getTickets(): IFlightDetails[] {
    return this.tickets;
  }

  setTickets(tickets: IFlightDetails[]): void {
    this.tickets = tickets;
    this.ticketsSubject.next(tickets);
  }

  updateTickets(ticket: IFlightDetails): void {
    const newState: IFlightDetails[] = [...this.tickets, ticket];
    this.tickets = newState;
    this.ticketsSubject.next(newState);
  }

  getObservableTickets(): Observable<IFlightDetails[]> {
    return this.observableTickets$;
  }

  deleteTickets(tickets: IFlightDetails[]): void {
    const redundantLinks = tickets.map((ticket) => ticket.link);
    const newState = this.tickets.filter((ticket) => !redundantLinks.includes(ticket.link));

    this.tickets = newState;
    this.ticketsSubject.next(newState);
  }

  checkTicketSelected(ticket: IFlightDetails): boolean {
    return this.tickets.some((t) => t.link === ticket.link);
  }
}
