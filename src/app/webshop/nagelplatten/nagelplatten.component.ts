import { Component, ViewChild, OnInit, Input, Injector, LOCALE_ID, Type } from '@angular/core';
import { Nagelplatten, Rabatt, BestellungKopf, ID, BestellungKopfDetail, Laenderliste, Anrede, Typen } from '../../shared/index';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { NagelplattenService } from '../../shared/service/nagelplatten.service';
import { RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-nagelplatten',
  templateUrl: './nagelplatten.component.html',
  styleUrls: ['./nagelplatten.component.scss']
})
export class NagelplattenComponent implements OnInit {
  myControl: FormControl = new FormControl();
  filteredOptions: Observable<any[]>;
  result: any;
  @ViewChild('name') name: HTMLInputElement;
  headertitle = 'Bestellung Nagelplatten';
  nagelplatten: Nagelplatten[] = [];
  nagelplattenTyp: Nagelplatten[] = [];
  warenkorb: Nagelplatten[] = [];
  rabatte: Rabatt[] = [];
  anreden: Anrede[] = [];
  typen: Typen[] = [];
  bestellungKopfID: ID[];
  details = '';
  showBasket = true; showBasketZwischensumme = false;showBasketSumme = false;
  basketSumme; basketGewicht; public basketZwischenSumme; public basketZwischenSummeRabatt;
  basketRabattProzent; basketRabattAbKG; basketTransport; Gesamt; basketSummeGesamt;
  bookName: String;
  isValid = true;
  error = false;
  open = false;
  errorMsg;
  verzinkt: string = 'Verzinkt';
  edelstahl: string = 'Edelstahl';
  ID;
  bestellID: number;
  panelOpenState: boolean = false;
  sum1: number;
  Math: any;
  sprache: string;
  spracheID;


  land: Laenderliste[] = [];



  bestellung = new BestellungKopf();
  bestellungDetail = new BestellungKopfDetail();

  constructor(private ns: NagelplattenService, private router: Router, private injector: Injector) {
  //  this.ns.getAllArticel().subscribe(data => this.nagelplattenTyp = data);
  this.ns.getTypenSelect().subscribe(data => this.typen = data);
  this.getArticelTyp(0);
    this.Math = Math;
    this.sprache = this.injector.get(LOCALE_ID);
    this.typen = null;
    this.nagelplatten = null;
    this.nagelplattenTyp = null;
    if(this.sprache == 'de') {
      this.spracheID = '0'
    } else {
      this.spracheID = '1'
    }
  }



  ngOnInit() {
    this.ns.getRabatt(this.sprache).subscribe((res: any) => this.rabatte = res[0].nagelplatten);
    this.getAnrede(this.sprache);
    this.loadLaenderliste();
  }


getAnrede(sprache) {
  this.ns.getAnrede(sprache).subscribe(data => this.anreden = data);
  //this.getArticelTyp(0);
}

  getArticelTyp(typ: number) {
    if (this.open == true) {
      this.nagelplatten = this.nagelplattenTyp;
    } else {
      this.ns.getAllArticel().subscribe(data => this.nagelplattenTyp = data);
      this.open = true;
    }
    this.nagelplatten = this.nagelplatten.filter(t => t.FKArtikelgruppeID == typ);
    
  }

  loadLaenderliste() {
    this.ns.getLaenderliste(this.sprache).subscribe((land: Laenderliste[]) => {
      this.land = land;
    });
  }

  addToCart(stk, index, artnr, typ: string) {
    this.nagelplatten[index].Stk = stk;
    this.nagelplatten[index].Typ = typ;
    var preis = this.nagelplatten[index].Preis * this.nagelplatten[index].Stk;

    this.nagelplatten[index].Gesamt = Math.round(preis * 100) / 100;
    for (let i = 0; i < this.nagelplatten.length; i++) {
      if (this.nagelplatten[i].PKArtikelID == artnr) {
        for (let a = 0; a < this.warenkorb.length; a++) {
          if (this.warenkorb[a].Stk == stk && this.warenkorb[a].PKArtikelID == artnr) {
           // this.warenkorb.splice(a, 1);
           this.calcSumme();
           this.calczwischensumme();
           this.checkBasket();
           return;
          }
        }
        this.warenkorb.push(this.nagelplatten[i]);
        this.checkBasket();
      }
    }
    this.calcSumme();
    this.calczwischensumme();
  }

  checkBasket() {
    for(let i = 0; i < this.warenkorb.length; i++) {
      if(this.warenkorb[i].Gesamt == 0) {
        this.warenkorb.splice(i, 1);
      }
    }
  }

  deleteEntry(index, artnr) {
    for (let i = 0; i < this.warenkorb.length; i++) {
      if (this.warenkorb[i].PKArtikelID == artnr) {
        for (let a = 0; a < this.nagelplattenTyp.length; a++) {
          if (this.nagelplattenTyp[a].PKArtikelID == artnr) {
           this.nagelplattenTyp[a].Stk = null;
          }
        }

      }
    }
    this.warenkorb.splice(index, 1);
    this.calcSumme();
    this.calczwischensumme();
  }


  calcSumme() {
    var basketSumme = 0;
    var basketGewicht = 0;
    for (let s of this.warenkorb) {
      basketSumme = basketSumme + s.Gesamt;
      basketGewicht = basketGewicht + s.Gewicht * s.Stk
    }
    this.basketGewicht = basketGewicht;
    this.basketSumme = basketSumme;
  }


  calczwischensumme() {
    var basketRabatt = null;
    this.basketZwischenSumme = null;
    this.basketZwischenSummeRabatt = null;
    for (let i = 0; i < this.rabatte.length; i++) {
      if (this.basketGewicht > this.rabatte[i].kg) {
        basketRabatt = this.basketZwischenSumme = (this.basketSumme);
        this.basketRabattProzent = this.rabatte[i].rabatt;
        this.basketRabattAbKG = this.rabatte[i].kg;
        this.basketTransport = this.rabatte[i].fracht;
        var zw = (this.basketSumme / 100 * this.rabatte[i].rabatt);
        this.basketZwischenSummeRabatt = Math.round(zw * 100) / 100;
      }
      this.basketSummeGesamt = (this.basketSumme - this.basketZwischenSummeRabatt);
      if(this.basketSummeGesamt > 0) {
        this.showBasketSumme = true;
      } else {
        this.showBasketSumme = false;
      }
      
    }

    if (this.basketGewicht > 1000) {
      this.basketSumme = 0;
      this.showBasketZwischensumme = true;
    } else {
      this.showBasketZwischensumme = false;
      this.basketZwischenSummeRabatt = null;
    }
  }

  saveBestellung() {
    this.bestellung.npBestellungKopfID = this.bestellID;
    this.bestellungDetail.FKNpBestellungKopfID = this.bestellID;
    this.bestellung.sprache = this.sprache;
    if(this.bestellung.Bemerkung == "") {
      this.bestellung.Bemerkung = null;
    } else {
      this.bestellung.Bemerkung = "'"+ this.bestellung.Bemerkung +"'";
    }
    if(this.bestellung.Liefertermin == "") {
      this.bestellung.Liefertermin = null;
    } else {
      this.bestellung.Liefertermin = "'"+ this.bestellung.Liefertermin +"'";
    }
    if(this.bestellung.Anrede == "") {
      this.bestellung.Anrede = null;
    } else {
      this.bestellung.Anrede = "'"+ this.bestellung.Anrede +"'";
    }
    if(this.bestellung.Telefon == "") {
      this.bestellung.Telefon = null;
    } else {
      this.bestellung.Telefon = "'"+ this.bestellung.Telefon +"'";
    }
    if(this.bestellung.Strasse == "") {
      this.bestellung.Strasse = null;
    } else {
      this.bestellung.Strasse = "'"+ this.bestellung.Strasse +"'";
    }

    if (this.basketZwischenSumme == null) {
      this.bestellung.ZwischenSumme = null;
      this.bestellung.Rabatt = null;
      this.bestellung.RabattSumme = null;
      this.bestellung.GesamtSumme = this.basketSummeGesamt;
    } else {
      this.bestellung.ZwischenSumme = this.basketZwischenSumme;
      this.bestellung.Rabatt = this.basketRabattProzent;
      this.bestellung.RabattSumme = this.basketZwischenSummeRabatt;
    }

    if (this.basketSumme == null) {
      this.bestellung.GesamtSumme = this.basketSummeGesamt;
    } else {
      this.bestellung.GesamtSumme = this.basketSummeGesamt;
      this.bestellung.GesamtGewicht = this.basketGewicht;
    }

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
    for (let i = 0; i < this.warenkorb.length; i++) {
      this.bestellungDetail.Gewicht = this.warenkorb[i].Gewicht;
      this.bestellungDetail.BestellMenge = this.warenkorb[i].Stk;
      this.bestellungDetail.PKArtikelID = this.warenkorb[i].PKArtikelID;
      this.bestellungDetail.Typ = this.warenkorb[i].Typ;
      this.bestellungDetail.Breite = this.warenkorb[i].Breite;
      this.bestellungDetail.Laenge = this.warenkorb[i].Laenge;
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
    this.bestellung.sprache = this.sprache;
    this.saveBestellung();
  }


  clearAll() {
    window.location.href = "/" + this.sprache;
  }

  toAncher(el) {
    el.scrollIntoView();
  }
}
