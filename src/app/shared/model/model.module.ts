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
  Anrede: string = "NULL";
  Name: string;
  Vorname: string;
  Firma: string;
  eMail: string;
  Strasse: string;
  Plz: number;
  Ort: string;
  Land: string;
  Telefon: string;
  Bemerkung: string = "NULL";
  Liefertermin: string = "NULL";
  ZwischenSumme: number = 0;
  Rabatt: number = 0;
  RabattSumme: number = 0;
  GesamtSumme: number = 0;
  GesamtGewicht: number = 0;
}


export class BestellungKopfDetail {
  PKNpBestellungKopfDetailID: number;
  FKNpBestellungKopfID: number;
  BestellMenge: number;
  BestellEinheit: string;
  ArtNr: number;
  Typ: string;
  Groesse: string;
  Gewicht: number;
  MengenEinheit: number;
  PreisMenge: number;
  PreisGesamt: number;
}
