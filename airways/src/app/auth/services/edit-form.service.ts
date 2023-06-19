import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EditFormService {
  private isEditFormOpenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public isEditFormOpen$ = this.isEditFormOpenSubject.asObservable();

  toggleEditForm(): void {
    this.isEditFormOpenSubject.next(!this.isEditFormOpenSubject.value);
  }
}
