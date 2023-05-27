import { Injectable } from '@angular/core';

type PassengerDataType = {
  adult: { name: string }[];
  child: { name: string }[];
  infant: { name: string }[];
};

@Injectable({
  providedIn: 'root',
})
export class PassengersDataService {
  private passengersData: PassengerDataType = {
    adult: [{ name: 'Harry' }],
    child: [{ name: 'Lily' }],
    infant: [{ name: 'James' }],
  };

  getPassengersData(): PassengerDataType {
    return this.passengersData;
  }

  setPassengersData(passengers: PassengerDataType): void {
    this.passengersData = passengers;
  }
}
