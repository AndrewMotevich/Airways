import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ECurrency } from 'src/app/core/models/currency.interface';
import { FormDataService } from './form-data.service';
import { PassengersDataService } from './passengers-data.service';
import { TripDataType } from '../models/trip-data-type';
import { HistoryApiService } from './history-api.service';
import { TicketsDataService } from './tickets-data.service';

@Injectable({
  providedIn: 'root',
})
export class TripDataService {
  private trip: TripDataType = {
    id: 0,
    completed: false,
    // data from main
    mainData: {
      roundedTrip: 'both',
      from: null,
      destination: null,
      dateStart: null,
      dateEnd: null,
      passengers: 1,
      adult: 1,
      child: 0,
      infant: 0,
    },
    // data from selectFlight
    ticketsData: {
      success: false,
      data: [],
      currency: ECurrency.EUR,
    },
    // data from passengers
    passengersData: {},
  };

  private tripStack: TripDataType[] = [];

  constructor(
    private ticketsData: TicketsDataService,
    private mainData: FormDataService,
    private passengersData: PassengersDataService,
    private history: HistoryApiService
  ) {
    this.trip = {
      ...this.trip,
      passengersData: this.passengersData.getPassengersData(),
    };
  }

  getTripData = new BehaviorSubject(this.trip);

  getTripStack = new BehaviorSubject(this.tripStack);

  addTripToStack(): void {
    console.log('trip:', this.trip);
    this.ticketsData.getObservableTickets().subscribe((res) => console.log(res));
    this.trip.completed = true;
    this.updateTrip(this.trip);
    this.tripStack?.push(this.trip);
    this.getTripStack.next(this.tripStack);
  }

  deleteFromStack(id: number): void {
    this.tripStack = this.tripStack.filter((elem) => {
      if (elem.id === id) return false;
      return true;
    });
    this.getTripStack.next(this.tripStack);
  }

  saveFromStack(...idArray: number[]): void {
    const deletedArray: TripDataType[] = [];
    const tempArray = this.tripStack.filter((elem) => {
      let unEqual = true;
      idArray.forEach((id) => {
        if (elem.id === id) {
          unEqual = false;
          deletedArray.push(elem);
        }
      });
      return unEqual;
    });
    this.tripStack = tempArray;
    this.getTripStack.next(this.tripStack);
    // save in history
    // this.history.saveHistory(deletedArray);
  }

  addNewTrip(): void {
    this.trip = {
      id: Date.now(),
      completed: false,
      // data from main
      mainData: this.mainData.getMainFormData(),
      // data from selectFlight !!!(now mocked)!!!
      ticketsData: {
        success: true,
        currency: ECurrency.EUR,
        data: [
          {
            origin: 'none',
            destination: 'none',
            origin_airport: 'none',
            destination_airport: 'none',
            price: 0,
            airline: 'none',
            flight_number: 'none',
            departure_at: 'none',
            return_at: 'none',
            duration: 0,
            transfers: 0,
            return_transfers: 0,
            duration_to: 0,
            duration_back: 0,
            link: 'none',
            currency: 'ANY',
          },
        ],
      },
      passengersData: this.passengersData.getPassengersData(),
    };
  }

  updateTrip(updatedTrip: TripDataType): void {
    this.trip = updatedTrip;
    this.getTripData.next(this.trip);
  }
}
