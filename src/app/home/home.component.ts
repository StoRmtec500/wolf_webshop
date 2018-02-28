import { NagelplattenService } from './nagelplatten.service';
import { Component, OnInit, Input } from '@angular/core';
import { Nagelplatten, Warenkorb } from '../shared/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  headertitle = 'Bestellung Nagelplatten';
  nagelplatten: Nagelplatten[];
  basket: Warenkorb[] = [];
  details = '';
  display = 'none';

  @Input() myNumber: any;

  
   constructor(private ns: NagelplattenService, private router: Router) {
  }

  ngOnInit() {
  }

  getNagelplattenWithTyp(typ: number) {
      this.nagelplatten = null;
      this.ns.getNagelplatten(typ).subscribe(data => this.nagelplatten = data);
  }

  showDetails(id, quota) {
    this.details = id;
    console.log(id, quota);
   // this.router.navigate(['/basket/' + id]);
  }

  onSearchChange(searchValue : string ) {  
    console.log(searchValue);}


    addItemToCart(PKArtikelID, Menge){
      var test = new Warenkorb(PKArtikelID, Menge);  
      this.basket.push(test);
        console.log("Basket" + this.basket);
       // this.ns.getNagelplatten(newItemBasket).subscribe(data => this.nagelplatten = data);
  }

}
