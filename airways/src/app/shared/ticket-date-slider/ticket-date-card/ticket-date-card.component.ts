import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CurrentDateStateEnum } from '../ticket-date-slider.component';
import { ECurrency } from '../../../core/models/currency.interface';

@Component({
  selector: 'app-ticket-date-card',
  templateUrl: './ticket-date-card.component.html',
  styleUrls: ['./ticket-date-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketDateCardComponent implements OnInit {
  // eslint-disable-next-line class-methods-use-this
  private getColor = (seats: number): string => {
    switch (true) {
      case seats >= 100:
        return 'plenty';

      case seats > 20 && seats < 100:
        return 'enough';

      case seats <= 20:
        return 'few';

      default:
        return '';
    }
  };

  @Input() card!: { date: string; cost: string | null; seats: number };

  @Input() index!: number;

  @Input() currentDateState!: CurrentDateStateEnum;

  @Input() currency!: ECurrency;

  boundColorClass: string = 'transparent';

  ngOnInit(): void {
    this.boundColorClass = this.getColor(this.card.seats);
  }
}
