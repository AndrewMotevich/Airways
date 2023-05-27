import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { StepperService } from '../../services/stepper.service';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit {
  stepperStatus = this.stepperService.stepperStatus;

  constructor(private stepperService: StepperService, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const { url } = event;
        if (url === '/select-flight') {
          this.stepperService.setStepOne();
        } else if (url === '/summary') {
          this.stepperService.setStepOne();
          this.stepperService.setStepTwo();
          this.stepperService.setStepThree();
        } else if (url === '/booking') {
          this.stepperService.setStepOne();
          this.stepperService.setStepTwo();
        }
      }
    });
  }

  ngOnInit(): void {
    this.stepperService.setStepOne();
  }
}
