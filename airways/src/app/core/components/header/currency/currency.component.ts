import { Component, Input, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { BehaviorSubject } from 'rxjs';
import { HeaderDataService } from 'src/app/core/services/header-data.service';
import { CURRENCY } from 'src/app/shared/constants';

enum ECurrencyView {
  SELECT = 'select',
  LIST = 'list'
}

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {
  @Input() currencyView: string = ECurrencyView.SELECT;

  @Input() isMainPage!: boolean;

  currentCurrency$: BehaviorSubject<string>;

  currencyArray = CURRENCY;

  isSelect: boolean = true;

  constructor(private headerDataService: HeaderDataService) {
    this.currentCurrency$ = this.headerDataService.currentCurrency$;
  }

  ngOnInit(): void {
    this.isSelect = this.currencyView === ECurrencyView.SELECT;
  }

  changeCurrencyFormat(event: MatSelectChange): void {
    this.headerDataService.setCurrency(event.value);
  }

  setCurrency(currency: string): void {
    this.headerDataService.setCurrency(currency);
  }
}
