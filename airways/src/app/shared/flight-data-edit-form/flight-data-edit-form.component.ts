import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { EditFormService } from '../../auth/services/edit-form.service';

@Component({
  selector: 'app-flight-data-edit-form',
  templateUrl: './flight-data-edit-form.component.html',
  styleUrls: ['./flight-data-edit-form.component.scss'],
})
export class FlightDataEditFormComponent {
  isEditFormOpen$: Observable<boolean> = this.editFormService.isEditFormOpen$;

  constructor(private editFormService: EditFormService) {}
}
