import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { SelectFlightRoutingModule } from './select-flight-routing.module';
import { TicketDateSliderModule } from '../../../shared/ticket-date-slider/ticket-date-slider.module';
import { DurationPipe } from '../../pipe/duration.pipe';
import { FlightDetailsComponent } from '../../components/flight-details/flight-details.component';
import { FormatPricePipe } from '../../pipe/format-price.pipe';
import { SelectFlightComponent } from './select-flight.component';
import { FlightDataEditFormComponent } from '../../../shared/flight-data-edit-form/flight-data-edit-form.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [
    SelectFlightComponent,
    FlightDetailsComponent,
    FlightDataEditFormComponent,
    DurationPipe,
    FormatPricePipe,
  ],
  imports: [
    CommonModule,
    SelectFlightRoutingModule,
    TicketDateSliderModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    SharedModule,
  ],
  exports: [SelectFlightComponent, FlightDetailsComponent, TicketDateSliderModule],
})
export class SelectFlightModule {}
