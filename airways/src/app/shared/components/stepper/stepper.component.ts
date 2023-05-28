import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TripDataService } from 'src/app/booking/services/trip-data.service';
import { StepperService } from '../../services/stepper.service';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit {
  constructor(
    public stepperService: StepperService,
    private router: Router,
    private tripData: TripDataService
  ) {
    this.router.events.subscribe((event) => {
      if ((event as NavigationEnd).url !== undefined) {
        const { url } = event as NavigationEnd;
        if (!this.stepperService.canNavigate) {
          if (url === '/select-flight') {
            this.stepperService.clearStepperStatus();
            this.stepperService.setStepOne();
          } else if (url === '/booking') {
            this.stepperService.clearStepperStatus();
            this.stepperService.setStepOne();
            this.stepperService.setStepTwo();
          } else if (url === '/summary') {
            this.stepperService.clearStepperStatus();
            this.stepperService.setStepOne();
            this.stepperService.setStepTwo();
            this.stepperService.setStepThree();
          }
        }
        if (this.stepperService.canNavigate) {
          if (url === '/select-flight') {
            this.stepperService.editStepOne();
          } else if (url === '/booking') {
            this.stepperService.editStepTwo();
          } else if (url === '/summary') {
            this.stepperService.editStepThree();
          }
        }
      }
    });
  }

  ngOnInit(): void {
    this.tripData.getTripData.subscribe((trip) => {
      this.stepperService.canNavigate = trip.completed;
    });
    if (this.stepperService.init === false) {
      switch (this.router.url) {
        case '/select-flight':
          this.stepperService.init = true;
          this.router.navigate(['/']);
          break;
        case '/booking':
          this.stepperService.init = true;
          this.router.navigate(['/']);
          break;
        case '/summary':
          this.stepperService.init = true;
          this.router.navigate(['/']);
          break;
        default:
          break;
      }
    }
  }
}
