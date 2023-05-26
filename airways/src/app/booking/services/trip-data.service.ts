import { Injectable } from '@angular/core';
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
    mainData: {},
    // data from selectFlight
    ticketsData: {},
    // data from passengers
    passengersData: {},
  };

  private tripStack?: TripDataType[];

  constructor(
    private mainData: FormDataService,
    private ticketsData: FlightsDataService,
    private passengersData: PassengersDataService,
    private history: HistoryApiService
  ) {}

  getTripData(): typeof this.trip {
    return this.trip;
  }

  addTripToStack(): void {
    this.trip.completed = true;
    this.tripStack?.push(this.trip);
  }

  deleteFromStack(...idArray: number[]): void {
    const deletedArray: TripDataType[] = [];
    this.tripStack?.filter((elem) => {
      let unEqual = true;
      idArray.forEach((id) => {
        if (elem.id === id) {
          unEqual = false;
          deletedArray.push(elem);
        }
      });
      return unEqual;
    });
    // save in history
    this.history.saveHistory(deletedArray);
  }

  addNewTrip(): void {
    this.trip = {
      id: Date.now(),
      completed: false,
      // data from main
      mainData: this.mainData.getMainFormData(),
      // data from selectFlight
      ticketsData: {},
      // data from passengers
      passengersData: this.passengersData,
    };
  }

  updateTrip(updatedTrip: TripDataType): void {
    this.trip = updatedTrip;
  }
}
