import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StepperService {
  stepperStatus = {
    flight: { edit: false, completed: false, disabled: false },
    passengers: { edit: false, completed: false, disabled: false },
    summary: { edit: false, completed: false, disabled: false },
  };

  setStepOne(): void {
    this.stepperStatus.flight.edit = true;
    this.stepperStatus.passengers.disabled = true;
    this.stepperStatus.summary.disabled = true;
  }

  setStepTwo(): void {
    this.stepperStatus.flight.edit = false;
    this.stepperStatus.flight.completed = true;
    this.stepperStatus.passengers.edit = true;
    this.stepperStatus.passengers.disabled = false;
    this.stepperStatus.summary.disabled = true;
  }

  setStepThree(): void {
    this.stepperStatus.flight.completed = true;
    this.stepperStatus.passengers.edit = false;
    this.stepperStatus.passengers.completed = true;
    this.stepperStatus.summary.disabled = false;
    this.stepperStatus.summary.edit = true;
  }
}
