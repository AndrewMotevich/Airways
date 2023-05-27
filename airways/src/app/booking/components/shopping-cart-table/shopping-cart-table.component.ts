import { Component, OnInit } from '@angular/core';
import { TripDataService } from '../../services/trip-data.service';
import { TripDataType } from '../../models/trip-data-type';

@Component({
  selector: 'app-shopping-cart-table',
  templateUrl: './shopping-cart-table.component.html',
  styleUrls: ['./shopping-cart-table.component.scss'],
})
export class ShoppingCartTableComponent implements OnInit {
  checkAllItems = { checkAll: true };

  currentMenuItem = 0;

  currentTripData = this.tripData.getTripData();

  currentTripStack: TripDataType[] = [];

  currentTripItems: { id: number; checked: boolean }[] = [];

  constructor(private tripData: TripDataService) {}

  ngOnInit(): void {
    this.tripData.getTripStack().subscribe((res) => {
      this.currentTripStack = res;
      this.currentTripItems = this.currentTripStack.map((elem) => ({
        id: elem.id,
        checked: false,
      }));
    });
  }

  checkUncheckItems(id: number): void {
    this.currentTripItems.forEach((elem) => {
      // eslint-disable-next-line no-param-reassign
      if (elem.id === id) elem.checked = !elem.checked;
    });
  }

  checkUncheckAllItems(): void {
    if (this.checkAllItems.checkAll === true) {
      this.currentTripItems.forEach((elem) => {
        // eslint-disable-next-line no-param-reassign
        elem.checked = true;
      });
    }
    if (this.checkAllItems.checkAll === false) {
      this.currentTripItems.forEach((elem) => {
        // eslint-disable-next-line no-param-reassign
        elem.checked = false;
      });
    }
    this.checkAllItems.checkAll = !this.checkAllItems.checkAll;
  }

  getTotalChecked(): number {
    return this.currentTripItems.reduce((accum, elem) => {
      if (elem.checked) {
        return accum + 1;
      }
      return accum;
    }, 0);
  }

  deleteItem(): void {
    this.tripData.deleteFromStack(this.currentMenuItem);
    this.tripData.getTripStack().subscribe((res) => {
      this.currentTripStack = res;
      this.currentTripItems = this.currentTripStack.map((elem) => ({
        id: elem.id,
        checked: false,
      }));
    });
  }

  saveItems(): void {
    const totalCheckedItems: number[] = [];
    this.currentTripItems.forEach((elem) => {
      if (elem.checked === true) {
        totalCheckedItems.push(elem.id);
      }
    });
    this.tripData.saveFromStack(...totalCheckedItems);
    this.tripData.getTripStack().subscribe((res) => {
      this.currentTripStack = res;
      this.currentTripItems = this.currentTripStack.map((elem) => ({
        id: elem.id,
        checked: false,
      }));
    });
  }

  // eslint-disable-next-line class-methods-use-this
  elemSum(elem: TripDataType): number {
    return (
      (elem.ticketsData.data[0].price +
        (elem.ticketsData.data[1] !== undefined ? elem.ticketsData.data[1].price : 0)) *
      (elem.mainData.passengers !== null ? elem.mainData.passengers : 1)
    );
  }

  totalSum(): number {
    let totalSum = 0;
    this.currentTripStack?.forEach((elem) => {
      const elemSum =
        elem.ticketsData.data[0].price +
        (elem.ticketsData.data[1] !== undefined ? elem.ticketsData.data[1].price : 0);
      totalSum += elemSum * (elem.mainData.passengers !== null ? elem.mainData.passengers : 1);
    });
    return totalSum;
  }
}
