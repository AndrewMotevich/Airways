import { Component, Input } from '@angular/core';
import dayjs from 'dayjs';

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

  boundColor: string = 'rgb(255, 153, 0)';

  selectedDates: { date: string; cost: string | null }[] = [];
}
