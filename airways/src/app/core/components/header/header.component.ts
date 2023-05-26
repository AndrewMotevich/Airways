import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { BehaviorSubject, Subscription } from 'rxjs';
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
export class HeaderComponent implements OnInit, OnDestroy {
  currentUrl: string = '';

  currentCurrency$: BehaviorSubject<string>;

  currentDateFormat$: BehaviorSubject<string>;

  isDarkMode: boolean = false;

  isMainPage: boolean = true;

  subscriptions!: Subscription;

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
    this.currentDateFormat$ = this.headerDataService.currentDateFormat$;
  }

  ngOnInit(): void {
    const authApiServiceSubscribe = this.authApiService.refresh().subscribe();
    this.subscriptions?.add(authApiServiceSubscribe);

    const routerSubscribe = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const { url } = event;
        this.currentUrl = url;
        this.isMainPage = url === '/';
      }
    });
    this.subscriptions?.add(routerSubscribe);

    const headerDataServiceSubscribe = this.headerDataService.currentTheme.subscribe(theme => {
      this.isDarkMode = (theme === THEME.DARK)
    });
    this.subscriptions?.add(headerDataServiceSubscribe);
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
