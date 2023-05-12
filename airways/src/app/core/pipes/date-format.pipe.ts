import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dateFormat' })
export class DateFormatPipe implements PipeTransform {
  transform(value: string, format: 'DD MMM' | 'dddd'): string {
    if (format === 'DD MMM') {
      return value.split(' ').slice(0, 2).join(' ');
    }
    if (format === 'dddd') {
      return value.split(' ')[2];
    }
    return value;
  }
}
