import { Component, Input, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { BehaviorSubject } from 'rxjs';
import { HeaderDataService } from 'src/app/core/services/header-data.service';
import { DATE_FORMATS } from 'src/app/shared/constants';

export enum EDateFormatView {
  SELECT = 'select',
  LIST = 'list'
}

@Component({
  selector: 'app-date-format',
  templateUrl: './date-format.component.html',
  styleUrls: ['./date-format.component.scss']
})
export class DateFormatComponent implements OnInit {
  @Input() dateFormatView: string = EDateFormatView.SELECT;

  dateFormat$!: BehaviorSubject<string>;

  formatsArray = DATE_FORMATS;

  isSelect: boolean = true;

  constructor(private headerDataService: HeaderDataService) { }

  ngOnInit(): void {
    this.dateFormat$ = this.headerDataService.currentDateFormat$;
    this.isSelect = this.dateFormatView === EDateFormatView.SELECT;
  }

  changeDateFormat(event: MatSelectChange): void {
    this.headerDataService.setDateFormat(event.value);
  }

  setDateFormat(formatValue: string): void {
    this.headerDataService.setDateFormat(formatValue);
  }
}
