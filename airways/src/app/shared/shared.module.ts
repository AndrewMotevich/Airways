import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { StepperComponent } from './components/stepper/stepper.component';

@NgModule({
  declarations: [StepperComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatInputModule,
    RouterModule,
  ],
  exports: [MatButtonModule, MatIconModule, StepperComponent],
})
export class SharedModule {}
