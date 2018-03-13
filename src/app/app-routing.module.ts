import { MetalwebsComponent } from './webshop/metalwebs/metalwebs.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NagelplattenComponent } from './webshop/nagelplatten/nagelplatten.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/nagelplatten',
    pathMatch: 'full'
  },
  {
    path: 'nagelplatten',
    component: NagelplattenComponent
  },
  { path: 'metalwebs',
    component: MetalwebsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
