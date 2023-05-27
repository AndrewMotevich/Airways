import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundedTrip',
})
export class RoundedTripPipe implements PipeTransform {
  transform(roundedTrip: string | null): string {
    if (roundedTrip === 'both') return 'Round Trip';
    if (roundedTrip === 'one') return 'One way';
    return 'unknown';
  }
}
