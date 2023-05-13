import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAX_PHONE_LENGTH } from 'src/app/shared/constants';
import { IPassengersData } from '../../models/passengers-data.interface';

@Component({
  selector: 'app-booking-flight',
  templateUrl: './booking-flight.component.html',
  styleUrls: ['./booking-flight.component.scss']
})

export class BookingFlightComponent implements OnInit {
  passengersData: IPassengersData = { adult: 1, child: 1, infant: 0 };

  passengersFormGroup!: FormGroup;

  maxLength = MAX_PHONE_LENGTH;

  currentPhoneCode = 'CY';

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.passengersFormGroup = this.fb.nonNullable.group({
      phoneCode: [this.currentPhoneCode, Validators.required],
      phone: ['', [Validators.required, Validators.maxLength(this.maxLength)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    console.log(this.passengersFormGroup?.value);
  }
}
