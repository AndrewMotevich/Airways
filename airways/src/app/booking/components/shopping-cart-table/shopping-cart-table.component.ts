import { Component, OnInit } from '@angular/core';
import { FormDataModel } from 'src/app/booking/models/form-data.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TripDataService } from '../../services/trip-data.service';
import { TripDataType } from '../../models/trip-data-type';
import { HeaderDataService } from '../../../core/services/header-data.service';
import { PassengersDataService } from '../../services/passengers-data.service';
import { TPassengersInformation } from '../../models/passenger.interface';
import { FormDataService } from '../../services/form-data.service';

@Component({
  selector: 'app-shopping-cart-table',
  templateUrl: './shopping-cart-table.component.html',
  styleUrls: ['./shopping-cart-table.component.scss'],
})
export class ShoppingCartTableComponent implements OnInit {
  checkAllItems = { checkAll: true };

  currentTrip!: TripDataType;

  currency = 'EUR';

  currentMenuItem = 0;

  currentTripStack: TripDataType[] = [];

  currentTripItems: { id: number; checked: boolean }[] = [];

  constructor(
    private tripData: TripDataService,
    public headerService: HeaderDataService,
    private passengersService: PassengersDataService,
    private mainFormService: FormDataService,
    private snackBar: MatSnackBar
  ) {
    this.headerService.currentCurrency$.subscribe((res) => {
      this.currency = res;
    });
    this.tripData.getTripData.subscribe((res) => {
      this.currentTrip = res;
    });
  }

  openSnack() {
    this.snackBar.open('Successfully payment, item(s) added to history' || 'Error', 'Ok', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  ngOnInit(): void {
    this.tripData.getTripStack.subscribe((res) => {
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
    this.tripData.getTripStack.subscribe((res) => {
      this.currentTripStack = res;
      this.currentTripItems = this.currentTripStack.map((elem) => ({
        id: elem.id,
        checked: false,
      }));
    });
  }

  editItem(): void {
    this.tripData.editFromStack(this.currentMenuItem);
    this.passengersService.setPassengersData(
      this.currentTrip.passengersData as TPassengersInformation
    );
    this.mainFormService.setMainFormData(
      this.currentTrip.mainData as unknown as FormDataModel<string>
    );
  }

  saveItems(): void {
    const totalCheckedItems: number[] = [];
    this.currentTripItems.forEach((elem) => {
      if (elem.checked === true) {
        totalCheckedItems.push(elem.id);
      }
    });
    this.tripData.saveFromStack(...totalCheckedItems);
    this.tripData.getTripStack.subscribe((res) => {
      this.currentTripStack = res;
      this.currentTripItems = this.currentTripStack.map((elem) => ({
        id: elem.id,
        checked: false,
      }));
    });
    this.openSnack();
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
