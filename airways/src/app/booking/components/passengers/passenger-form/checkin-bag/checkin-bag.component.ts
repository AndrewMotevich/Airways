import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-checkin-bag',
  templateUrl: './checkin-bag.component.html',
  styleUrls: ['./checkin-bag.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ]
})
export class CheckinBagComponent implements OnInit {
  @Input() passenger!: FormGroup;

  weights = [10, 20, 26, 32];

  isChekedInBag = false;

  checkedInBagControl!: AbstractControl | null;

  ngOnInit(): void {
    this.checkedInBagControl = this.passenger.get('checkedInBag');
  }

  checkBag(): void {
    this.isChekedInBag = !this.isChekedInBag;

    if (this.isChekedInBag) {
      this.checkedInBagControl?.disable();
      this.checkedInBagControl?.setValue(0);
    } else
      this.checkedInBagControl?.enable();
  }
}
