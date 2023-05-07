import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
// import { FlightInfoMenuComponent } from './flight-info-menu/flight-info-menu.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [MatButtonModule, MatIconModule],
})
export class SharedModule {}
