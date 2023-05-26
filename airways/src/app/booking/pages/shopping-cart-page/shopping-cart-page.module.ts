import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { ShoppingCartPageComponent } from './shopping-cart-page.component';
import { ShoppingCartTableComponent } from '../../components/shopping-cart-table/shopping-cart-table.component';

@NgModule({
  declarations: [ShoppingCartPageComponent, ShoppingCartTableComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
    MatInputModule,
  ],
})
export class ShoppingCartPageModule {}
