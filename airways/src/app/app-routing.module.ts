import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './booking/pages/main-page/main-page.component';
import { Page404Component } from './booking/pages/page404/page404.component';
import { IsLoginGuard } from './auth/guard/is-login.guard';
import { ShoppingCartPageComponent } from './booking/pages/shopping-cart-page/shopping-cart-page.component';
import { UserAccountPageComponent } from './booking/pages/user-account-page/user-account-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent, pathMatch: 'full' },
  {
    path: 'select-flight',
    loadChildren: () =>
      import('./booking/pages/select-flight/select-flight.module').then(
        (m) => m.SelectFlightModule
      ),
  },
  {
    path: 'booking',
    loadChildren: () =>
      import('./booking/pages/booking-flight/booking-flight.module').then(
        (m) => m.BookingFlightModule
      ),
    //canActivate: [IsLoginGuard]
  },
  {
    path: 'summary',
    loadChildren: () => import('./booking/pages/summary/summary.module').then((m) => m.SummaryModule),
    //canActivate: [IsLoginGuard] 
  },  
  {
    path: 'shopping-card',
    component: ShoppingCartPageComponent,
    canActivate: [IsLoginGuard],
  },
  {
    path: 'user-account',
    component: UserAccountPageComponent,
    // canActivate: [IsLoginGuard]
  },
  { path: '404', component: Page404Component },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
