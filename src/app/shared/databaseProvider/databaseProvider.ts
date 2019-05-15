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

    public allArtikelSelect() {
      return {
      Befehl: encodeURIComponent(
        `SELECT  a.PKArtikelID, a.Laenge, a.Breite, a.FKArtikelgruppeID, a.Gewicht * ISNULL(aeu.Formel, 1) AS Gewicht,ISNULL(aeu.Formel, 1) AS ME,ROUND(av.Verkaufspreis / av.PreisPro , 6) * ISNULL(aeu.Formel, 1) AS Preis
        FROM    PELokal.dbo.viewArtikel a
            LEFT OUTER JOIN PEKonzern.dbo.artikelEinheitUmrechnung aeu ON aeu.FKArtikelID = a.PKArtikelID AND aeu.FKMandantID = 3 AND aeu.FKMengeneinheit2ID = 7
            LEFT OUTER JOIN PEKonzern.dbo.artikelVerkaufspreis av ON av.FKArtikelID = a.PKArtikelID AND av.FKMandantID = 3 AND av.FKPreislisteID = 1 AND av.GueltigVon <= CONVERT(DATE, GETDATE()) AND av.GueltigBis >= CONVERT(DATE, GETDATE())
        WHERE   a.FKArtikelgruppeID IN (4941,4942,4949,4961,4945,4946,4948,4966) AND a.GueltigVon <= CONVERT(DATE, GETDATE()) AND a.GueltigBis >= CONVERT(DATE, GETDATE())
        ORDER BY a.Breite, a.Laenge`),
      Datenbank: this.databaseName,
      Login: this.userName,
      Passwort: this.userPassword,
      PKMitarbeiterID: this.pkEmployeeId
      }
    }

    public metalWebs() {
      return {
        Befehl: encodeURIComponent(
          `SELECT a.PKArtikelID,a.Laenge, a.Breite ,SUBSTRING(a.Bezeichnung1,12,6) AS Typ, a.Gewicht AS Gewicht, av.PreisPro AS ME, av.Verkaufspreis AS Preis
          FROM PELokal.dbo.viewArtikel a
          LEFT OUTER JOIN PEKonzern.dbo.artikelVerkaufspreis av ON av.FKArtikelID = a.PKArtikelID AND av.FKMandantID = 3 AND av.FKPreislisteID = 1 AND av.GueltigVon <= CONVERT(DATE, GETDATE()) AND av.GueltigBis >= CONVERT(DATE, GETDATE())
          WHERE a.FKArtikelgruppeID = 4964 AND a.GueltigVon <= CONVERT(DATE, GETDATE()) AND a.GueltigBis >= CONVERT(DATE, GETDATE())
          ORDER BY a.Bezeichnung1`),
        Datenbank: this.databaseName,
        Login: this.userName,
        Passwort: this.userPassword,
        PKMitarbeiterID: this.pkEmployeeId
      }
    }

    public binderwinkel() {
      return {
        Befehl: encodeURIComponent(
          `SELECT  a.PKArtikelID, a.Laenge, a.Breite, SUBSTRING(a.Bezeichnung1,5,50) AS Typ, a.Gewicht * ISNULL(aeu.Formel, 1) AS Gewicht,ISNULL(aeu.Formel, 1) AS ME,ROUND(av.Verkaufspreis / av.PreisPro , 6) * ISNULL(aeu.Formel, 1) AS Preis
          FROM PELokal.dbo.viewArtikel a
              LEFT OUTER JOIN PEKonzern.dbo.artikelEinheitUmrechnung aeu ON aeu.FKArtikelID = a.PKArtikelID AND aeu.FKMandantID = 3 AND aeu.FKMengeneinheit2ID = 7
              LEFT OUTER JOIN PEKonzern.dbo.artikelVerkaufspreis av ON av.FKArtikelID = a.PKArtikelID AND av.FKMandantID = 3 AND av.FKPreislisteID = 1 AND av.GueltigVon <= CONVERT(DATE, GETDATE()) AND av.GueltigBis >= CONVERT(DATE, GETDATE())
          WHERE   a.FKArtikelgruppeID = 4965 AND a.GueltigVon <= CONVERT(DATE, GETDATE()) AND a.GueltigBis >= CONVERT(DATE, GETDATE())
          ORDER BY a.Breite, a.Laenge`),
        Datenbank: this.databaseName,
        Login: this.userName,
        Passwort: this.userPassword,
        PKMitarbeiterID: this.pkEmployeeId
      }
    }

/* Nagelplattentypen werden aus der DB gelesen */
    public typenSelect() {
      return {
        Befehl: encodeURIComponent(
          `SELECT  nst.npShopTypID,
          nst.art,
          nst.blechdicke,
          nst.zulassungsnummer,
          nst.artikelgruppeID,
          nstp.preisKg,
          nstp.preisM2
  FROM    PESchnittstelle.dbo.npShopTyp nst
          LEFT OUTER JOIN PESchnittstelle.dbo.npShopTypPreis nstp ON nstp.npShopTypID = nst.npShopTypID AND nstp.GueltigVon <= CONVERT(DATE, GETDATE()) AND nstp.GueltigBis >= CONVERT(DATE, GETDATE())
  WHERE   nst.gueltigVon <= CONVERT(DATE, GETDATE()) AND  nst.gueltigBis >= CONVERT(DATE, GETDATE())
  ORDER BY nst.sortierung`),
        Datenbank: this.databaseName,
        Login: this.userName,
        Passwort: this.userPassword,
        PKMitarbeiterID: this.pkEmployeeId
      }
    }
/* Nagelplattentypen ENDE*/

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
        `INSERT INTO PESchnittstelle.dbo.npBestellungKopf ( npBestellungKopfID ,Anrede ,Name ,Vorname ,Firma ,Strasse ,Plz ,Ort , Land ,eMail ,Telefon ,Bemerkung ,Liefertermin ,ZwischenSumme ,Rabatt ,RabattSumme ,GesamtSumme ,GesamtGewicht ,erfdatum, sprache )
        VALUES ( `+bestellungKopf.npBestellungKopfID+` ,`+bestellungKopf.Anrede+`,'`+bestellungKopf.Name+`' ,'`+bestellungKopf.Vorname+`' , '`+bestellungKopf.Firma+`' ,`+bestellungKopf.Strasse+` , `+bestellungKopf.Plz+` ,'`+bestellungKopf.Ort+`' ,'`+bestellungKopf.Land+`',
        '`+bestellungKopf.eMail+`' ,`+bestellungKopf.Telefon+` ,`+bestellungKopf.Bemerkung+` ,`+bestellungKopf.Liefertermin+`,`+bestellungKopf.ZwischenSumme+` ,`+bestellungKopf.Rabatt+` ,`+bestellungKopf.RabattSumme+`, `+bestellungKopf.GesamtSumme+`, `+bestellungKopf.GesamtGewicht+` ,GETDATE(),'`+bestellungKopf.sprache+`')`
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
          `INSERT INTO PESchnittstelle.dbo.npBestellungKopfDetail ( npBestellungKopfID ,BestellMenge ,ArtNr ,Typ ,Laenge, Breite ,Gewicht , MengenEinheit ,PreisMenge ,PreisGesamt, sortierung )
          VALUES (`+bestellungKopfDetail.FKNpBestellungKopfID+` ,`+bestellungKopfDetail.BestellMenge+`, `+bestellungKopfDetail.PKArtikelID+` ,'`+bestellungKopfDetail.Typ+`' ,'`+bestellungKopfDetail.Laenge+`','`+bestellungKopfDetail.Breite+`' ,`+bestellungKopfDetail.Gewicht+` ,`+bestellungKopfDetail.MengenEinheit+` ,`+bestellungKopfDetail.PreisMenge+` ,`+bestellungKopfDetail.PreisGesamt+`,`+bestellungKopfDetail.Sortierung+`)`
        ),
        Datenbank: this.databaseName,
        Login: this.userName,
        Passwort: this.userPassword,
        PKMitarbeiterID: this.pkEmployeeId
      }
    }
/* BestelldatenDetails ENDE */
}
