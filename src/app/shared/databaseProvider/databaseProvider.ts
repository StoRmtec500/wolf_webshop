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

    public artikelSelect(artikelGruppeID: number) {
      return {
        Befehl: encodeURIComponent(
          `SELECT a.PKArtikelID,SUBSTRING(a.Bezeichnung1, 17, 7) AS Groesse,a.Gewicht * ISNULL(aeu.Formel, 1) AS Gewicht,ISNULL(aeu.Formel, 1) AS ME,ROUND(av.Verkaufspreis / av.PreisPro * ISNULL(aeu.Formel, 1), 4) AS Preis
          FROM dbo.viewArtikel a
          LEFT OUTER JOIN PEKonzern.dbo.artikelEinheitUmrechnung aeu ON aeu.FKArtikelID = a.PKArtikelID AND aeu.FKMandantID = 3 AND aeu.FKMengeneinheit2ID = 7
          LEFT OUTER JOIN PEKonzern.dbo.artikelVerkaufspreis av ON av.FKArtikelID = a.PKArtikelID AND av.FKMandantID = 3 AND av.FKPreislisteID = 1 AND av.GueltigVon <= CONVERT(DATE, GETDATE()) AND av.GueltigBis >= CONVERT(DATE, GETDATE())
          WHERE a.FKArtikelgruppeID = `+ artikelGruppeID +` AND a.GueltigVon <= CONVERT(DATE, GETDATE()) AND a.GueltigBis >= CONVERT(DATE, GETDATE())
          ORDER BY a.Bezeichnung1`),
        Datenbank: this.databaseName,
        Login: this.userName,
        Passwort: this.userPassword,
        PKMitarbeiterID: this.pkEmployeeId
      }
    }  
/* */

/* BestellungKopfID auslesen */
    public getID() {
      return {
        Befehl: encodeURIComponent(
          `DECLARE @outNummer INT;
          EXEC PELokal.dbo.spNeueNummer @typ = 'NPBestellung',
               @datum = '2018-03-06 08:20:35',
               @outNummer = @outNummer OUTPUT;`),
        Datenbank: this.databaseName,
        Login: this.userName,
        Passwort: this.userPassword,
        PKMitarbeiterID: this.pkEmployeeId
      }
    }
/* BestellungKopfID ENDE*/

/* BestelldatenKopf in Datenbank schreiben */
    public makeOrderKopf(bestellungKopf) {
      return {
        Befehl: encodeURIComponent(
        `INSERT INTO PESchnittstelle.dbo.npBestellungKopf ( PKNpBestellungKopfID ,Anrede ,Name ,Vorname ,Firma ,Strasse ,Plz ,Ort , Land ,eMail ,Telefon ,Bemerkung ,Liefertermin ,ZwischenSumme ,Rabatt ,RabattSumme ,GesamtSumme ,GesamtGewicht ,erfdatum )
        VALUES ( `+bestellungKopf.PKNpBestellungKopfID+` ,'`+bestellungKopf.Anrede+`','`+bestellungKopf.Name+`' ,'`+bestellungKopf.Vorname+`' , '`+bestellungKopf.Firma+`' ,'`+bestellungKopf.Strasse+`' , `+bestellungKopf.Plz+` ,'`+bestellungKopf.Ort+`' ,'`+bestellungKopf.Land+`',
        '`+bestellungKopf.eMail+`' ,'`+bestellungKopf.Telefon+`' ,'`+bestellungKopf.Bemerkung+`' ,'`+bestellungKopf.Liefertermin+`','`+bestellungKopf.ZwischenSumme+`' ,`+bestellungKopf.Rabatt+` ,`+bestellungKopf.RabattSumme+`, `+bestellungKopf.GesamtSumme+`, `+bestellungKopf.GesamtGewicht+` ,GETDATE())`
        ),
        Datenbank: this.databaseName,
        Login: this.userName,
        Passwort: this.userPassword,
        PKMitarbeiterID: this.pkEmployeeId
      }
    }
/* BestelldatenKopf ENDE*/


/* BestelldatenDetails in Datenbank schreiben*/
    public makeOrderDetails(bestellungKopfDetail) {
      return {
        Befehl: encodeURIComponent(
          `INSERT INTO PESchnittstelle.dbo.npBestellungKopfDetail ( FKNpBestellungKopfID ,BestellMenge ,BestellEinheit ,ArtNr ,Typ ,Groesse ,Gewicht , MengenEinheit ,PreisMenge ,PreisGesamt )
          VALUES (`+bestellungKopfDetail.FKNpBestellungKopfID+` ,0 ,'' , 0 ,'' ,'' ,NULL ,0 ,NULL ,NULL)`
        ),
        Datenbank: this.databaseName,
        Login: this.userName,
        Passwort: this.userPassword,
        PKMitarbeiterID: this.pkEmployeeId
      }
    }
/* BestelldatenDetails ENDE */
}