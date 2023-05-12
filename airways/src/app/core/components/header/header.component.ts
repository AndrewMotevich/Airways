import { Component, OnInit } from '@angular/core';
import { ModalWindowService } from 'src/app/auth/services/modal-window.service';
import { NavigationEnd, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { LoginService } from 'src/app/auth/services/login.service';
import { AuthApiService } from 'src/app/auth/services/auth-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    dateFormat: new FormControl<string>('', [Validators.required]),
    currencyFormat: new FormControl<string>('', [Validators.required]),
  });

  constructor(
    public modalWindowServices: ModalWindowService,
    private router: Router,
    public headerDataService: HeaderDataService,
    public loginService: LoginService,
    public authApiService: AuthApiService,
    private snackBar: MatSnackBar
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

  logOut(): void {
    this.authApiService.logout().subscribe({
      error: () => {
        this.snackBar.open('Error', 'Ok', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
      complete: () => {
        this.snackBar.open('You are logged out', 'Ok', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.router.navigate(['/']);
      },
    });
  }
}
