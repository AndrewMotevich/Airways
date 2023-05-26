import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageModule } from './booking/pages/main-page/main-page.module';
import { CoreModule } from './core/modules/core/core.module';
import { ShoppingCartPageModule } from './booking/pages/shopping-cart-page/shopping-cart-page.module';
import { UserAccountPageModule } from './booking/pages/user-account-page/user-account-page.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MainPageModule,
    CoreModule,
    ShoppingCartPageModule,
    UserAccountPageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
