import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightDetailsComponent } from './components/step1/flight-details/flight-details.component';
import { SelectFlightComponent } from './pages/select-flight/select-flight.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SelectFlightComponent, FlightDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [SelectFlightComponent, FlightDetailsComponent],
})
export class AirwaysModule { }
