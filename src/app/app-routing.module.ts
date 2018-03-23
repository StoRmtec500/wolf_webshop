import { MetalwebsComponent } from './webshop/metalwebs/metalwebs.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NagelplattenComponent } from './webshop/nagelplatten/nagelplatten.component';
import { BinderwinkelComponent } from './webshop/binderwinkel/binderwinkel.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'nagelplatten',
    pathMatch: 'full'
  },
  {
    path: 'nagelplatten',
    component: NagelplattenComponent
    
  },
  { path: 'metalwebs',
    component: MetalwebsComponent
  },
  { path: 'binderwinkel',
    component: BinderwinkelComponent
  },
  { path: '**', redirectTo: 'nagelplatten', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
