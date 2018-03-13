import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Nagelplatten, Rabatt, BestellungKopf, Warenkorb, ID, BestellungKopfDetail, Laenderliste } from '../index';
import { databaseProvider } from '../databaseProvider/databaseProvider';
import { environment } from '../../../environments/environment';

@Injectable()
export class NagelplattenService {
 
    constructor(private httpClient: HttpClient, private db: databaseProvider) { }


    public options = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'text/javascript'
      })
    };

  getNagelplatten(typ:number): Observable<Nagelplatten[]> {

    const body = this.db.artikelSelect(typ);
    return this.httpClient.post<Nagelplatten[]>(environment.apiUrlRead, body);
  }

  getNagelplattenDetail(id: number): Observable<Nagelplatten[]> {
    return this.httpClient.get<Nagelplatten[]> ( environment.apiUrlRead + 'getNagelplattenDetail/' + id);
  }

  getRabatt() : Promise<Rabatt[]> {
    return this.httpClient.get<Rabatt[]>('assets/rabatte.json').toPromise();
  }

  getLaenderliste() : Observable<Laenderliste[]> {
    return this.httpClient.get<Laenderliste[]>('assets/land.json');
  }

  getBestellungKopfID() : Observable<ID>{
    const body = this.db.getID();
    return this.httpClient.post<ID>(environment.apiUrlRead, body);
  }

  makeBestellung(bestellungKopf:BestellungKopf): Observable<BestellungKopf> {
  const body = this.db.makeOrderKopf(bestellungKopf);
  return this.httpClient.post<BestellungKopf>(environment.apiUrlWrite, body);
  }

  makeBestellungDetails(bestellungKopfDetail: BestellungKopfDetail): Observable<BestellungKopfDetail> {
    const body = this.db.makeOrderDetails(bestellungKopfDetail);
    return this.httpClient.post<BestellungKopfDetail>(environment.apiUrlWrite, body);
  }
}
