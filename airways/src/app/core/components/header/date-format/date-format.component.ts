import { Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { BehaviorSubject } from 'rxjs';
import { HeaderDataService } from 'src/app/core/services/header-data.service';
import { DATE_FORMATS } from 'src/app/shared/constants';

@Component({
  selector: 'app-date-format',
  templateUrl: './date-format.component.html',
  styleUrls: ['./date-format.component.scss']
})
export class DateFormatComponent implements OnInit {
  form!: FormGroup;

  dateFormat$!: BehaviorSubject<string>;

  formatsArray = DATE_FORMATS;

  constructor(private rootFormGroup: FormGroupDirective, private headerDataService: HeaderDataService) { }

  ngOnInit(): void {
    this.form = this.rootFormGroup.control;
    this.dateFormat$ = this.headerDataService.currentDateFormat$;
  }

  changeDateFormat(event: MatSelectChange): void {
    this.headerDataService.setDateFormat(event.value);
  }
}
