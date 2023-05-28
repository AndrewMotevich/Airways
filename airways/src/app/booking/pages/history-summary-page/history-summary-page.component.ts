/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IPassengerDetails } from '../../models/passenger.interface';
import { EPassenger } from '../../models/passengers-data.interface';
import { IFlightDetails } from '../../models/flight-details.interface';
import { HistoryDataService } from '../../services/history-data.service';

@Component({
  selector: 'app-history-summary-page',
  templateUrl: './history-summary-page.component.html',
  styleUrls: ['./history-summary-page.component.scss'],
})
export class HistorySummaryPageComponent implements OnInit {
  passengersInfo!: IPassengerDetails[];

  passengersNumber = { 'adult': 0, 'child': 0, 'infant': 0 };

  ticketPrice: number;

  ticketCurrency!: string;

  ticketFrom!: IFlightDetails;

  ticketTo!: IFlightDetails;

  subscription!: Subscription | null;

  isDisabledAddToCart: boolean = false;

  constructor(private historyData: HistoryDataService) {
    this.passengersInfo = (
      this.historyData.getHistoryItem().passengersData as { passengers: IPassengerDetails[] }
    ).passengers;
    this.ticketPrice = 167;
  }

  ngOnInit(): void {
    this.passengersInfo.forEach((person) => {
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
    // eslint-disable-next-line prefer-destructuring
    this.ticketFrom = this.historyData.getHistoryItem().ticketsData.data[0];
    // eslint-disable-next-line prefer-destructuring
    this.ticketTo = this.historyData.getHistoryItem().ticketsData.data[1];
    this.ticketCurrency = this.historyData.getHistoryItem().ticketsData.data[0].currency;
  }
}
