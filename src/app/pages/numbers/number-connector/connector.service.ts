import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ConnectionFlow } from './model/ConnectionFlow';

@Injectable()
export class ConnectorService {
    constructor(private _http: HttpClient) {

    }

    UpdateConnection(processId) {
        return this._http.post<any>(environment.API_ENDPOINT + "/api/connector/UpdateConnection", { processId }).toPromise();
    }
}