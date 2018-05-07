import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from 'rxjs';

@Injectable({
    providedIn: "root"
})
export class SelectService {
    headers = new HttpHeaders({'Content-Type':'application/json'});

  constructor( private http: HttpClient) {

  }

  getResultados(url, parametros){
      let urlParams = this.paramns(parametros, new HttpParams());


      return this.http.get(url,{headers:this.headers, params : urlParams});
  }


    paramns(a , urlParams: HttpParams){
        for ( let prefix in a ) {
            urlParams = this.buildParams( prefix, a[ prefix ], urlParams );
        }

        return urlParams;
    }

    buildParams( prefix, obj,  urlParams ){
        if(obj instanceof Array){

            for(let i in obj) {

                urlParams = this.buildParams( prefix + "[" + ( typeof obj[i] === "object" || Array.isArray(obj[i]) ? i : "" ) + "]", obj[i], urlParams );
            }
            return urlParams;
        }else if(obj instanceof Object){
            for ( let name in obj ) {
                if(obj[ name ] instanceof Date){
                    obj[ name ] = JSON.stringify(obj[ name ]);
                }
                urlParams = this.buildParams( prefix + "[" + name + "]", obj[ name ], urlParams );
            }
            return urlParams;
        }else{
            if(obj !== null && obj !== undefined) {
                urlParams = urlParams.append(prefix, obj);
            }
            return urlParams;
        }
    }




}
