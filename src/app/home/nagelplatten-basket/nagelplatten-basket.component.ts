import { Warenkorb } from './../../shared/model/model.module';
import { NagelplattenService } from './../nagelplatten.service';
import { Component, OnInit } from '@angular/core';
import { Nagelplatten } from '../../shared/index';
import { ActivatedRoute } from '@angular/router';
import { HomeComponent } from '../home.component';

@Component({
  selector: 'app-nagelplatten-basket',
  templateUrl: './nagelplatten-basket.component.html',
  styleUrls: ['./nagelplatten-basket.component.scss']
})
export class NagelplattenBasketComponent implements OnInit {

  test = [];


  constructor(private service: NagelplattenService, private route: ActivatedRoute, private np: HomeComponent) { }

  ngOnInit() {
    //  this.service.getNagelplattenDetail(this.route.snapshot.params[ 'id' ])
    //  .subscribe( nageldetail => (this.nagelplattenDetails = nageldetail));
   // console.log(this.np.basket[0]);
   // if ( this.test != null) {
   //   this.test == null;
   // } else {
   //   this.test = this.np.basket;
   // }
   this.test = this.np.basket;
    
   this.addToBasket();
  }

  public addToBasket() {
    console.log("Basketseite:" + this.test);
  }

}
