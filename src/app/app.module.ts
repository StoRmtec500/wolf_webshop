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
import { registerLocaleData, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { SidenavComponent } from './sidenav/sidenav/sidenav.component';
import { NagelplattenComponent } from './webshop/nagelplatten/nagelplatten.component';
import { NagelplattenService } from './shared/service/nagelplatten.service';
import { RouterModule, RouterLinkActive } from '@angular/router';
import { MetalwebsComponent } from './webshop/metalwebs/metalwebs.component';
import { BinderwinkelComponent } from './webshop/binderwinkel/binderwinkel.component';
import { AgbComponent } from './webshop/agb/agb.component';
import { AgbNagelplattenComponent } from './webshop/agb/agb-nagelplatten/agb-nagelplatten.component';
import { AgbMetalwebsComponent } from './webshop/agb/agb-metalwebs/agb-metalwebs.component';
import { AgbBinderwinkelComponent } from './webshop/agb/agb-binderwinkel/agb-binderwinkel.component';
registerLocaleData(localeDe)

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    NagelplattenComponent,
    MetalwebsComponent,
    BinderwinkelComponent,
    AgbComponent,
    AgbNagelplattenComponent,
    AgbMetalwebsComponent,
    AgbBinderwinkelComponent
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
    {provide: MAT_DATE_LOCALE, useValue: 'de-DE'},
    {provide: LocationStrategy, useClass:HashLocationStrategy}


  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
