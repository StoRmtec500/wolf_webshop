import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class databaseProvider {

    private databaseName = environment.dataBase;
    private userName = environment.dbUsername;
    private userPassword = environment.dbPassword;
    private pkEmployeeId = environment.dbMitarbeiterID;

    public options = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'text/javascript'
      })
    };

    constructor(private httpClient: HttpClient) { }

    public createCommand(sqlString: string) {
        return {
          Befehl: sqlString,
          Datenbank: this.databaseName,
          Login: this.userName,
          Passwort: this.userPassword,
          PKMitarbeiterID: this.pkEmployeeId
        };
      }

    public artikelSelect(artikelGruppeID: number) {
      return {
        Befehl: encodeURIComponent(
          'SELECT a.PKArtikelID,SUBSTRING(a.Bezeichnung1, 17, 7) AS Groesse,a.Gewicht * ISNULL(aeu.Formel, 1) AS Gewicht,ISNULL(aeu.Formel, 1) AS ME,ROUND(av.Verkaufspreis / av.PreisPro * ISNULL(aeu.Formel, 1), 4) AS Preis '+
          'FROM dbo.viewArtikel a '+
          'LEFT OUTER JOIN PEKonzern.dbo.artikelEinheitUmrechnung aeu ON aeu.FKArtikelID = a.PKArtikelID AND aeu.FKMandantID = 3 AND aeu.FKMengeneinheit2ID = 7 '+
          'LEFT OUTER JOIN PEKonzern.dbo.artikelVerkaufspreis av ON av.FKArtikelID = a.PKArtikelID AND av.FKMandantID = 3 AND av.FKPreislisteID = 1 AND av.GueltigVon <= CONVERT(DATE, GETDATE()) AND av.GueltigBis >= CONVERT(DATE, GETDATE()) '+
          'WHERE a.FKArtikelgruppeID = '+ artikelGruppeID +' AND a.GueltigVon <= CONVERT(DATE, GETDATE()) AND a.GueltigBis >= CONVERT(DATE, GETDATE()) '+
          'ORDER BY a.Bezeichnung1'),
        Datenbank: this.databaseName,
        Login: this.userName,
        Passwort: this.userPassword,
        PKMitarbeiterID: this.pkEmployeeId
      }
    }  

}