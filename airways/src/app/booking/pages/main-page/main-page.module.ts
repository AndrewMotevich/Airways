import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/modules/core/core.module';
import { MainFormComponent } from '../../components/main-form/main-form.component';
import { MainPageComponent } from './main-page.component';
import { Page404Component } from '../page404/page404.component';
import { MaterialMainPageModule } from '../../../core/modules/material/material-main-page.module';

@NgModule({
  declarations: [MainFormComponent, MainPageComponent, Page404Component],
  imports: [CommonModule, MaterialMainPageModule, FormsModule, ReactiveFormsModule, CoreModule],
})
export class MainPageModule {}
