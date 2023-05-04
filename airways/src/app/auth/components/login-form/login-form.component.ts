import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ModalWindowService } from '../../services/modal-window.service';
import { AuthFormDataService } from '../../services/auth-form-data.service';
import {
  CitizenshipCodes,
  CountryCodes,
  ICitizenshipCode,
  ICountryCode,
} from '../../models/countries-data-type.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  countryCodes: ICountryCode[] = CountryCodes;

  citizenshipCodes: ICitizenshipCode[] = CitizenshipCodes;

  filteredCountriesOptions?: Observable<ICountryCode[]>;

  filteredCitizenshipOptions?: Observable<ICitizenshipCode[]>;

  hide = true;

  agreeTermError = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    firstName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z -]*')]),
    lastName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z -]*')]),
    bthDate: new FormControl<Date | null>(null, [Validators.required, this.validateDate()]),
    gender: new FormControl('male', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]),
    citizenship: new FormControl('', [Validators.required]),
    acceptTerms: new FormControl('', [Validators.requiredTrue]),
  });

  constructor(
    public modalWindowService: ModalWindowService,
    private authDataService: AuthFormDataService
  ) {}

  ngOnInit(): void {
    this.filteredCountriesOptions = this.registerForm.controls.country.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterCountries(value || ''))
    );

    this.filteredCitizenshipOptions = this.registerForm.controls.citizenship.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterCitizenship(value || ''))
    );
  }

  private filterCountries(value: string): ICountryCode[] {
    const filterValue = value.toLowerCase();

    return this.countryCodes.filter((country) => country.name.toLowerCase().includes(filterValue));
  }

  private filterCitizenship(value: string): ICitizenshipCode[] {
    const filterValue = value.toLowerCase();

    return this.citizenshipCodes.filter((citizen) =>
      citizen.nationality.toLowerCase().includes(filterValue)
    );
  }

  // eslint-disable-next-line class-methods-use-this
  validateDate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const date = control.value;
      if (!date) {
        return null;
      }
      return date > new Date() ? { dateError: true } : null;
    };
  }

  submitRegister(): void {
    if (this.registerForm.get('acceptTerms')?.hasError('required')) {
      this.agreeTermError = true;
    }
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
    }
  }

  submitLogin(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    }
  }
}
