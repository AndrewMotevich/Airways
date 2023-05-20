/* eslint-disable class-methods-use-this */
import { Injectable } from '@angular/core';
import { FormDataModel, PointModel } from '../models/form-data-type.model';

const initialFormDataValues: FormDataModel<PointModel> = {
  roundedTrip: null,
  from: null,
  destination: null,
  dateStart: null,
  dateEnd: null,
  passengers: null,
  adult: null,
  child: null,
  infant: null,
};

@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  private formData: FormDataModel<PointModel> = initialFormDataValues;

  setMainFormData(mainFormData: FormDataModel<string>): void {
    this.formData = {
      ...mainFormData,
      from: this.getCityAndCodeFromString(mainFormData.from),
      destination: this.getCityAndCodeFromString(mainFormData.destination),
    };
  }

  getMainFormData(): FormDataModel<PointModel> {
    return this.formData;
  }

  private getCityAndCodeFromString = (combinedString: string | null): PointModel => {
    if (combinedString === null)
      return {
        title: null,
        code: null,
      };
    const matchCity = combinedString.match(/^(.*?)\s*\([^)]*\)/);
    const matchCode = combinedString.match(/\((.*?)\)/);

    return {
      title: matchCity ? matchCity[1] : null,
      code: matchCode ? matchCode[1] : null,
    };
  };
}
