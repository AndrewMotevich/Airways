import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPrice',
})
export class FormatPricePipe implements PipeTransform {
  transform(price: string | null): string {
    if (!price) return '';

    return price.endsWith('.00') ? price.split('.')[0] : price;
  }
}
