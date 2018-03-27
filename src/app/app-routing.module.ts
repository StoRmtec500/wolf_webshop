import { AgbNagelplattenComponent } from './webshop/agb/agb-nagelplatten/agb-nagelplatten.component';
import { MetalwebsComponent } from './webshop/metalwebs/metalwebs.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NagelplattenComponent } from './webshop/nagelplatten/nagelplatten.component';
import { BinderwinkelComponent } from './webshop/binderwinkel/binderwinkel.component';
import { AgbComponent } from './webshop/agb/agb.component';
import { AgbMetalwebsComponent } from './webshop/agb/agb-metalwebs/agb-metalwebs.component';
import { AgbBinderwinkelComponent } from './webshop/agb/agb-binderwinkel/agb-binderwinkel.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: NagelplattenComponent  },
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
  { path: 'agb',
    component: AgbComponent,
    children: [
        { path: 'abg_nagelplatten', component: AgbNagelplattenComponent},
        { path: 'abg_metalwebs', component: AgbMetalwebsComponent},
        { path: 'abg_binderwinkel', component: AgbBinderwinkelComponent}
    ]
  },
  { path: '**', redirectTo: 'nagelplatten'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
