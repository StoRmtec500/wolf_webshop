import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Nagelplatten, Rabatt, BestellungKopf, ID, BestellungKopfDetail, Laenderliste, Typen } from '../index';
import { databaseProvider } from '../databaseProvider/databaseProvider';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class NagelplattenService {
 
    constructor(private httpClient: HttpClient, private db: databaseProvider) { }


    public options = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'text/javascript'
      })
    };

  getAllArticel(): Observable<Nagelplatten[]> {
    const body = this.db.allArtikelSelect();
    return this.httpClient.post<Nagelplatten[]>(environment.apiUrlRead, body);
  }

  getMetalWebs(): Observable<Nagelplatten[]> {
    const body = this.db.metalWebs();
    return this.httpClient.post<Nagelplatten[]>(environment.apiUrlRead, body);
  }

  getBinderwinkel(): Observable<Nagelplatten[]> {
    const body = this.db.binderwinkel();
    return this.httpClient.post<Nagelplatten[]>(environment.apiUrlRead, body);
  }

  getTypenSelect(): Observable<Typen[]> {
    const body = this.db.typenSelect();
    return this.httpClient.post<Typen[]>(environment.apiUrlRead, body);
  }

  getNagelplattenDetail(id: number): Observable<Nagelplatten[]> {
    return this.httpClient.get<Nagelplatten[]> ( environment.apiUrlRead + 'getNagelplattenDetail/' + id);
  }

  getRabatt(sprache) : Observable<any> {
    return this.httpClient.get('assets/rabatte_'+sprache+'.json');
  }

  getAnrede(sprache) : Observable<any> {
    return this.httpClient.get('assets/anrede_'+sprache+'.json');
  }

  getLaenderliste(sprache) : Observable<Laenderliste[]> {
    return this.httpClient.get<Laenderliste[]>('assets/land_'+sprache+'.json');
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
