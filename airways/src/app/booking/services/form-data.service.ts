import { Injectable } from '@angular/core';
import { FormDataType } from '../models/form-data-type.model';

@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  private formData?: FormDataType;

  setMainFormData(obj: FormDataType): void {
    this.formData = obj;
  }

  getMainFormData(): FormDataType | undefined {
    return this.formData;
  }
}
