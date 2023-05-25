import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MainFormComponent } from '../../components/main-form/main-form.component';
import { MainPageComponent } from './main-page.component';
import { MaterialMainPageModule } from '../../../core/modules/material/material-main-page.module';
import { DateRangeComponent } from '../../components/main-form/date-range/date-range.component';
import { DateComponent } from '../../components/main-form/date/date.component';

@NgModule({
  declarations: [MainFormComponent, MainPageComponent, DateRangeComponent, DateComponent],
  imports: [
    CommonModule,
    MaterialMainPageModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatMenuModule,
  ],
})
export class MainPageModule {}
