import { Component, Input, OnInit } from '@angular/core';
import { FormGroupDirective, FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import * as Constant from '../../../shared/constants';
import { TPassengersData } from '../../models/passengers-data.interface';
import { IPassengerDetails } from '../../models/passenger.interface';
import { PassengersDataService } from '../../services/passengers-data.service';

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

  constructor(
    private rootFormGroup: FormGroupDirective,
    private fb: FormBuilder,
    private passengersDataService: PassengersDataService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
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

    const { passengers } = this.passengersDataService.getPassengersData();

    if (!passengers.length) {
      // eslint-disable-next-line array-callback-return
      Object.entries(this.passengersData).map(([category, total]: [category: string, total: number]) => {
        if (!total) return;

        [...Array(total)].forEach(() => {
          this.passengersFormArray.push(this.fb.group<IPassengerDetails>({
            category,
            firstName: ['', [Validators.required, Validators.minLength(3)]],
            lastName: ['', [Validators.required, Validators.minLength(3)]],
            gender: ['', [Validators.required]],
            dateOfBirth: ['', [Validators.required]],
            needHelp: false,
            checkedInBag: [{ value: null, disabled: false }]
          }));
        });
      });
    } else {
      passengers.forEach(person => {
        const { category, firstName, lastName, gender, dateOfBirth, needHelp, checkedInBag } = person;

        this.passengersFormArray.push(this.fb.group<IPassengerDetails>({
          category,
          needHelp,
          firstName: [firstName, [Validators.required, Validators.minLength(3)]],
          lastName: [lastName, [Validators.required, Validators.minLength(3)]],
          gender: [gender, [Validators.required]],
          dateOfBirth: [dateOfBirth, [Validators.required]],
          checkedInBag: [{ value: checkedInBag || 0, disabled: !checkedInBag }]
        }));
      })
    }

    this.form.addControl(this.formArrayName, this.passengersFormArray);
  }

  get passengers(): FormGroup[] {
    return this.passengersFormArray.controls as FormGroup[];
  }
}
