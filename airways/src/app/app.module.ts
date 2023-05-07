import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { AirwaysModule } from './booking/airways.module';
import { MainPageModule } from './booking/pages/main-page/main-page.module';
import { SelectFlightModule } from './booking/pages/select-flight/select-flight.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MainPageModule,
    // AirwaysModule,
    SelectFlightModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
