import { Component } from '@angular/core';
import { ModalWindowService } from 'src/app/auth/services/modal-window.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(public modalWindowServices: ModalWindowService) {}
}
