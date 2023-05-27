import { Component } from '@angular/core';
import dayjs from 'dayjs';
import { Observable } from 'rxjs';
import { FormDataModel, PointModel } from '../../booking/models/form-data.model';
import { FormDataService } from '../../booking/services/form-data.service';
import { EditFormService } from '../../auth/services/edit-form.service';

@Component({
  selector: 'app-flight-info-menu',
  templateUrl: './flight-info-menu.component.html',
  styleUrls: ['./flight-info-menu.component.scss'],
})
export class FlightInfoMenuComponent {
  flightData$: Observable<FormDataModel<PointModel>>;

  departure: PointModel = { title: '', code: '' };

  arrival: PointModel = { title: '', code: '' };

  departureDate: string = '';

  returnDate: string = '';

  passengersCount: number = 0;

  constructor(private formDataService: FormDataService, private editFormService: EditFormService) {
    this.flightData$ = this.formDataService.getObservableMainFormData();

    this.flightData$.subscribe((formData: FormDataModel<PointModel>) => {
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
      this.passengersCount = formData.passengers ?? 0;
    });
  }

  toggleEditForm(): void {
    this.editFormService.toggleEditForm();
  }
}
