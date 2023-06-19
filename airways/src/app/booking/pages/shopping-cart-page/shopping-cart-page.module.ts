import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { CustomPipesModule } from 'src/app/shared/custom-pipes.module';
import { ShoppingCartPageComponent } from './shopping-cart-page.component';
import { ShoppingCartTableComponent } from '../../components/shopping-cart-table/shopping-cart-table.component';
import { RoundedTripPipe } from '../../pipe/rounded-trip.pipe';
import { UserAccountPageComponent } from '../user-account-page/user-account-page.component';
import { UserAccountTableComponent } from '../../components/user-account-table/user-account-table.component';

@NgModule({
  declarations: [
    ShoppingCartPageComponent,
    ShoppingCartTableComponent,
    UserAccountPageComponent,
    UserAccountTableComponent,
    RoundedTripPipe,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatMenuModule,
    MatInputModule,
    MatSnackBarModule,
    RouterModule,
    CustomPipesModule,
  ],
})
export class ShoppingCartPageModule {}
