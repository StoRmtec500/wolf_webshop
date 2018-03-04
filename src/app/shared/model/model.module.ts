export class Nagelplatten {
  PKArtikelID: number;
  Gewicht: number;
  ME: number;
  Preis: number;
  Groesse: string;
  Stk: number;
  Gesamt: number;
}

export class Warenkorb {
  PKArtikelID: number;
  Stk: number;
  Gesamt: number;
  Gewicht: number;
  ME: number;
  Groesse: string;
  Preis: number;

  constructor(artikel,stueck, gesamt, gewicht, groesse, me, preis){
    this.PKArtikelID = artikel;
    this.Stk = stueck;
    this.Gesamt = gesamt;
    this.Gewicht = gewicht;
    this.Groesse = groesse;
    this.ME = me;
    this.Preis = preis;
  }
}

export class Rabatt {
  kg: number;
  rabatt: number;
}
