import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { LoginModule } from '../../../auth/modules/login.module';
import { DateFormatComponent } from '../../components/header/date-format/date-format.component';
import { CurrencyComponent } from '../../components/header/currency/currency.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, DateFormatComponent, CurrencyComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    MatMenuModule,
    MatSnackBarModule,
    MatBadgeModule,
    FormsModule,
    ReactiveFormsModule,
    LoginModule,
    RouterModule,
    SharedModule,
  ],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}
