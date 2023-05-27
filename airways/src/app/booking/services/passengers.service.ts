import { Injectable } from '@angular/core';
import { TPassengersInformation } from '../models/passenger.interface';

@Injectable({
  providedIn: 'root'
})
export class PassengersService {
  private pi!: TPassengersInformation;

  get passengersInformation(): TPassengersInformation {
    return this.pi;
  }

  setPassengersInformation(passengersInfo: TPassengersInformation): void {
    this.pi = passengersInfo;
  }

}
