import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { EPassenger } from '../../../models/passengers-data.interface';
import * as Constant from '../../../../shared/constants';

@Component({
  selector: 'app-passenger-form',
  templateUrl: './passenger-form.component.html',
  styleUrls: ['./passenger-form.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ]
})
export class PassengerFormComponent implements OnInit {
  @Input() passenger!: FormGroup;

  @Input() id!: number;

  form!: any;

  nameTooltip = Constant.NAME_TOOLTIP;

  get firstName(): FormControl<string> {
    return this.passenger.get('firstName') as unknown as FormControl<string>;
  }

  get lastName(): FormControl<string> {
    return this.passenger.get('lastName') as unknown as FormControl<string>;
  }

  get category(): string {
    return this.passenger.get('category')?.value;
  }

  get canAddCheckinBag(): boolean {
    return this.category !== EPassenger.INFANT;
  } 

  constructor(private rootFormGroup: FormGroupDirective) { }

  ngOnInit(): void {
    this.form = this.rootFormGroup.control.get(Constant.PASSENGERS_FORM_ARRAY_NAME);
  }
}
