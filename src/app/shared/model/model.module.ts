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

  constructor(artikel,stueck, gesamt){
    this.PKArtikelID = artikel;
    this.Stk = stueck;
    this.Gesamt = gesamt;
  }
}
