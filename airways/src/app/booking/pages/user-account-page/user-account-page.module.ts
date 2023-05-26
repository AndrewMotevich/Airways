import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAccountPageComponent } from './user-account-page.component';
import { UserAccountTableComponent } from '../../components/user-account-table/user-account-table.component';

@NgModule({
  declarations: [UserAccountPageComponent, UserAccountTableComponent],
  imports: [CommonModule],
})
export class UserAccountPageModule {}
