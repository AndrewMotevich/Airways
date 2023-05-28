import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, mergeMap, toArray } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { AviaSalesApiService } from '../../booking/services/aviasales-api.service';
import { CityDateType } from '../../booking/models/city-data-type.model';
import { FormDataService } from '../../booking/services/form-data.service';
import { changeIcon } from '../../../assets/icons/Vector';
import { AirportsDataType } from '../../booking/models/airports-data-type';
import { TripDataService } from '../../booking/services/trip-data.service';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MainFormComponent implements OnInit {
  toggle = true;

  isLoading = false;

  filteredFromOptions?: Observable<AirportsDataType[]>;

  filteredDestinationOptions?: Observable<AirportsDataType[]>;

  cities: CityDateType[] = [];

  airports: AirportsDataType[] = [];

  adult = 1;

  child = 0;

  infant = 0;

  form = new FormGroup({
    roundedTrip: new FormControl<string>('both', [Validators.required]),
    from: new FormControl<string | null>(null, [Validators.required]),
    destination: new FormControl<string | null>(null, [Validators.required]),
    dateStart: new FormControl<string | null>(null, [Validators.required]),
    dateEnd: new FormControl<string | null>(null, [Validators.required]),
    passengers: new FormControl<number>(1, [Validators.min(1)]),
    adult: new FormControl<number>(1, [Validators.min(1), Validators.max(9)]),
    child: new FormControl<number>(0, [Validators.min(0), Validators.max(9)]),
    infant: new FormControl<number>(0, [Validators.min(0), Validators.max(9)]),
  });

  currentUrl?: string;

  constructor(
    private router: Router,
    private aviasalesApiService: AviaSalesApiService,
    private formDataService: FormDataService,
    private tripData: TripDataService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.iconRegistry.addSvgIconLiteral(
      'change-icon',
      this.sanitizer.bypassSecurityTrustHtml(changeIcon)
    );
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.aviasalesApiService.getCities().subscribe(() => {
      this.cities = this.aviasalesApiService.cities;

      this.aviasalesApiService
        .getAirports()
        .pipe(
          mergeMap((x) => x),
          map((x) => ({
            ...x,
            city_name: this.cities.find((val) => val.code === x.city_code)?.name || '',
          })),
          toArray()
        )
        .subscribe((res) => {
          this.aviasalesApiService.airports = res;
          this.airports = res;
        });

      this.filteredFromOptions = this.form.controls.from.valueChanges.pipe(
        map((value) => this.filterFrom(value || ''))
      );
      this.filteredDestinationOptions = this.form.controls.destination.valueChanges.pipe(
        map((value) => this.filterDestination(value || ''))
      );
      this.isLoading = false;
    });
  }

  public submit(): void {
    if (this.form.valid) {
      this.formDataService.setMainFormData(this.form.getRawValue());
      this.tripData.addNewTrip();
      this.router.navigate(['/select-flight']);
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
    const { from, destination } = this.form.controls;

    if (!from.hasError('required') && !destination.hasError('required')) {
      const currentFrom = from.value;
      const currentDestination = destination.value;

      from.setValue(currentDestination);
      destination.setValue(currentFrom);
    }
  }

  private filterFrom(value: string): AirportsDataType[] {
    if (value.length > 1) {
      const filterValue = value.toLowerCase();
      return this.airports.filter((airport) =>
        airport.city_name.toLowerCase().includes(filterValue)
      );
    }
    return [];
  }

  private filterDestination(value: string): AirportsDataType[] {
    if (value.length > 1) {
      const filterValue = value.toLowerCase();
      return this.airports.filter((airport) =>
        airport.city_name.toLowerCase().includes(filterValue)
      );
    }
    return [];
  }
}
