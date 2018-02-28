export class Nagelplatten {
  PKArtikelID: number;
  Gewicht: number;
  ME: number;
  Preis: number;
  Groesse: string;
}

export class Warenkorb {
  PKartikelID: number;
  Menge: number;

  constructor(artikel,stueck){
    this.PKartikelID = artikel;
    this.Menge = stueck;
  }
}
