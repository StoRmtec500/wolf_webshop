import { NagelplattenBasketComponent } from './nagelplatten-basket/nagelplatten-basket.component';
import { NagelplattenService } from './nagelplatten.service';
import { Component,ViewChild, OnInit, Input } from '@angular/core';
import { Nagelplatten, Warenkorb, Rabatt, BestellungKopf, ID, BestellungKopfDetail } from '../shared/index';
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
  basketSumme; basketGewicht; public basketZwischenSumme; public basketZwischenSummeRabatt;
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
  bestellungDetail = new BestellungKopfDetail();

   constructor(private ns: NagelplattenService, private router: Router) {

  }

  ngOnInit() {
    this.nagelplatten = null;
    this.ns.getRabatt().then(data => this.rabatte = data);
    console.log("Rabatt JSON wurde geladen !!!");
  }

  getNagelplattenWithTyp(typ: number) {
     // this.nagelplatten = null;
      this.ns.getNagelplatten(typ).subscribe(data => this.nagelplatten = data);
  }

  addToCart(stk, index, artnr, typ: string) {
    console.log("bal" + stk);
    this.nagelplatten[index].Stk = stk;
    this.nagelplatten[index].Typ = typ;
    var sum = (this.nagelplatten[index].Preis * this.nagelplatten[index].Stk);
    this.nagelplatten[index].Gesamt = sum;
   // this.warenkorb.splice(0, 1000);
    for (let i = 0; i < this.nagelplatten.length; i++) {
         if(this.nagelplatten[i].PKArtikelID == artnr) {
          for (let i = 0; i < this.warenkorb.length; i++) {
            if(this.warenkorb[i].Stk == stk) {
              this.warenkorb.splice(i, 1);
            }
           
          }
           this.warenkorb.push(this.nagelplatten[index]);
           
           console.log("ArtNrcheck" + JSON.stringify(this.warenkorb));
          } 
          this.Gesamt = this.nagelplatten[i].Gesamt;
      }
      
          this.showBasket = true;
          this.calcSumme();
          this.calczwischensumme();
          console.log("Add to Warenkorb: " + JSON.stringify(this.warenkorb));   
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
    this.basketZwischenSummeRabatt = 0;
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
    }
    this.basketSummeGesamt = (this.basketSumme - this.basketZwischenSummeRabatt);
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
    this.bestellung.PKNpBestellungKopfID = this.bestellID;
    this.bestellungDetail.FKNpBestellungKopfID = this.bestellID;

    if(this.basketZwischenSumme == null) 
    {
      this.bestellung.ZwischenSumme = 0;
      this.bestellung.Rabatt = 0;
      this.bestellung.RabattSumme = 0;
    } else
    {
      this.bestellung.ZwischenSumme = this.basketZwischenSumme;
      this.bestellung.Rabatt = this.basketRabattProzent;
      this.bestellung.RabattSumme = this.basketZwischenSummeRabatt;
    }
    
    if(this.basketSumme == null){
      this.bestellung.GesamtSumme = 0;
    } else {
      this.bestellung.GesamtSumme = (this.basketSumme - this.basketZwischenSummeRabatt);
      this.bestellung.GesamtGewicht = this.basketGewicht;
    }
    
    
    
    // CONSOLE WAS WIRD ALLES EINGEFÜGT
    console.log("das wird eingetragen: " + JSON.stringify(this.bestellung) +" "+JSON.stringify(this.warenkorb));

    this.ns.makeBestellung(this.bestellung)
      .subscribe((response) => {
        console.log("Value Received: " + this.bestellung);
      },
    (err) => {
      if (err.error.text == "1;;") {
        console.log("ERFOLGREICH:" + JSON.stringify(err));
        this.saveBestellungDetail();
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

saveBestellungDetail() {
  
  console.log("FKNpBestellungKopfID:" +this.bestellungDetail.FKNpBestellungKopfID)
  for(let i = 0; i < this.warenkorb.length; i++) {
    this.bestellungDetail.Gewicht = this.warenkorb[i].Gewicht;
    this.bestellungDetail.BestellMenge = this.warenkorb[i].Stk;
    this.bestellungDetail.PKArtikelID = this.warenkorb[i].PKArtikelID;
    this.bestellungDetail.Typ = this.warenkorb[i].Typ;
    this.bestellungDetail.Groesse = this.warenkorb[i].Groesse;
    this.bestellungDetail.PreisMenge = this.warenkorb[i].Preis;
    this.bestellungDetail.MengenEinheit = this.warenkorb[i].ME;
    this.bestellungDetail.PreisGesamt = this.warenkorb[i].Gesamt;
    this.ns.makeBestellungDetails(this.bestellungDetail).subscribe((response) => {
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
