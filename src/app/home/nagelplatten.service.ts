import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Nagelplatten, Rabatt } from '../shared/index';
import { databaseProvider } from '../shared/databaseProvider/databaseProvider';

@Injectable()
export class NagelplattenService {
 
    constructor(private httpClient: HttpClient, private db: databaseProvider) { }


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

  makeBestellung(): void {
    const body = this.db.makeBestellung();
    this.httpClient.post(environment.apiUrlWrite, body)
    .subscribe(() => console.log("Bestellung eingetragen"),
  err => console.log(err));
  }
}
