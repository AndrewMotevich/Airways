import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FetchApiService } from '../../services/feth-api.service';
import { City } from '../../models/city.model';
import { FormDataService } from '../../services/form-data.service';
import { formData } from '../../models/formData.model';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.scss'],
})
export class MainFormComponent implements OnInit {
  toggle = false;

  passengers = ['Adults', 'Child', 'Infant'];

  isLoading = false;

  filteredFromOptions: Observable<City[]> | undefined;

  filteredDestinationOptions: Observable<City[]> | undefined;

  cities: City[] = [];

  constructor(private getCities: FetchApiService, private formDataService: FormDataService) {}

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

  form = new FormGroup({
    roundedTrip: new FormControl<string>('', [Validators.required]),
    from: new FormControl<string>('', [Validators.required]),
    destination: new FormControl<string>('', [Validators.required]),
    dateStart: new FormControl<string>('', [Validators.required]),
    dateEnd: new FormControl<string>('', [Validators.required]),
    passengers: new FormControl<string>('', [Validators.required]),
  });

  submit(): void {
    if (this.form.valid) {
      this.formDataService.setFormData(this.form.value as unknown as formData);
      // eslint-disable-next-line no-console
      console.log(this.formDataService.formData);
    }
    // todo service for form
  }

  private filterFrom(value: string): City[] {
    const filterValue = value.toLowerCase();

    return this.cities.filter((city) => city.name.toLowerCase().includes(filterValue));
  }

  private filterDestination(value: string): City[] {
    const filterValue = value.toLowerCase();

    return this.cities.filter((city) => city.name.toLowerCase().includes(filterValue));
  }
}