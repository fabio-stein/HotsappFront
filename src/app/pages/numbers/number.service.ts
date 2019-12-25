import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class NumberService {
    constructor(private _http: HttpClient) {

    }

    GetMyNumbers() {
        return this._http.get<any[]>(environment.API_ENDPOINT + "/api/Number/GetMyNumbers").toPromise();
    }

    ReserveNew() {
        return this._http.post(environment.API_ENDPOINT + "/api/Number/ReserveNew", {}).toPromise();
    }
}