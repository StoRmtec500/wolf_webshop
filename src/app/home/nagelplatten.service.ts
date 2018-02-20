import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Nagelplatten } from '../shared/index';

@Injectable()
export class NagelplattenService {

  constructor(private httpClient: HttpClient) { }


  getNagelplatten(typ:string): Observable<Nagelplatten[]> {
    var h = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let sqlstring = encodeURIComponent(typ);
    let string = '{"Befehl": "' + sqlstring + '","Datenbank": "DBScharnsteinTest", "Login": "martin.kuenz", "Passwort": "xqojUKt9>", "PKMitarbeiterID": "2640"}';
    return this.httpClient.post<Nagelplatten[]>(environment.apiUrl, string, {headers: h});
  }

  getNagelplattenDetail(id: number): Observable<Nagelplatten[]> {
    return this.httpClient.get<Nagelplatten[]> ( environment.apiUrl + 'getNagelplattenDetail/' + id);
  }

}
