import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CampaignModel } from './model/CampaignModel';
import { environment } from '../../../environments/environment';

@Injectable()
export class CampaignService {
    constructor(private _http: HttpClient) {
    }

    Create(data: CampaignModel) {
        return this._http.post<string>(environment.API_ENDPOINT + "/api/campaign/create", data).toPromise();
    }

    Start(campaignId: string) {
        return this._http.put<any>(environment.API_ENDPOINT + "/api/campaign/start/" + campaignId, {}).toPromise();
    }

    Stop(campaignId: string) {
        return this._http.put<any>(environment.API_ENDPOINT + "/api/campaign/stop/" + campaignId, {}).toPromise();
    }

    Cancel(campaignId: string) {
        return this._http.put<any>(environment.API_ENDPOINT + "/api/campaign/cancel/" + campaignId, {}).toPromise();
    }

    GetAll(status: string) {
        return this._http.get<any[]>(environment.API_ENDPOINT + "/api/campaign/all/" + status).toPromise();
    }

    GetStatus(campaignId: string) {
        return this._http.get<any>(environment.API_ENDPOINT + "/api/campaign/status/" + campaignId).toPromise();
    }
}