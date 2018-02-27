import { NagelplattenService } from './nagelplatten.service';
import { Component, OnInit } from '@angular/core';
import { Nagelplatten } from '../shared/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  headertitle = 'Bestellung Nagelplatten';
  nagelplatten: Nagelplatten[];
  details = '';
  display = 'none';

   constructor(private ns: NagelplattenService, private router: Router) {
  }

  ngOnInit() {
  }

  getNagelplattenWithTyp(typ: number) {
      this.nagelplatten = null;
      this.ns.getNagelplatten(typ).subscribe(data => this.nagelplatten = data);
  }

  showDetails(id) {
    this.details = id;
    console.log(id);
   // this.router.navigate(['/basket/' + id]);
  }
}
