import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalWindowService {
  private modal = false;

  closeModel(): void {
    if (this.modal === true) this.modal = false;
  }

  openModel(): void {
    if (this.modal === false) this.modal = true;
  }

  switchModal(): void {
    this.modal = !this.modal;
  }

  getModal(): boolean {
    return this.modal;
  }
}
