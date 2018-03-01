export class Nagelplatten {
  PKArtikelID: number;
  Gewicht: number;
  ME: number;
  Preis: number;
  Groesse: string;
  Stk: number;
}

export class Warenkorb {
  PKArtikelID: number;
  Stk: number;

  constructor(artikel,stueck){
    this.PKArtikelID = artikel;
    this.Stk = stueck;
  }
}
