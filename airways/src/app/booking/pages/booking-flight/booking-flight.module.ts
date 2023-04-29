import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { PassengerFormComponent } from '../../components/passenger-form/passenger-form.component';
import { BookingFlightComponent } from './booking-flight.component';

@NgModule({
  declarations: [BookingFlightComponent, PassengerFormComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatChipsModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  exports: [
    BookingFlightComponent, PassengerFormComponent
  ]
})
export class BookingFlightModule { }
