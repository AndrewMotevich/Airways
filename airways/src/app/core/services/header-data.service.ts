import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeaderDataService {
  currentDataFormat = 'MM/DD/YYYY';

  currentCurrency = 'EUR';
}
