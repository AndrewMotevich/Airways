import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FetchCitiesService } from '../../services/fetch-cities.service';
import { City } from '../../models/city.model';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.scss'],
})
export class MainFormComponent implements OnInit {
  isLoading = false;

  cities: City[] = [];

  constructor(private getCities: FetchCitiesService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.getCities.getCities().subscribe(() => {
      this.isLoading = false;
      this.cities = this.getCities.cities;
    });
  }

  form = new FormGroup({
    city: new FormControl<string>('', [Validators.required]),
    roundedTrip: new FormControl<string>('', [Validators.required]),
  });

  submit(): void {
    // eslint-disable-next-line no-console
    console.log(this.form.value);
    // todo service for form
  }
}
