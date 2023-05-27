import { Injectable } from '@angular/core';
import { TPassengersInformation } from '../models/passenger.interface';

@Injectable({
  providedIn: 'root',
})
export class PassengersDataService {
  private passengersData: TPassengersInformation = {
    passengers: [],
    phoneCode: 'CY',
    phone: '',
    email: ''
  }

  getPassengersData(): TPassengersInformation {
    return this.passengersData;
  }

  setPassengersData(passengers: TPassengersInformation): void {
    this.passengersData = passengers;
  }
}
