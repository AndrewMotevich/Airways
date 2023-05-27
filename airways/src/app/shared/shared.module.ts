import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MainFormComponent } from './main-form/main-form.component';
import { FlightInfoMenuComponent } from './flight-info-menu/flight-info-menu.component';
import { StepperComponent } from './components/stepper/stepper.component';

@NgModule({
  declarations: [StepperComponent, FlightInfoMenuComponent, MainFormComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    StepperComponent,
    FlightInfoMenuComponent,
    MainFormComponent,
  ],
})
export class SharedModule {}
