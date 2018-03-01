import { NagelplattenService } from './home/nagelplatten.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatTabsModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { NagelplattenBasketComponent } from './home/nagelplatten-basket/nagelplatten-basket.component';
import { databaseProvider } from './shared/databaseProvider/databaseProvider';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NagelplattenBasketComponent
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
    FormsModule
  ],
  providers: [
    NagelplattenService, 
    databaseProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
