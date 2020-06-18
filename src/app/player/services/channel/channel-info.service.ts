import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ChannelInfoService {
    constructor(private _http: HttpClient) {

    }

    async GetChannelInfo(id: string) {
        return this._http.get<any>(environment.API_ENDPOINT + "/api/channel-info/status/?channelId=" + id).toPromise();
    }
}