import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { PassengerFormComponent } from '../../components/passengers/passenger-form/passenger-form.component';
import { BookingFlightComponent } from './booking-flight.component';
import { PassengersComponent } from '../../components/passengers/passengers.component';
import { CheckinBagComponent } from '../../components/passengers/passenger-form/checkin-bag/checkin-bag.component';
import { ContactDetailsComponent } from '../../components/passengers/contact-details/contact-details.component';
import { DigitsOnlyDirective } from '../../directives/digits-only.directive';
import { BookingFlightRoutingModule } from './booking-flight-routing.module';

@NgModule({

  declarations: [BookingFlightComponent, PassengersComponent, PassengerFormComponent, CheckinBagComponent, ContactDetailsComponent, DigitsOnlyDirective],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatChipsModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDividerModule,
    MatSelectModule,
    BookingFlightRoutingModule
  ],
  exports: [
    BookingFlightComponent, PassengersComponent, PassengerFormComponent, CheckinBagComponent, ContactDetailsComponent
  ]
})
export class BookingFlightModule { }
