import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ECurrency } from 'src/app/core/models/currency.interface';
import { FormDataService } from './form-data.service';
import { FlightsDataService } from './flightsData.service';
import { PassengersDataService } from './passengers-data.service';
import { TripDataType } from '../models/trip-data-type';
import { HistoryApiService } from './history-api.service';

@Injectable({
  providedIn: 'root',
})
export class TripDataService {
  private trip: TripDataType = {
    id: 0,
    completed: false,
    // data from main
    mainData: {
      roundedTrip: null,
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
    private mainData: FormDataService,
    private ticketsData: FlightsDataService,
    private passengersData: PassengersDataService,
    private history: HistoryApiService
  ) {
    this.trip = {
      ...this.trip,
      passengersData: this.passengersData.getPassengersData()
    }
  }

  getTripData = new BehaviorSubject(this.trip);

  getTripStack = new BehaviorSubject(this.tripStack);

  addTripToStack(): void {
    this.trip.completed = true;
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
            origin: 'string',
            destination: 'string',
            origin_airport: 'string',
            destination_airport: 'string',
            price: 100,
            airline: 'string',
            flight_number: 'FR 1925',
            departure_at: 'string',
            return_at: 'string',
            duration: 0,
            transfers: 0,
            return_transfers: 0,
            duration_to: 0,
            duration_back: 0,
            link: 'string',
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
