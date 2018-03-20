import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import {MatTabsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatIconModule, MatNativeDateModule, MAT_DATE_LOCALE, MatAutocomplete, MatAutocompleteModule, MatProgressSpinnerModule, MatProgressBarModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { databaseProvider } from './shared/databaseProvider/databaseProvider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import localeDe from '@angular/common/locales/de';
import localeEn from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';
import { SidenavComponent } from './sidenav/sidenav/sidenav.component';
import { NagelplattenComponent } from './webshop/nagelplatten/nagelplatten.component';
import { NagelplattenService } from './shared/service/nagelplatten.service';
import { RouterModule, RouterLinkActive } from '@angular/router';
import { MetalwebsComponent } from './webshop/metalwebs/metalwebs.component';
registerLocaleData(localeDe)

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    NagelplattenComponent,
    MetalwebsComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
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
    MatProgressBarModule, RouterModule
  ],
  providers: [
    NagelplattenService, 
    databaseProvider,
    {provide: LOCALE_ID, useValue: 'de'},
    {provide: MAT_DATE_LOCALE, useValue: 'de-DE'}



  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
