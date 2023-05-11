import { Injectable } from '@angular/core';

type StepsNamesType = 'selectFlight' | 'bookingProcess' | 'reviewPayment';
type StepsStatusType = {
  selectFlight: { completed: boolean; editable: boolean };
  bookingProcess: { completed: boolean; editable: boolean };
  reviewPayment: { completed: boolean; editable: boolean };
};

@Injectable({
  providedIn: 'root',
})
export class StepperService {
  currentStep?: number;

  stepsStatus: StepsStatusType = {
    selectFlight: { completed: false, editable: false },
    bookingProcess: { completed: false, editable: false },
    reviewPayment: { completed: false, editable: false },
  };

  resetSteps(array: Array<StepsNamesType>): void {
    array.forEach((elem) => {
      this.stepsStatus[elem].completed = false;
      this.stepsStatus[elem].editable = false;
    });
  }
}
