import { Injectable } from '@angular/core';
import { FormDataType } from '../models/form-data-type.model';

@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  private formData?: FormDataType;

  setMainFormData(mainFormData: FormDataType): void {
    this.formData = mainFormData;
  }

  getMainFormData(): FormDataType | undefined {
    return this.formData;
  }
}
