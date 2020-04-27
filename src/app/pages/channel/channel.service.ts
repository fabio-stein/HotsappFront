import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CampaignModel } from './model/ChannelModel';
import { environment } from '../../../environments/environment';

@Injectable()
export class ChannelService {
    constructor(private _http: HttpClient) {
    }

    Create(data: CampaignModel) {
        return this._http.post<string>(environment.API_ENDPOINT + "/api/channel/action", data).toPromise();
    }
}