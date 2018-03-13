import { NagelplattenService } from './home/nagelplatten.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import {MatTabsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatIconModule, MatNativeDateModule, MAT_DATE_LOCALE, MatAutocomplete, MatAutocompleteModule, MatProgressSpinnerModule, MatProgressBarModule} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { NagelplattenBasketComponent } from './home/nagelplatten-basket/nagelplatten-basket.component';
import { databaseProvider } from './shared/databaseProvider/databaseProvider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import localeDe from '@angular/common/locales/de';
import { registerLocaleData } from '@angular/common';
import { SidenavComponent } from './sidenav/sidenav/sidenav.component';
registerLocaleData(localeDe)

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NagelplattenBasketComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTabsModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule, 
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ],
  providers: [
    NagelplattenService, 
    databaseProvider, NagelplattenBasketComponent,
    {provide: LOCALE_ID, useValue: 'de'},
    {provide: MAT_DATE_LOCALE, useValue: 'de-DE'}



  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
