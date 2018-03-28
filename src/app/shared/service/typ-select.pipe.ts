import { Pipe, PipeTransform } from '@angular/core';

import { Typen } from '../../shared/index';

@Pipe({
  name: 'typSelect'
})
export class TypSelectPipe implements PipeTransform {

  transform(typen: Typen[], filter: Object): any {
    if(!typen || !filter) {
      return typen;
    }
    return typen.filter(t => t.art == filter);
  }

}
