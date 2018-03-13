import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NagelplattenBasketComponent } from './home/nagelplatten-basket/nagelplatten-basket.component';
import { NagelplattenComponent } from './webshop/nagelplatten/nagelplatten.component';

const routes: Routes = [
  {
    path: '',
    component: NagelplattenComponent
  },
  {
    path: 'nagelplatten',
    component: NagelplattenComponent
  },
  { path: 'basket',
    component: NagelplattenBasketComponent
  },
  {
    path: 'dashboard',
    loadChildren: '../app/dashboard/dashboard.module#DashboardModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
