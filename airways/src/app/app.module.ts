import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageModule } from './booking/pages/main-page/main-page.module';
import { CoreModule } from './core/modules/core/core.module';
import { ShoppingCartPageModule } from './booking/pages/shopping-cart-page/shopping-cart-page.module';
import { AppDateAdapter } from './shared/utils/date-format-adapter';
import { FLIGHT_DATE_FORMATS } from './shared/constants';
import { TicketsDataService } from './booking/services/tickets-data.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MainPageModule,
    CoreModule,
    ShoppingCartPageModule,
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: AppDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: FLIGHT_DATE_FORMATS },
    TicketsDataService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
