import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightDetailsComponent } from './components/step1/flight-details/flight-details.component';
import { SelectFlightComponent } from './pages/select-flight/select-flight.component';
import { SharedModule } from '../shared/shared.module';
import { DurationPipe } from './pipe/duration.pipe';
import { ColoredDirective } from './directives/colored.directive';
import { FormatPricePipe } from './pipe/format-price.pipe';

@NgModule({
  declarations: [SelectFlightComponent, FlightDetailsComponent, DurationPipe, ColoredDirective, FormatPricePipe],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [SelectFlightComponent, FlightDetailsComponent],
})
export class AirwaysModule { }
