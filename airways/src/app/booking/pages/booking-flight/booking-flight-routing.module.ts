import { NgModule } from '@angular/core';
import { BookingFlightComponent } from './booking-flight.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: BookingFlightComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingFlightRoutingModule { }
