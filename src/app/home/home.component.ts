import { NagelplattenBasketComponent } from './nagelplatten-basket/nagelplatten-basket.component';
import { NagelplattenService } from './nagelplatten.service';
import { Component,ViewChild, OnInit, Input } from '@angular/core';
import { Nagelplatten, Warenkorb, Rabatt } from '../shared/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('name') name: HTMLInputElement;
  headertitle = 'Bestellung Nagelplatten';
  nagelplatten: Nagelplatten[];
  basket: Warenkorb[] = [];
  rabatte: Rabatt[];
  details = '';
  display = 'none';
  newArray=[];
  Gesamt;
  showBasket = true;
  basketSumme;
  basketGewicht;
 
   constructor(private ns: NagelplattenService, private router: Router) {
  }

  ngOnInit() {
    console.log("Nagelplattenarray: " + this.nagelplatten);
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


    addItemToCart(index){
      //var test = new Warenkorb(index);  
      this.newArray.push(this.nagelplatten[index]);
      //  for (i = 0; i < P)
     
      //this.basket.push(test);
        console.log("Basket" + this.newArray[0]);
       // this.ns.getNagelplatten(newItemBasket).subscribe(data => this.nagelplatten = data);
  }

  onKeyUp(value: number, index: number) {
    this.nagelplatten[index].Stk = value;
    var sum = (this.nagelplatten[index].Preis * this.nagelplatten[index].Stk);
    this.nagelplatten[index].Gesamt = sum;
    this.addToCart(); 
    this.calcSumme();
  }



  addToCart() {
    this.basket.splice(0, 1000);
    for (let n of this.nagelplatten) {
     
         if(n.Stk != null) {
           this.basket.push(n);
          }
          console.log("BASKETNEW" + JSON.stringify(this.basket));
          this.Gesamt = n.Gesamt;
          this.showBasket = true;
      }
  }

  deleteEntry(index) {
    this.basket.splice(index, 1);
  }

  calcSumme() {
    var basketSumme = 0;
    var basketGewicht = 0;
    for (let s of this.basket) {
      basketSumme=basketSumme+s.Gesamt;
      basketGewicht = basketGewicht+s.Gewicht * s.Stk
    }
    this.basketSumme = basketSumme;
    this.basketGewicht = basketGewicht;

  /*  this.ns.getRabatt().then(data => this.rabatte = data);

    for (let r of this.rabatte) {
     // if  (this.basketGewicht == r) {
        console.log("Rabatte: " + r.kg);
      }
        */
  }
}
