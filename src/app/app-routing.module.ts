import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NagelplattenBasketComponent } from './home/nagelplatten-basket/nagelplatten-basket.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'basket/:id', component: NagelplattenBasketComponent}
    ]
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
