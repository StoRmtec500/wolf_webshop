import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-nagelplatten-basket',
  templateUrl: './nagelplatten-basket.component.html',
  styleUrls: ['./nagelplatten-basket.component.scss']
})
export class NagelplattenBasketComponent implements OnInit {


  constructor() { }

  public ngOnInit() {
    //  this.service.getNagelplattenDetail(this.route.snapshot.params[ 'id' ])
    //  .subscribe( nageldetail => (this.nagelplattenDetails = nageldetail));
   // console.log(this.np.basket[0]);
   // if ( this.test != null) {
   //   this.test == null;
   // } else {
   //   this.test = this.np.basket;
   // }
  }


}
