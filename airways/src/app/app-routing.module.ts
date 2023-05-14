import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectFlightComponent } from './booking/pages/select-flight/select-flight.component';
import { MainPageComponent } from './booking/pages/main-page/main-page.component';
import { Page404Component } from './booking/pages/page404/page404.component';
import { BookingFlightComponent } from './booking/pages/booking-flight/booking-flight.component';
import { IsLoginGuard } from './auth/guard/is-login.guard';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'select-flight', component: SelectFlightComponent },  
  { path: 'booking', component: BookingFlightComponent, canActivate: [IsLoginGuard] },
  { path: 'summary', component: Page404Component, canActivate: [IsLoginGuard] },
  { path: 'shopping-card', component: Page404Component, canActivate: [IsLoginGuard] },
  { path: 'user-account', component: Page404Component, canActivate: [IsLoginGuard] },
  { path: '404', component: Page404Component },
  {
    path: 'select-flight',
    loadChildren: () =>
      import('./booking/pages/select-flight/select-flight.module').then(
        (m) => m.SelectFlightModule
      ),
  },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
