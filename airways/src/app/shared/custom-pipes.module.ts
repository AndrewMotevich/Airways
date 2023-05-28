import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomCurrencyPipe } from '../booking/pipe/custom-currency.pipe';

@NgModule({
  declarations: [CustomCurrencyPipe],
  imports: [CommonModule],
  exports: [CustomCurrencyPipe]
})
export class CustomPipesModule { }
