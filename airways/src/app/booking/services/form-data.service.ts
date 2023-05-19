import { Injectable } from '@angular/core';
import { FormDataType } from '../models/form-data-type.model';

@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  private formData?: FormDataType;

  setMainFormData(mainFormData: FormDataType): void {
    this.formData = mainFormData;
    this.formData.from = this.formData.from?.match(/\(\w+\)/)?.[0] || '';
    this.formData.destination = this.formData.destination?.match(/\(\w+\)/)?.[0] || '';
    this.formData.from = this.formData.from?.match(/\w+/)?.[0] || '';
    this.formData.destination = this.formData.destination?.match(/\w+/)?.[0] || '';
  }

  getMainFormData(): FormDataType | undefined {
    return this.formData;
  }
}
