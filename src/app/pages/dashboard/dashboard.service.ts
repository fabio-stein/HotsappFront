import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class DashboardService {
    constructor(private _http: HttpClient) {

    }

    Get() {
        return this._http.get<any[]>(environment.API_ENDPOINT + "/api/dashboard").toPromise();
    }
}