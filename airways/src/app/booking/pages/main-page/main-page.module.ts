import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainFormComponent } from '../../components/main-form/main-form.component';
import { MainPageComponent } from './main-page.component';
import { MaterialMainPageModule } from '../../../core/modules/material/material-main-page.module';

@NgModule({
  declarations: [MainFormComponent, MainPageComponent],
  imports: [CommonModule, MaterialMainPageModule, FormsModule, ReactiveFormsModule],
})
export class MainPageModule {}
