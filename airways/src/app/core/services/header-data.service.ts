import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { THEME } from '../models/theme.interface';
import { EDateFormat } from '../models/date-format.interface';
import { ECurrency } from '../models/currency.interface';

@Injectable({
  providedIn: 'root',
})
export class HeaderDataService {
  private theme: string = THEME.LIGHT;

  private themeSubject$: BehaviorSubject<string> = new BehaviorSubject<string>(this.theme);

  private dateFormatSubject$: BehaviorSubject<string> = new BehaviorSubject<string>(
    EDateFormat.MM_DD_YYYY
  );

  private currentCurrencySubject$: BehaviorSubject<ECurrency> = new BehaviorSubject<ECurrency>(
    ECurrency.EUR
  );

  get currentTheme(): BehaviorSubject<string> {
    return this.themeSubject$;
  }

  get currentDateFormat$(): BehaviorSubject<string> {
    return this.dateFormatSubject$;
  }

  get currentCurrency$(): BehaviorSubject<ECurrency> {
    return this.currentCurrencySubject$;
  }

  toggleTheme(): void {
    const currentTheme: string = this.theme === THEME.DARK ? THEME.LIGHT : THEME.DARK;
    this.theme = currentTheme;
    this.themeSubject$.next(currentTheme);
  }

  setDateFormat(dFormat: string): void {
    this.dateFormatSubject$.next(dFormat);
  }

  setCurrency(currency: ECurrency): void {
    this.currentCurrencySubject$.next(currency);
  }
}
