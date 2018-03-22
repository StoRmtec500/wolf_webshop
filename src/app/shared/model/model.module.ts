export class Nagelplatten {
  PKArtikelID: number;
  Gewicht: number;
  ME: number;
  Preis: number;
  Stk: number;
  Gesamt: number;
  Typ: string;
  Laenge: number;
  Breite: number;
  FKArtikelgruppeID;
}

export class Rabatt {
  kg: number;
  rabatt: number;
  fracht: string;
}

export class Anrede {
  value;
  viewValue;
}

export class Laenderliste {
  Land;
  Kuerzel;
}

export class ID {
  akt_nr: number;
}

export class BestellungKopf {
  npBestellungKopfID: number;
  Anrede:string = '';
  Name: string = '';
  Vorname: string  = '';
  Firma: string  = '';
  eMail: string  = '';
  Strasse = '';
  Plz: number;
  Ort: string  = '';
  Land: string = '';
  Telefon: string = '';
  Bemerkung: string = '';
  Liefertermin: string = '';
  ZwischenSumme = 0;
  Rabatt = 0;
  RabattSumme = 0;
  GesamtSumme  = 0;
  GesamtGewicht = 0;
  sprache: string = '';
}


export class BestellungKopfDetail {
  FKNpBestellungKopfID: number;
  BestellMenge: number;
  BestellEinheit: string;
  PKArtikelID: number;
  Typ: string;
  Laenge: number;
  Breite: number;
  Gewicht: number;
  MengenEinheit: number;
  PreisMenge: number;
  PreisGesamt: number;
}
