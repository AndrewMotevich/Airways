import { Component, Input, OnInit } from '@angular/core';
import dayjs from 'dayjs';

@Component({
  selector: 'app-ticket-date-slider',
  templateUrl: './ticket-date-slider.component.html',
  styleUrls: ['./ticket-date-slider.component.scss'],
})
export class TicketDateSliderComponent implements OnInit {
  @Input() selectedDate: string = '';

  @Input() ticketsData: { date: string; cost: string }[] | null = [];

  boundColor: string = 'rgb(255, 153, 0)';

  selectedDates: { date: string; cost: string | null }[] = [];

  // constructor() {}

  ngOnInit(): void {
    console.log(this.ticketsData);

    const dates = [
      dayjs(this.selectedDate).subtract(2, 'day'),
      dayjs(this.selectedDate).subtract(1, 'day'),
      dayjs(this.selectedDate),
      dayjs(this.selectedDate).add(1, 'day'),
      dayjs(this.selectedDate).add(2, 'day'),
    ];

    this.selectedDates = dates.map((date) => {
      const ticket = this.ticketsData?.find((t) => t.date === date.format('YYYY-MM-DD'));
      return { date: date.format('DD MMM dddd'), cost: ticket ? ticket.cost : null };
    });
    console.log('selectedDate: ', this.selectedDate);

    console.log(this.selectedDates);
  }
}
