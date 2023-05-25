import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import dayjs from 'dayjs';
import { HeaderDataService } from 'src/app/core/services/header-data.service';
import { CustomFormat } from './utils/date-format';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useClass: CustomFormat },
  ],
})
export class DateRangeComponent implements OnInit {
  formGroup!: FormGroup;

  dateFormat!: string;

  minDate = dayjs().toDate();

  maxDate = dayjs().add(1, 'y').toDate();

  constructor(private fg: FormGroupDirective, private headerDateService: HeaderDataService, @Inject(MAT_DATE_FORMATS) public config: any) { }

  ngOnInit(): void {
    this.formGroup = this.fg.control;

    this.headerDateService.currentDateFormat.subscribe((newDateFormat: string) => {
      this.dateFormat = newDateFormat;
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
}
