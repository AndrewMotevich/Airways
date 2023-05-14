import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalWindowService } from '../../../auth/services/modal-window.service';
import { AuthApiService } from '../../../auth/services/auth-api.service';
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
  currentUrl: string = '';

  headerData = new FormGroup({
    dateFormat: new FormControl<string>('', [Validators.required]),
    currencyFormat: new FormControl<string>('', [Validators.required]),
  });

  constructor(
    public modalWindowServices: ModalWindowService,
    private router: Router,
    public headerDataService: HeaderDataService,
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
