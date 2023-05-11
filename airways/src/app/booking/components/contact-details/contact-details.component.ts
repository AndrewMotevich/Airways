import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { PhoneCodeService } from '../../services/phone-code.service';
import { IPhoneCode } from '../../models/phone-code.interface';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
  providers: [PhoneCodeService]
})
export class ContactDetailsComponent implements OnInit {
  @Input() formGroup!: FormGroup;

  @Input() maxLength!: number;



  phoneCodes!: Observable<IPhoneCode[]>;

  get email(): FormControl<string> {
    return this.formGroup.get('email') as unknown as FormControl<string>;
  }

  get phone(): FormControl<string> {
    return this.formGroup.get('phone') as unknown as FormControl<string>;
  }

  constructor(private phoneCodeServise: PhoneCodeService) { }

  ngOnInit(): void {
    this.phoneCodes = this.phoneCodeServise.getPhoneCode();
  }
}
