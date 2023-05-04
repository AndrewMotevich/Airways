import { Component, Input, OnInit } from '@angular/core';
import { FormGroupDirective, FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import * as Constant from 'src/app/shared/constants';
import { IPassengersData } from '../../models/passengers-data.interface';
import { IPassengerDetails } from '../../models/passenger.interface';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss']
})
export class PassengersComponent implements OnInit {
  @Input() passengersData!: IPassengersData;

  form!: FormGroup;

  formArrayName = Constant.PASSENGERS_FORM_ARRAY_NAME;

  passengersFormArray: FormArray = this.fb.array([]);

  constructor(private rootFormGroup: FormGroupDirective, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.rootFormGroup.control;

    if (!this.passengersData) return;

    // eslint-disable-next-line array-callback-return
    Object.entries(this.passengersData).map(([category, total]: [category: string, total: number]) => {
      if (!total) return;

      [...Array(total)].forEach((_) => {
        this.passengersFormArray.push(this.fb.group<IPassengerDetails>({
          category: [category],
          firstName: ['', [Validators.required, Validators.minLength(3)]],
          lastName: ['', [Validators.required, Validators.minLength(3)]],
          gender: ['', [Validators.required]],
          dateOfBirth: ['', [Validators.required]],
          needHelp: false,
          checkedInBag: [{ value: 0, disabled: false }]
        }));
      });
    });

    this.form.addControl(this.formArrayName, this.passengersFormArray);
  }

  get passengers(): FormGroup[] {
    return this.passengersFormArray.controls as FormGroup[];
  }
}
