export class Nagelplatten {
  PKArtikelID: number;
  Gewicht: number;
  ME: number;
  Preis: number;
  Groesse: string;
  Stk: number;
  Gesamt: number;
  Typ: string;
}

export class Warenkorb {
  PKArtikelID: number;
  Stk: number;
  Gesamt: number;
  Gewicht: number;
  ME: number;
  Groesse: string;
  Preis: number;
  Typ: string;

  constructor(artikel,stueck, gesamt, gewicht, groesse, me, preis, typ){
    this.PKArtikelID = artikel;
    this.Stk = stueck;
    this.Gesamt = gesamt;
    this.Gewicht = gewicht;
    this.Groesse = groesse;
    this.ME = me;
    this.Preis = preis;
    this.Typ = typ;
  }
}

export class Rabatt {
  kg: number;
  rabatt: number;
  fracht: string;
}
