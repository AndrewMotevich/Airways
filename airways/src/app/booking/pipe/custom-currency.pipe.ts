import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency',
})
export class CustomCurrencyPipe implements PipeTransform {
  transform(value: number | string | null, currency: string): string {
    if (value === null) return '';
    let symbol: string;

    switch (currency) {
      case 'EUR':
        symbol = '€';
        break;
      case 'RUB':
        symbol = '₽';
        break;
      case 'USA':
        symbol = '$';
        break;
      case 'PLN':
        symbol = 'zł';
        break;
      default:
        symbol = '';
        break;
    }

    return symbol + value;
  }
}
