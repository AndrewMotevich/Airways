import { Injectable } from '@angular/core';
import { formData } from '../models/formData.model';

@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  formData: formData | undefined;

  setFormData(obj: formData): void {
    this.formData = obj;
  }
}
