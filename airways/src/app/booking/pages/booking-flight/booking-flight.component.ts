import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { IPassengerDetails } from '../../models/passenger.interface';

@Component({
  selector: 'app-booking-flight',
  templateUrl: './booking-flight.component.html',
  styleUrls: ['./booking-flight.component.scss']
})

export class BookingFlightComponent implements OnInit {
  passengersData = [
    { adult: 1 },
    { child: 0 },
    { infant: 0 }
  ];

  passengersFormGroup!: FormGroup;

  get passengersDetailsArray(): FormArray {
    return this.passengersFormGroup.get('passengersDetailsArray') as FormArray;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    const passengersArray: FormGroup[] = [];

    this.passengersData.map(item => {
      const [category, total] = Object.entries(item)[0];

      if (!total) return;

      const arr = [...Array(total)].map((_) => this.fb.group<IPassengerDetails>({
        category: [category],
        firstName: [''],
        lastName: [''],
        gender: [''],
        dateOfBirth: ['']
      }));

      passengersArray.push(...arr);
    });

    this.passengersFormGroup = this.fb.group({
      passengersDetailsArray: this.fb.array(passengersArray)
    })
  }

  onSubmit(): void {
    console.log(this.passengersFormGroup?.value);
  }
}
