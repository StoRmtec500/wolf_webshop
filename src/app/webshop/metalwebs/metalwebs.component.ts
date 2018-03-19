import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Nagelplatten, Rabatt, ID, Laenderliste, BestellungKopf, BestellungKopfDetail } from '../../shared';
import { NagelplattenService } from '../../shared/service/nagelplatten.service';
import { RouterModule, Router } from '@angular/router';
import { forkJoin } from "rxjs/observable/forkJoin";

@Component({
  selector: 'app-metalwebs',
  templateUrl: './metalwebs.component.html',
  styleUrls: ['./metalwebs.component.scss']
})
export class MetalwebsComponent implements OnInit {

  myControl: FormControl = new FormControl();
  filteredOptions: Observable<any[]>;
  result: any;
  @ViewChild('name') name: HTMLInputElement;
  headertitle = 'Bestellung Nagelplatten';
  nagelplatten: Nagelplatten[];
  warenkorb: Nagelplatten[] = [];
  rabatte: Rabatt[];
  bestellungKopfID: ID[];
  details = '';
  showBasket = false;  showBasketZwischensumme = false;
  basketSumme; basketGewicht; public basketZwischenSumme; public basketZwischenSummeRabatt;
  basketRabattProzent;  basketRabattAbKG;  basketTransport; Gesamt; basketSummeGesamt;
  bookName: String;
isValid = true;
error = false;
errorMsg;
ID;
bestellID: number;

land: Laenderliste[] = [];

  anreden = [
    {value: 'Firma', viewValue: 'Firma'},
    {value: 'Herr', viewValue: 'Herr'},
    {value: 'Frau', viewValue: 'Frau'}
  ];

  bestellung = new BestellungKopf();
  bestellungDetail = new BestellungKopfDetail();


  constructor(private ns: NagelplattenService, private router: Router) { }

  ngOnInit() {
    this.nagelplatten = null;
    this.ns.getRabatt().subscribe((res : any) => this.rabatte = res[1].metalwebs);
    console.log("Rabatt JSON wurde geladen !!!" + this.rabatte);
    this.loadLaenderliste();
  }


  getMetalWebs() {
      this.nagelplatten = null;
      this.ns.getMetalWebs().subscribe(data => this.nagelplatten = data);
  }

  loadLaenderliste() {
    this.ns.getLaenderliste().subscribe((land: Laenderliste[]) => {
      this.land = land;
      console.log("Länderliste:" + JSON.stringify(this.land));
    });
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
            if(this.warenkorb[i].Stk == stk && this.warenkorb[i].PKArtikelID == artnr) {
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
      this.warenkorb.splice(index , 1);
      this.calcSumme();
      this.calczwischensumme();
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
    console.log("Rabatte:" +JSON.stringify(this.rabatte));
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

  if (this.basketGewicht > 3000) {
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
      this.bestellung.GesamtSumme = this.basketSummeGesamt;
    } else
    {
      this.bestellung.ZwischenSumme = this.basketZwischenSumme;
      this.bestellung.Rabatt = this.basketRabattProzent;
      this.bestellung.RabattSumme = this.basketZwischenSummeRabatt;
    }
    
    if(this.basketSumme == null){
      this.bestellung.GesamtSumme = this.basketSummeGesamt;
    } else {
      this.bestellung.GesamtSumme = this.basketSummeGesamt;
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
    this.bestellungDetail.Breite = this.warenkorb[i].Breite;
   // this.bestellungDetail.Laenge = this.warenkorb[i].Laenge;
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


  clearAll() {

    window.location.reload();
  }


}
