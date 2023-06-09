import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import dayjs from 'dayjs';
import { ECurrency } from '../../core/models/currency.interface';

export const enum CurrentDateStateEnum {
  PAST = 'past',
  CURRENT = 'current',
  FUTURE = 'future',
}
@Component({
  selector: 'app-ticket-date-slider',
  templateUrl: './ticket-date-slider.component.html',
  styleUrls: ['./ticket-date-slider.component.scss'],
})
export class TicketDateSliderComponent implements OnChanges {
  @Input() selectedDate!: string;

  @Input() set ticketsData(value: { date: string; cost: string; seats: number }[] | null) {
    const dates = [
      dayjs(this.selectedDate).subtract(2, 'day'),
      dayjs(this.selectedDate).subtract(1, 'day'),
      dayjs(this.selectedDate),
      dayjs(this.selectedDate).add(1, 'day'),
      dayjs(this.selectedDate).add(2, 'day'),
    ];
    this.selectedDates = dates.map((date) => {
      const ticket = value?.find((t) => t.date === date.format('YYYY-MM-DD'));
      return {
        date: date.format('DD MMM dddd'),
        cost: ticket ? ticket.cost : null,
        seats: ticket?.seats ?? 0,
      };
    });

    this.dateStates = dates.map((date) => {
      if (
        dayjs().isBefore(dayjs(date).toDate(), 'day') ||
        dayjs().isSame(dayjs(date, 'day').toDate())
      ) {
        return CurrentDateStateEnum.FUTURE;
      }

      if (
        dayjs().isAfter(dayjs(date).toDate(), 'day') &&
        !dayjs().isSame(dayjs(date, 'day').toDate())
      ) {
        return CurrentDateStateEnum.PAST;
      }
      return CurrentDateStateEnum.FUTURE;
    });
  }

  @Input() currency!: ECurrency;

  @Output() nextDateButtonClick: EventEmitter<void> = new EventEmitter<void>();

  @Output() prevDateButtonClick: EventEmitter<void> = new EventEmitter<void>();

  onNextDateButtonClick(): void {
    this.nextDateButtonClick.emit();
  }

  isDisablePrevBtn: boolean = false;

  selectedDates: { date: string; cost: string | null; seats: number }[] = [];

  dateStates: CurrentDateStateEnum[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedDate'] && this.selectedDate) {
      this.isDisablePrevBtn = !dayjs().isBefore(dayjs(this.selectedDate).toDate());
    }
  }

  onPrevDateButtonClick(): void {
    if (!this.isDisablePrevBtn) {
      this.prevDateButtonClick.emit();
    }
  }
}
