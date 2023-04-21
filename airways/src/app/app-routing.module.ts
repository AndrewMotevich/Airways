import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectFlightComponent } from './airways/pages/select-flight/select-flight.component';

const routes: Routes = [
  { path: 'select-flight', component: SelectFlightComponent },
  { path: '**', component: SelectFlightComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
