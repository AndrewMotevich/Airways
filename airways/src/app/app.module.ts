import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageModule } from './booking/pages/main-page/main-page.module';
import { CoreModule } from './core/modules/core/core.module';
import { ShoppingCartPageComponent } from './booking/pages/shopping-cart-page/shopping-cart-page.component';
import { UserAccountPageComponent } from './booking/pages/user-account-page/user-account-page.component';
import { ShoppingCartTableComponent } from './booking/components/shopping-cart-table/shopping-cart-table.component';
import { UserAccountTableComponent } from './booking/components/user-account-table/user-account-table.component';

@NgModule({
  declarations: [AppComponent, ShoppingCartPageComponent, UserAccountPageComponent, ShoppingCartTableComponent, UserAccountTableComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MainPageModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
