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

  nagelplattenDetails: Nagelplatten[];

  constructor(private service: NagelplattenService, private route: ActivatedRoute, private np: HomeComponent) { }

  ngOnInit() {
      this.service.getNagelplattenDetail(this.route.snapshot.params[ 'id' ])
      .subscribe( nageldetail => (this.nagelplattenDetails = nageldetail));
  }

}
