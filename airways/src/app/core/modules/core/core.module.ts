import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { HeaderComponent } from '../../components/header/header/header.component';
import { FooterComponent } from '../../components/header/footer/footer.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [CommonModule, MatSelectModule, MatButtonModule, MatIconModule, MatStepperModule],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}
