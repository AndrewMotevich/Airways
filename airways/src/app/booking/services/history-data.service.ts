import { Injectable } from '@angular/core';
import { TripDataType } from '../models/trip-data-type';

@Injectable({
  providedIn: 'root',
})
export class HistoryDataService {
  private currentHistoryItem!: TripDataType;

  getHistoryItem(): TripDataType {
    return this.currentHistoryItem;
  }

  setHistoryItem(value: TripDataType): void {
    this.currentHistoryItem = value;
  }
}
