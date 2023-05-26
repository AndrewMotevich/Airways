import { Component } from '@angular/core';
import dayjs from 'dayjs';
import { FormDataModel, PointModel } from '../../booking/models/form-data.model';
import { FormDataService } from '../../booking/services/form-data.service';

@Component({
  selector: 'app-flight-info-menu',
  templateUrl: './flight-info-menu.component.html',
  styleUrls: ['./flight-info-menu.component.scss'],
})
export class FlightInfoMenuComponent {
  departure: PointModel;

  arrival: PointModel;

  departureDate: string;

  returnDate: string;

  passengersCount: number;

  constructor(private formDataService: FormDataService) {
    const formData: FormDataModel<PointModel> = this.formDataService.getMainFormData();
    this.departure =
      formData.from === null
        ? { title: '', code: '' }
        : { title: formData.from.title, code: formData.from.code };
    this.arrival =
      formData.destination === null
        ? { title: '', code: '' }
        : { title: formData.destination.title, code: formData.destination.code };

    this.departureDate = dayjs(formData?.dateStart).format('DD MMM').toString() ?? '';
    this.returnDate = dayjs(formData?.dateEnd).format('DD MMM').toString() ?? '';
    this.passengersCount = formData.passengers ?? 3;
  }
}
