import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CurrentDateStateEnum } from '../ticket-date-slider.component';

@Component({
  selector: 'app-ticket-date-card',
  templateUrl: './ticket-date-card.component.html',
  styleUrls: ['./ticket-date-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketDateCardComponent {
  @Input() card!: { date: string; cost: string | null };

  @Input() boundColor: string = 'transparent';

  @Input() index!: number;

  @Input() currentDateState!: CurrentDateStateEnum;
}
