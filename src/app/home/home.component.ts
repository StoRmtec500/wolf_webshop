import { NagelplattenBasketComponent } from './nagelplatten-basket/nagelplatten-basket.component';
import { NagelplattenService } from './nagelplatten.service';
import { Component,ViewChild, OnInit, Input } from '@angular/core';
import { Nagelplatten, Warenkorb, Rabatt, BestellungKopf, ID } from '../shared/index';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  result: any;
  @ViewChild('name') name: HTMLInputElement;
  headertitle = 'Bestellung Nagelplatten';
  nagelplatten: Nagelplatten[];
  warenkorb: Warenkorb[] = [];
  rabatte: Rabatt[];
  bestellungKopfID: ID[];
  details = '';
  showBasket = true;  showBasketZwischensumme = false;
  basketSumme; basketGewicht;  basketZwischenSumme;  basketZwischenSummeRabatt;
  basketRabattProzent;  basketRabattAbKG;  basketTransport; Gesamt; basketSummeGesamt;
  bookName: String;
isValid = true;
error = false;
errorMsg;
ID;
bestellID: number;


  anreden = [
    {value: 'Firma', viewValue: 'Firma'},
    {value: 'Herr', viewValue: 'Herr'},
    {value: 'Frau', viewValue: 'Frau'}
  ];

  bestellung = new BestellungKopf();

   constructor(private ns: NagelplattenService, private router: Router) {

  }

  ngOnInit() {
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
    this.warenkorb.splice(0, 1000);
    for (let n of this.nagelplatten) {
     
         if(n.Stk > 0) {
           this.warenkorb.push(n);
          } 
          this.Gesamt = n.Gesamt;
          this.showBasket = true;
          this.calcSumme();
          this.calczwischensumme();
          console.log("Add Delete: " + JSON.stringify(this.warenkorb));       
      }
  }

  deleteEntry(index) {
    if (index == 0) {
      this.showBasket = false;
    }
      this.warenkorb.splice(index , 1);
      console.log("Entry Delete: " + JSON.stringify(this.warenkorb));
      }

  calcSumme() {
    var basketSumme = 0;
    var basketGewicht = 0;
    for (let s of this.warenkorb) {
      basketSumme=basketSumme+s.Gesamt;
      basketGewicht = basketGewicht+s.Gewicht * s.Stk
    } 

    if(basketSumme == 0) {
      this.showBasket = false;
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
      this.basketTransport = this.rabatte[i].fracht;
      this.basketZwischenSummeRabatt = (basketRabatt);
      this.basketSummeGesamt = (this.basketSumme - this.basketZwischenSummeRabatt);
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

  saveBestellung(){

    if(this.basketRabattProzent == null) {
        this.bestellung.Rabatt = 0;
    }
    if(this.basketSumme == null ) {
      this.bestellung.GesamtSumme = 0;
    }
    this.bestellung.PKNpBestellungKopfID = this.bestellID;
    this.bestellung.ZwischenSumme = this.basketZwischenSumme;
    this.bestellung.RabattSumme = this.basketZwischenSummeRabatt;
    this.bestellung.Rabatt = this.basketRabattProzent;
    this.bestellung.GesamtSumme = this.basketSummeGesamt;
    this.bestellung.GesamtGewicht = this.basketGewicht;
    
    console.log("das wird eingetragen: " + JSON.stringify(this.bestellung) +" "+JSON.stringify(this.warenkorb));

    
    console.log("BestellID" + this.bestellID);
      this.ns.makeBestellung(this.bestellung)
      .subscribe((response) => {
        console.log("Value Received: " + this.bestellung);
      },
    (err) => {
      if (err.error.text == "1;;") {
        console.log("ERFOLGREICH:" + JSON.stringify(err));
        this.isValid = true;
        this.error = true;
      } else {
        console.log("ERROR: " + JSON.stringify(err));
        this.isValid = false;
        this.error = true;
        this.errorMsg = JSON.stringify(err.error.text);
      }
    },
  () => {
    console.log("COMPLETE");
  })
}

  makeOrder() {
    this.ID = this.ns.getBestellungKopfID().subscribe(data => {
      return this.getID(data);
    });
  }

  getID(data) {
    this.ID = data;
    this.bestellID = this.ID[0].akt_nr;
    this.saveBestellung();
  }
}
