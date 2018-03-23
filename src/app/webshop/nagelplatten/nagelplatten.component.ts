import { Component, ViewChild, OnInit, Input, Injector, LOCALE_ID } from '@angular/core';
import { Nagelplatten, Rabatt, BestellungKopf, ID, BestellungKopfDetail, Laenderliste, Anrede } from '../../shared/index';
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
  bestellungKopfID: ID[];
  details = '';
  showBasket = true; showBasketZwischensumme = false;
  basketSumme; basketGewicht; public basketZwischenSumme; public basketZwischenSummeRabatt;
  basketRabattProzent; basketRabattAbKG; basketTransport; Gesamt; basketSummeGesamt;
  bookName: String;
  isValid = true;
  error = false;
  open = false;
  errorMsg;
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
    this.ns.getAllArticel().subscribe(data => this.nagelplattenTyp = data);
    this.nagelplatten = this.nagelplattenTyp;
    this.getArticelTyp(0);
    this.Math = Math;
    this.sprache = this.injector.get(LOCALE_ID);
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
        for (let i = 0; i < this.warenkorb.length; i++) {
          if (this.warenkorb[i].Stk == stk && this.warenkorb[i].PKArtikelID == artnr) {
            this.warenkorb.splice(i, 1);
          }

        }
        this.warenkorb.push(this.nagelplatten[i]);
      }
    }
    this.showBasket = true;
    this.calcSumme();
    this.calczwischensumme();
  }

  deleteEntry(index) {
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
    if (basketSumme == 0) {
      this.showBasket = false;
    }
    this.basketGewicht = basketGewicht;
    this.basketSumme = basketSumme;
  }


  calczwischensumme() {
    var basketRabatt = 0;
    this.basketZwischenSummeRabatt = 0;
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
    }

    if (this.basketGewicht > 1000) {
      this.basketSumme = 0;
      this.showBasketZwischensumme = true;
    } else {
      this.showBasketZwischensumme = false;
      this.basketZwischenSummeRabatt = 0;
    }
  }

  saveBestellung() {
    this.bestellung.npBestellungKopfID = this.bestellID;
    this.bestellungDetail.FKNpBestellungKopfID = this.bestellID;
    this.bestellung.sprache = this.sprache;

    if (this.basketZwischenSumme == null) {
      this.bestellung.ZwischenSumme = 0;
      this.bestellung.Rabatt = 0;
      this.bestellung.RabattSumme = 0;
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
    window.location.href = "/onlineshopNP/" + this.sprache;
  }

  scroll(el) {
    el.scrollIntoView();
  }
}
