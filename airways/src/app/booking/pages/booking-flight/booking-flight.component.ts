import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import dayjs from 'dayjs';
import { Subscription } from 'rxjs';
import { MAX_PHONE_LENGTH } from '../../../shared/constants';
import { TPassengersData } from '../../models/passengers-data.interface';
import { PassengersDataService } from '../../services/passengers-data.service';
import { FormDataService } from '../../services/form-data.service';
import { TicketsDataService } from '../../services/tickets-data.service';

@Component({
  selector: 'app-booking-flight',
  templateUrl: './booking-flight.component.html',
  styleUrls: ['./booking-flight.component.scss'],
})
export class BookingFlightComponent implements OnInit {
  passengersData: TPassengersData = { adult: 2, child: 1, infant: 0 };

  passengersFormGroup!: FormGroup;

  maxLength = MAX_PHONE_LENGTH;

  currentPhoneCode = 'CY';

  subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private passengersService: PassengersDataService,
    private router: Router,
    private dataService: FormDataService,
    private ticketsDataService: TicketsDataService
  ) {
    this.subscription = this.dataService.flightData$.subscribe((data) => {
      if (!data) return;

      const { adult, child, infant } = data;
      this.passengersData = { adult, child, infant };
    });
  }

  ngOnInit(): void {
    const { phoneCode, phone, email } = this.passengersService.getPassengersData();

    this.passengersFormGroup = this.fb.nonNullable.group({
      phoneCode: [phoneCode, Validators.required],
      phone: [phone, [Validators.required, Validators.maxLength(this.maxLength)]],
      email: [email, [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    this.passengersService.setPassengersData(this.passengersFormGroup?.value);
    this.router.navigateByUrl('/summary');
  }

  backClickHandler(): void {
    this.ticketsDataService.setTickets([]);
    this.router.navigateByUrl('/select-flight');
  }
}
