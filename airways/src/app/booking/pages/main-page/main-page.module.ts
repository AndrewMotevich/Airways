import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MainPageComponent } from './main-page.component';
import { MaterialMainPageModule } from '../../../core/modules/material/material-main-page.module';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [MainPageComponent],
  imports: [
    CommonModule,
    MaterialMainPageModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    SharedModule,
  ],
})
export class MainPageModule {}
