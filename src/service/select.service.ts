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
    this.paramns(parametros, informar);

    return this.http
               .get(url,{headers:this.headers, search : informar})
               .map(res=>res.json())
  }

  paramns(a , urlParams){
    for ( let prefix in a ) {
      this.buildParams( prefix, a[ prefix ], urlParams );
    }
  }

  buildParams( prefix, obj,  urlParams ){
    if(obj instanceof Array){
      for(let i in obj) {
        this.buildParams( prefix + "[" + ( typeof obj[i] === "object" || Array.isArray(obj[i]) ? i : "" ) + "]", obj[i], urlParams );
      }

    }else if(obj instanceof Object){
      for ( let name in obj ) {
        if(obj[ name ] instanceof Date){
          obj[ name ] = JSON.stringify(obj[ name ]);
        }
        this.buildParams( prefix + "[" + name + "]", obj[ name ], urlParams );
      }
    }else{

      urlParams.append(prefix, obj);
    }
  }




}
