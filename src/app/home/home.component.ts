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
  Warenkorb: Warenkorb[] = [];
  rabatte: Rabatt[];
  details = '';
  display = 'none';
  newArray=[];
  Gesamt;
  showBasket = false;
  showBasketZwischensumme = false;
  basketSumme;
  basketGewicht;
  basketZwischenSumme;
  basketZwischenSummeRabatt;
  basketRabattProzent;
  basketRabattAbKG;
 
   constructor(private ns: NagelplattenService, private router: Router) {
  }

  ngOnInit() {
    console.log("Nagelplattenarray: " + this.nagelplatten);
    this.ns.getRabatt().then(data => this.rabatte = data);
    console.log("Rabatt JSON wurde geladen !!!");
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

  onKeyUp(value: number, index: number, typ: string) {
      this.nagelplatten[index].Stk = value;
      this.nagelplatten[index].Typ = typ;
      var sum = (this.nagelplatten[index].Preis * this.nagelplatten[index].Stk);
      this.nagelplatten[index].Gesamt = sum;
      this.addToCart(); 
      this.calcSumme();
      console.log("Delete: "+ this.nagelplatten);
  }



  addToCart() {
    this.Warenkorb.splice(0, 1000);
    for (let n of this.nagelplatten) {
     
         if(n.Stk >= 0) {
           this.Warenkorb.push(n);
          }
          //console.log("BASKETNEW" + JSON.stringify(this.Warenkorb));
          this.Gesamt = n.Gesamt;
          this.showBasket = true;
          this.calcSumme();
          this.calczwischensumme();
          console.log("Add Delete: " + JSON.stringify(this.Warenkorb));
      }
  }

  deleteEntry(index) {
      this.Warenkorb.splice(0 , 1);
      console.log("Entry Delete: " + JSON.stringify(this.Warenkorb));
      }

  calcSumme() {
    var basketSumme = 0;
    var basketGewicht = 0;
    for (let s of this.Warenkorb) {
      basketSumme=basketSumme+s.Gesamt;
      basketGewicht = basketGewicht+s.Gewicht * s.Stk
    } 
    
    this.basketGewicht = basketGewicht;
    this.basketSumme = basketSumme;
    //console.log("calcGewicht:" + this.basketGewicht);
  }

  calczwischensumme() {
    var basketRabatt = 0;
    for(let i = 0; i < this.rabatte.length; i++)
  {
    if (this.basketGewicht > this.rabatte[i].kg)
    {
      basketRabatt = (this.basketSumme / 100 * this.rabatte[i].rabatt);
      this.basketZwischenSumme = (this.basketSumme);
      this.basketRabattProzent = this.rabatte[i].rabatt;
      this.basketRabattAbKG = this.rabatte[i].kg;
      this.basketZwischenSummeRabatt = (basketRabatt);
    }
  }

  if (this.basketGewicht > 1000) {
    this.basketSumme = 0;
    this.showBasketZwischensumme = true;
  } else 
  {
    this.showBasketZwischensumme = false;
    this.basketZwischenSummeRabatt = 0;
  }
   
  }
}
