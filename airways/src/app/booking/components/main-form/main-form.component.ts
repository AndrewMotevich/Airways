import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AviaSalesApiService as AviasalesApiService } from '../../services/aviasales-api.service';
import { CityDateType } from '../../models/city-data-type.model';
import { FormDataService } from '../../services/form-data.service';
import { FormDataType } from '../../models/form-data-type.model';
import { changeIcon } from '../../../../assets/icons/Vector';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MainFormComponent implements OnInit {
  toggle = true;

  isLoading = false;

  filteredFromOptions?: Observable<CityDateType[]>;

  filteredDestinationOptions?: Observable<CityDateType[]>;

  cities: CityDateType[] = [];

  adult = 1;

  child = 0;

  infant = 0;

  form = new FormGroup({
    roundedTrip: new FormControl<string>('both', [Validators.required]),
    from: new FormControl<string>('', [Validators.required]),
    destination: new FormControl<string>('', [Validators.required]),
    dateStart: new FormControl<Date>(new Date(), [Validators.required]),
    dateEnd: new FormControl<Date | null>(null, [Validators.required]),
    passengers: new FormControl<number>(0, [Validators.min(1)]),
    adult: new FormControl<number>(1, [Validators.min(1), Validators.max(9)]),
    child: new FormControl<number>(0, [Validators.min(0), Validators.max(9)]),
    infant: new FormControl<number>(0, [Validators.min(0), Validators.max(9)]),
  });

  constructor(
    private getCities: AviasalesApiService,
    private formDataService: FormDataService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIconLiteral('change-icon', sanitizer.bypassSecurityTrustHtml(changeIcon));
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getCities.getCities().subscribe(() => {
      this.isLoading = false;
      this.cities = this.getCities.cities;

      this.filteredFromOptions = this.form.controls.from.valueChanges.pipe(
        map((value) => this.filterFrom(value || ''))
      );
      this.filteredDestinationOptions = this.form.controls.destination.valueChanges.pipe(
        map((value) => this.filterDestination(value || ''))
      );
    });
  }

  public submit(): void {
    if (this.form.valid) {
      this.formDataService.setMainFormData(this.form.value as unknown as FormDataType);
    }
  }

  public passengersHandler(
    event: Event,
    increase: boolean,
    property: 'adult' | 'child' | 'infant'
  ): void {
    event.stopPropagation();
    switch (property) {
      case 'adult':
        if (increase && this.adult < 9) {
          this.adult += 1;
          this.form.controls.adult.setValue(this.adult);
        } else if (!increase && this.adult > 0) {
          this.adult -= 1;
          this.form.controls.adult.setValue(this.adult);
        }
        break;
      case 'child':
        if (increase && this.child < 9) {
          this.child += 1;
          this.form.controls.child.setValue(this.child);
        } else if (!increase && this.child > 0) {
          this.child -= 1;
          this.form.controls.child.setValue(this.child);
        }
        break;
      case 'infant':
        if (increase && this.infant < 9) {
          this.infant += 1;
          this.form.controls.infant.setValue(this.infant);
        } else if (!increase && this.infant > 0) {
          this.infant -= 1;
          this.form.controls.infant.setValue(this.infant);
        }
        break;
      default:
        break;
    }
    this.form.controls.passengers.setValue(this.adult + this.child + this.infant);
  }

  public changeDirectionsHandler(): void {
    const currentFrom = this.form.controls.from.value;
    const currentDestination = this.form.controls.destination.value;
    this.form.controls.from.setValue(currentDestination);
    this.form.controls.destination.setValue(currentFrom);
  }

  private filterFrom(value: string): CityDateType[] {
    const filterValue = value.toLowerCase();

    return this.cities.filter((city) => city.name.toLowerCase().includes(filterValue));
  }

  private filterDestination(value: string): CityDateType[] {
    const filterValue = value.toLowerCase();

    return this.cities.filter((city) => city.name.toLowerCase().includes(filterValue));
  }
}
