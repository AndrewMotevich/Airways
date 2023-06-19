import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StepperService {
  init: boolean = false;

  canNavigate: boolean = false;

  stepperStatus = {
    flight: { edit: true, completed: false, disabled: false },
    passengers: { edit: false, completed: false, disabled: true },
    summary: { edit: false, completed: false, disabled: true },
  };

  editStepOne(): void {
    this.clearEditStepperStatus();
    this.stepperStatus.flight.edit = true;
    this.stepperStatus.flight.completed = false;
  }

  editStepTwo(): void {
    this.clearEditStepperStatus();
    this.stepperStatus.passengers.edit = true;
    this.stepperStatus.passengers.completed = false;
  }

  editStepThree(): void {
    this.clearEditStepperStatus();
    this.stepperStatus.summary.edit = true;
    this.stepperStatus.summary.completed = false;
  }

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

  clearStepperStatus(): void {
    this.stepperStatus = {
      flight: { edit: true, completed: false, disabled: false },
      passengers: { edit: false, completed: false, disabled: true },
      summary: { edit: false, completed: false, disabled: true },
    };
  }

  clearEditStepperStatus(): void {
    this.stepperStatus = {
      flight: { edit: false, completed: true, disabled: false },
      passengers: { edit: false, completed: true, disabled: false },
      summary: { edit: false, completed: true, disabled: false },
    };
  }
}
