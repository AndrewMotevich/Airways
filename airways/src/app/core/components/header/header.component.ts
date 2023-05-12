import { Component, OnInit } from '@angular/core';
import { ModalWindowService } from 'src/app/auth/services/modal-window.service';
import { NavigationEnd, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { LoginService } from 'src/app/auth/services/login.service';
import { AuthApiService } from 'src/app/auth/services/auth-api.service';
import { HeaderDataService } from '../../services/header-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class HeaderComponent implements OnInit {
  currentUrl = '';

  headerData = new FormGroup({
    dateFormat: new FormControl<string>('MM/DD/YYYY', [Validators.required]),
    currencyFormat: new FormControl<string>('EUR', [Validators.required]),
  });

  constructor(
    public modalWindowServices: ModalWindowService,
    private router: Router,
    public headerDataService: HeaderDataService,
    public loginService: LoginService,
    public authApiService: AuthApiService
  ) {}

  ngOnInit(): void {
    this.authApiService.refresh().subscribe();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const { url } = event;
        this.currentUrl = url;
      }
    });
  }
}
