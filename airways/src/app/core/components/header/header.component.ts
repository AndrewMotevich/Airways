import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { BehaviorSubject } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';
import { CURRENCY } from '../../../shared/constants';
import { ModalWindowService } from '../../../auth/services/modal-window.service';
import { AuthApiService } from '../../../auth/services/auth-api.service';
import { HeaderDataService } from '../../services/header-data.service';
import { THEME } from '../../models/theme.interface';

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

  currentCurrency$: BehaviorSubject<string>;

  currencyArray = CURRENCY;

  headerData = new FormGroup({
    dateFormat: new FormControl<string>('MM/DD/YYYY', [Validators.required]),
    currencyFormat: new FormControl<string>('EUR', [Validators.required]),
  });

  isDarkMode: boolean = false;

  constructor(
    public modalWindowServices: ModalWindowService,
    private router: Router,
    public headerDataService: HeaderDataService,
    public authApiService: AuthApiService,
    private snackBar: MatSnackBar,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon('icon-logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/img/logo.svg'));

    this.currentCurrency$ = this.headerDataService.currentCurrency$;
  }

  ngOnInit(): void {
    this.authApiService.refresh().subscribe();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const { url } = event;
        this.currentUrl = url;
      }
    });

    this.headerDataService.currentTheme.subscribe(theme => {
      this.isDarkMode = (theme === THEME.DARK)
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

  changeTheme(): void {
    this.headerDataService.toggleTheme();
  }

  changeCurrencyFormat(event: MatSelectChange): void {
    this.headerDataService.setCurrency(event.value);
  }
}
