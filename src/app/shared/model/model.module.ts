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

export class Rabatt {
  kg: number;
  rabatt: number;
  fracht: string;
}

export class ID {
  akt_nr: number;
}

export class BestellungKopf {
  PKNpBestellungKopfID: number;
  Anrede:string = '';
  Name: string = '';
  Vorname: string  = '';
  Firma: string  = '';
  eMail: string  = '';
  Strasse = '';
  Plz: number;
  Ort: string  = '';
  Land: string  = '';
  Telefon: string = '';
  Bemerkung: string = '';
  Liefertermin: string = '';
  ZwischenSumme = 0;
  Rabatt = 0;
  RabattSumme = 0;
  GesamtSumme  = 0;
  GesamtGewicht = 0;
}


export class BestellungKopfDetail {
  FKNpBestellungKopfID: number;
  BestellMenge: number;
  BestellEinheit: string;
  PKArtikelID: number;
  Typ: string;
  Groesse: string;
  Gewicht: number;
  MengenEinheit: number;
  PreisMenge: number;
  PreisGesamt: number;
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

}
