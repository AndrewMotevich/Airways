/* eslint-disable class-methods-use-this */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import dayjs from 'dayjs';
import { FormDataService } from '../../booking/services/form-data.service';

@Component({
  selector: 'app-ticket-date-slider',
  templateUrl: './ticket-date-slider.component.html',
  styleUrls: ['./ticket-date-slider.component.scss'],
})
export class TicketDateSliderComponent {
  @Input() selectedDate: string = '';

  @Input() set ticketsData(value: { date: string; cost: string }[] | null) {
    const dates = [
      dayjs(this.selectedDate).subtract(2, 'day'),
      dayjs(this.selectedDate).subtract(1, 'day'),
      dayjs(this.selectedDate),
      dayjs(this.selectedDate).add(1, 'day'),
      dayjs(this.selectedDate).add(2, 'day'),
    ];
    this.selectedDates = dates.map((date) => {
      const ticket = value?.find((t) => t.date === date.format('YYYY-MM-DD'));
      return { date: date.format('DD MMM dddd'), cost: ticket ? ticket.cost : null };
    });
  }

  constructor(private formDataService: FormDataService) {}

  @Output() nextDateButtonClick: EventEmitter<void> = new EventEmitter<void>();
  
  @Output() prevDateButtonClick: EventEmitter<void> = new EventEmitter<void>();

  onNextDateButtonClick(): void {
    this.nextDateButtonClick.emit();
  }

  onPrevDateButtonClick(): void {
    this.prevDateButtonClick.emit();
  }

  boundColor: string = 'rgb(255, 153, 0)';

  selectedDates: { date: string; cost: string | null }[] = [];
}
