import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TicketDateCardComponent } from './ticket-date-card/ticket-date-card.component';
import { TicketDateSliderComponent } from './ticket-date-slider.component';
import { DateFormatPipe } from '../../core/pipes/date-format.pipe';
import { ColoredDirective } from '../../booking/directives/colored.directive';
import { CustomPipesModule } from '../custom-pipes.module';

@NgModule({
  declarations: [
    TicketDateCardComponent,
    TicketDateSliderComponent,
    DateFormatPipe,
    ColoredDirective,
  ],
  imports: [CommonModule, MatIconModule, CustomPipesModule],
  exports: [TicketDateSliderComponent, ColoredDirective],
})
export class TicketDateSliderModule {}
