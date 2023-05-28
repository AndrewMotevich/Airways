import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import dayjs from 'dayjs';
import { BehaviorSubject, Subscription } from 'rxjs';
import { HeaderDataService } from 'src/app/core/services/header-data.service';
import { CustomFormat } from 'src/app/shared/utils/date-format';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useClass: CustomFormat },
  ],
})
export class DateComponent implements OnInit, OnDestroy {
  private subcription!: Subscription | null;

  formGroup!: FormGroup;

  dateFormat$: BehaviorSubject<string>;

  minDate = dayjs().toDate();

  maxDate = dayjs().add(1, 'y').toDate();

  constructor(private fg: FormGroupDirective, private headerDateService: HeaderDataService, @Inject(MAT_DATE_FORMATS) public config: any) {
    this.dateFormat$ = this.headerDateService.currentDateFormat$;
  }  

  ngOnInit(): void {
    this.formGroup = this.fg.control;

    this.subcription = this.dateFormat$.subscribe((newDateFormat: string) => {
      this.config.currentDateFormat = newDateFormat;
      this.formatDates();
    });
  }

  formatDates(): void {
    const date = this.formGroup.get('dateStart')?.value;

    this.formGroup.patchValue({
      dateStart: date, dateEnd: date
    })
  }

  ngOnDestroy(): void {
    if (this.subcription) {
      this.subcription.unsubscribe();
      this.subcription = null;
    }
  }
}
