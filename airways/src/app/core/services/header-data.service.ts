import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { THEME } from '../models/theme.interface';

@Injectable({
  providedIn: 'root',
})
export class HeaderDataService {
  private _theme: string = THEME.LIGHT;

  private _themeSubject: BehaviorSubject<string> = new BehaviorSubject<string>(this._theme);

  currentDataFormat = 'MM/DD/YYYY';

  currentCurrency = 'EUR';

  get currentTheme(): BehaviorSubject<string> {
    return this._themeSubject;
  }

  toggleTheme(): void {
    const currentTheme: string = this._theme === THEME.DARK ? THEME.LIGHT : THEME.DARK;
    this._theme = currentTheme;
    this._themeSubject.next(currentTheme);
  }

}
