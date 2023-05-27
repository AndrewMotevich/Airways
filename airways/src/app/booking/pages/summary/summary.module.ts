import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { SummaryComponent } from './summary.component';
import { SummaryRoutingModule } from './summary-routing.module';
import { PassengersInfoComponent } from '../../../shared/components/flight-card/passengers-info/passengers-info.component';
import { FlightCardComponent } from '../../../shared/components/flight-card/flight-card.component';

@NgModule({
  declarations: [SummaryComponent, PassengersInfoComponent, FlightCardComponent],
  imports: [
    CommonModule,
    SummaryRoutingModule,
    MatCardModule,
  ],
  exports: [SummaryComponent, PassengersInfoComponent]
})
export class SummaryModule { }
