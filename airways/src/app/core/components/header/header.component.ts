import { Component, OnInit } from '@angular/core';
import { ModalWindowService } from 'src/app/auth/services/modal-window.service';
import { NavigationEnd, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showStepper = false;

  stepperIndex = 0;

  flights = new FormControl<boolean>(true, [Validators.requiredTrue]);

  passengers = new FormControl<boolean>(true, [Validators.requiredTrue]);

  headerData = new FormGroup({
    dateFormat: new FormControl('MM/DD/YYYY', [Validators.required]),
    currencyFormat: new FormControl('EUR', [Validators.required]),
  });

  constructor(public modalWindowServices: ModalWindowService, private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const { url } = event;
        if (url === '/select-flight') {
          this.stepperIndex = 0;
        }
        if (url === '/step2') {
          this.stepperIndex = 1;
        }
        if (url === '/step3') {
          this.stepperIndex = 2;
        }
        if (url !== '/') {
          this.showStepper = true;
        } else {
          this.showStepper = false;
        }
      }
    });
  }
}
