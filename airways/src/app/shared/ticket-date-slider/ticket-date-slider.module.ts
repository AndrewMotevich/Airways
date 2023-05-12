import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TicketDateCardComponent } from './ticket-date-card/ticket-date-card.component';
import { TicketDateSliderComponent } from './ticket-date-slider.component';
import { DateFormatPipe } from '../../core/pipes/date-format.pipe';

@NgModule({
  declarations: [TicketDateCardComponent, TicketDateSliderComponent, DateFormatPipe],
  imports: [CommonModule, MatIconModule],
  exports: [TicketDateSliderComponent],
})
export class TicketDateSliderModule {}
