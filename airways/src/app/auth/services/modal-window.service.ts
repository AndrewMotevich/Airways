import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalWindowService {
  isModal = false;

  showModal(): void {
    this.isModal = !this.isModal;
  }
}
