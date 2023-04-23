import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './core/module/material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainFormComponent } from './booking/components/main-form/main-form.component';
import { HeaderComponent } from './core/components/header/header/header.component';
import { FooterComponent } from './core/components/header/footer/footer.component';
import { MainPageComponent } from './booking/pages/main-page/main-page.component';
import { Page404Component } from './booking/pages/page404/page404.component';

@NgModule({
  declarations: [AppComponent, MainFormComponent, HeaderComponent, FooterComponent, MainPageComponent, Page404Component],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
