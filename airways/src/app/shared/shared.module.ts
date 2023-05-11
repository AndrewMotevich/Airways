import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { StepperComponent } from './components/stepper/stepper.component';

@NgModule({
  declarations: [
    StepperComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule
  ]
})
export class SharedModule { }
