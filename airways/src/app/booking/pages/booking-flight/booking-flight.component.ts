import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IPassengersData } from '../../models/passengers-data.interface';

@Component({
  selector: 'app-booking-flight',
  templateUrl: './booking-flight.component.html',
  styleUrls: ['./booking-flight.component.scss']
})

export class BookingFlightComponent implements OnInit {
  passengersData: IPassengersData = { adult: 1, child: 1, infant: 0 };

  passengersFormGroup!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.passengersFormGroup = this.fb.nonNullable.group({});
  }

  onSubmit(): void {
    console.log(this.passengersFormGroup?.value);
  }
}
