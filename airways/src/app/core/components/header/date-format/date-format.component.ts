import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { HeaderDataService } from 'src/app/core/services/header-data.service';
import { DATE_FORMATS } from 'src/app/shared/constants';

@Component({
  selector: 'app-date-format',
  templateUrl: './date-format.component.html',
  styleUrls: ['./date-format.component.scss']
})
export class DateFormatComponent implements OnInit, OnDestroy {
  form!: FormGroup;

  dateFormat!: string;

  formatsArray = DATE_FORMATS;

  constructor(private rootFormGroup: FormGroupDirective, private headerDataService: HeaderDataService) { }

  ngOnInit(): void {
    this.form = this.rootFormGroup.control;
    this.headerDataService.currentDateFormat.subscribe((val) => (this.dateFormat = val));
  }

  changeDateFormat(event: MatSelectChange): void {
    this.headerDataService.setDateFormat(event.value);
  }

  ngOnDestroy(): void {
    this.headerDataService.currentDateFormat.unsubscribe();
  }
}
