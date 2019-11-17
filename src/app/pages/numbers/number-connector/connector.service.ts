import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ConnectionFlow } from './model/ConnectionFlow';

@Injectable()
export class ConnectorService {
    constructor(private _http: HttpClient) {

    }

    StartFlow(countryCode, areaCode, phoneNumber) {
        return this._http.post<string>(environment.API_ENDPOINT + "/api/connector/StartFlow", { countryCode, areaCode, phoneNumber }).toPromise();
    }

    ConfirmCode(flowId, code) {
        return this._http.put(environment.API_ENDPOINT + "/api/connector/ConfirmCode/" + flowId + "/" + code, {}).toPromise();
    }

    CheckFlowStatus(flowId) {
        return this._http.get<ConnectionFlow>(environment.API_ENDPOINT + "/api/connector/CheckFlowStatus/" + flowId).toPromise();
    }
}