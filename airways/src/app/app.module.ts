import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TicketDateSliderModule } from './shared/ticket-date-slider/ticket-date-slider.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, TicketDateSliderModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
