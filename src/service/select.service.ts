import {Injectable} from '@angular/core';
import {Http, Headers, URLSearchParams} from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class SelectService {
  headers = new Headers({'Content-Type':'application/json'});

  constructor( private http: Http) {

  }

  getResultados(url, parametros){
    let informar  = new URLSearchParams();

    if (parametros) {
      for (let parametro in parametros) {
        informar.set(parametro, parametros[parametro]);
      }
      // informar.set('asdasdas', [1,2,3,4].toString());
    }

    return this.http
               .get(url,{headers:this.headers, search : informar})
               .map(res=>res.json())
  }

}
