import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SelectFlightRoutingModule } from './select-flight-routing.module';
import { FlightInfoMenuComponent } from '../../../shared/flight-info-menu/flight-info-menu.component';
import { TicketDateSliderModule } from '../../../shared/ticket-date-slider/ticket-date-slider.module';
import { DurationPipe } from '../../pipe/duration.pipe';
import { ColoredDirective } from '../../directives/colored.directive';
import { FlightDetailsComponent } from '../../components/flight-details/flight-details.component';
import { FormatPricePipe } from '../../pipe/format-price.pipe';
import { SelectFlightComponent } from './select-flight.component';

@NgModule({
  declarations: [
    SelectFlightComponent,
    FlightInfoMenuComponent,
    FlightDetailsComponent,
    DurationPipe,
    ColoredDirective,
    FormatPricePipe,
  ],
  imports: [
    CommonModule,
    SelectFlightRoutingModule,
    TicketDateSliderModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [SelectFlightComponent, FlightInfoMenuComponent, FlightDetailsComponent, TicketDateSliderModule],
})
export class SelectFlightModule {}
