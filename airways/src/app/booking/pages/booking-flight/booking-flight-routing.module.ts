import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingFlightComponent } from './booking-flight.component';

const routes: Routes = [{ path: '', component: BookingFlightComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingFlightRoutingModule {}
