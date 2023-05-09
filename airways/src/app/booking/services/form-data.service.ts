import { Injectable } from '@angular/core';
import { FormDataType } from '../models/form-data-type.model';

@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  formData?: FormDataType;

  setFormData(obj: FormDataType): void {
    this.formData = obj;
  }
}