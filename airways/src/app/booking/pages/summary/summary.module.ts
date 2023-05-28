import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SummaryComponent } from './summary.component';
import { SummaryRoutingModule } from './summary-routing.module';
import { PassengersInfoComponent } from '../../../shared/components/flight-card/passengers-info/passengers-info.component';
import { FlightCardComponent } from '../../../shared/components/flight-card/flight-card.component';
import { FlightFareComponent } from '../../../shared/components/flight-fare/flight-fare.component';
import { CustomPipesModule } from '../../pipe/custom-pipes.module';

@NgModule({
  declarations: [SummaryComponent, PassengersInfoComponent, FlightCardComponent, FlightFareComponent],
  imports: [
    CommonModule,
    SummaryRoutingModule,
    MatCardModule,
    MatButtonModule,
    CustomPipesModule
  ],
  exports: [SummaryComponent, PassengersInfoComponent]
})
export class SummaryModule { }
