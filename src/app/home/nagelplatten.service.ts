import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Nagelplatten, Rabatt, Kundendaten } from '../shared/index';
import { databaseProvider } from '../shared/databaseProvider/databaseProvider';

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
    //let sqlstring = encodeURIComponent(typ);
    const body = this.db.artikelSelect(typ);
    return this.httpClient.post<Nagelplatten[]>(environment.apiUrlRead, body);
  }

  getNagelplattenDetail(id: number): Observable<Nagelplatten[]> {
    return this.httpClient.get<Nagelplatten[]> ( environment.apiUrlRead + 'getNagelplattenDetail/' + id);
  }

  getRabatt() : Promise<Rabatt[]> {
    return this.httpClient.get<Rabatt[]>('assets/rabatte.json').toPromise();
  }

  makeBestellung(kundenDaten:Kundendaten): Observable<Kundendaten> {
  const body = this.db.makeOrderInDb(kundenDaten);
  return this.httpClient.post<Kundendaten>(environment.apiUrlWrite, body);
  }
}
