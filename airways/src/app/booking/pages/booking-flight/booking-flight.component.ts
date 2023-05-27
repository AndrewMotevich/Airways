import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import dayjs from 'dayjs';
import { MAX_PHONE_LENGTH } from '../../../shared/constants';
import { TPassengersData } from '../../models/passengers-data.interface';
import { PassengersDataService } from '../../services/passengers-data.service';

@Component({
  selector: 'app-booking-flight',
  templateUrl: './booking-flight.component.html',
  styleUrls: ['./booking-flight.component.scss']
})

export class BookingFlightComponent implements OnInit {
  passengersData: TPassengersData = { adult: 2, child: 1, infant: 0 };

  passengersFormGroup!: FormGroup;

  maxLength = MAX_PHONE_LENGTH;

  currentPhoneCode = 'CY';

  constructor(private fb: FormBuilder, private passengersService: PassengersDataService, private router: Router) { }

  ngOnInit(): void {
    this.passengersFormGroup = this.fb.nonNullable.group({
      phoneCode: [this.currentPhoneCode, Validators.required],
      phone: ['', [Validators.required, Validators.maxLength(this.maxLength)]],
      email: ['', [Validators.required, Validators.email]],
    });
    this.passengersFormGroup.patchValue({
      email: 'bbbom@mail.ru',
      code: 'CY',
      phone: '67234256'
    });

  }

  add(): void {
    this.passengersFormGroup.patchValue({
      passengers: [
        {
          category: 'adult',
          firstName: 'Harry',
          lastName: 'Potter',
          gender: 'male',
          dateOfBirth: dayjs().toDate(),
          needHelp: true,
          checkedInBag: 0
        },
        {
          category: 'adult',
          firstName: 'Lilly',
          lastName: 'Potter',
          gender: 'male',
          dateOfBirth: dayjs().toDate(),
          needHelp: false,
          checkedInBag: 10
        },
        {
          category: 'child',
          firstName: 'James',
          lastName: 'Potter',
          gender: 'male',
          dateOfBirth: dayjs().toDate(),
          needHelp: true,
          checkedInBag: 32
        }
      ]
    });
  }

  onSubmit(): void {
    console.log(this.passengersFormGroup?.value);
    this.passengersService.setPassengersData(this.passengersFormGroup?.value);
    this.router.navigateByUrl('/summary');
  }
}
