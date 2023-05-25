import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { LoginModule } from '../../../auth/modules/login.module';
import { DateFormatComponent } from '../../components/header/date-format/date-format.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, DateFormatComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    MatMenuModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    LoginModule,
    RouterModule,
    SharedModule,
  ],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}
