import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { THEME } from '../models/theme.interface';
import { EDateFormat } from '../models/date-format.interface';

@Injectable({
  providedIn: 'root',
})
export class HeaderDataService {
  private theme: string = THEME.LIGHT;

  private themeSubject$: BehaviorSubject<string> = new BehaviorSubject<string>(this.theme);

  private dateFormatSubject$: BehaviorSubject<string> = new BehaviorSubject<string>(EDateFormat.MM_DD_YYYY);

  currentCurrency = 'EUR';

  get currentTheme(): BehaviorSubject<string> {
    return this.themeSubject$;
  }

  get currentDateFormat$(): BehaviorSubject<string> {
    return this.dateFormatSubject$;
  }

  toggleTheme(): void {
    const currentTheme: string = this.theme === THEME.DARK ? THEME.LIGHT : THEME.DARK;
    this.theme = currentTheme;
    this.themeSubject$.next(currentTheme);
  }

  setDateFormat(val: string): void {
    this.dateFormatSubject$.next(val);
  }

}
