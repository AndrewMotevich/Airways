import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PassengersDataService {
  private passengersData = {
    adult: [{ name: 'Harry' }],
    child: [{ name: 'Lily' }],
    infant: [{ name: 'James' }],
  };

  getPassengersData(): typeof this.passengersData {
    return this.passengersData;
  }

  setPassengersData(passengers: typeof this.passengersData): void {
    this.passengersData = passengers;
  }
}
