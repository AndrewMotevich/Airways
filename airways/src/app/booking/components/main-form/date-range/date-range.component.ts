import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import dayjs from 'dayjs';
import { BehaviorSubject, Subscription } from 'rxjs';
import { HeaderDataService } from '../../../../core/services/header-data.service';
import { CustomFormat } from '../../../../shared/utils/date-format';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useClass: CustomFormat },
  ],
})
export class DateRangeComponent implements OnInit, OnDestroy {
  private subcription!: Subscription | null;

  formGroup!: FormGroup;

  dateFormat$!: BehaviorSubject<string>;

  minDate = dayjs().toDate();

  maxDate = dayjs().add(1, 'y').toDate();

  get dateEnd(): FormControl<string> {
    return this.formGroup.get('dateEnd') as FormControl;
  }

  constructor(private fg: FormGroupDirective, private headerDateService: HeaderDataService, @Inject(MAT_DATE_FORMATS) public config: any) { }

  ngOnInit(): void {
    this.formGroup = this.fg.control;

    this.dateFormat$ = this.headerDateService.currentDateFormat$;

    this.subcription = this.dateFormat$.subscribe((newDateFormat: string) => {
      this.config.currentDateFormat = newDateFormat;
      this.formatDates();
    });
  }

  formatDates(): void {
    const dateStart = this.formGroup.get('dateStart')?.value;
    const dateEnd = this.formGroup.get('dateEnd')?.value;

    this.formGroup.patchValue({
      dateStart, dateEnd
    })
  }

  ngOnDestroy(): void {
    if (this.subcription) {
      this.subcription.unsubscribe();
      this.subcription = null;
    }
  }
}
