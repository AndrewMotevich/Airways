import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform(timeInMinuts: number): string {
    const days = Math.trunc(timeInMinuts / (60 * 24));
    const hours = Math.trunc((timeInMinuts - days * 24 * 60) / 60);
    const minuts = timeInMinuts - hours * 60 - days * 24 * 60;
    return `${days}d ${hours}h ${minuts}m`;
  }
}
