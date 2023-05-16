import { Component, Input, OnInit } from '@angular/core';
import { FormGroupDirective, FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import * as Constant from '../../../shared/constants';
import { TPassengersData } from '../../models/passengers-data.interface';
import { IPassengerDetails } from '../../models/passenger.interface';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss']
})
export class PassengersComponent implements OnInit {
  @Input() passengersData!: TPassengersData;

  form!: FormGroup;

  formArrayName = Constant.PASSENGERS_FORM_ARRAY_NAME;

  passengersFormArray: FormArray = this.fb.array([]);

  constructor(private rootFormGroup: FormGroupDirective, private fb: FormBuilder, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon('icon_passengers',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/passengers.svg'));

    this.matIconRegistry.addSvgIcon('icon_contacts',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/contacts.svg'));

    this.matIconRegistry.addSvgIcon('icon_info',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/info.svg'))
  }

  ngOnInit(): void {
    this.form = this.rootFormGroup.control;

    if (!this.passengersData) return;

    // eslint-disable-next-line array-callback-return
    Object.entries(this.passengersData).map(([category, total]: [category: string, total: number]) => {
      if (!total) return;

      [...Array(total)].forEach(() => {
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
