import { Http, Headers } from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';
export declare class SelectService {
    private http;
    headers: Headers;
    constructor(http: Http);
    getResultados(url: any, parametros: any): Observable<{}>;
}
