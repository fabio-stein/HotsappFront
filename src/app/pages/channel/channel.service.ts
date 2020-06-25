import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ChannelForm } from './model/ChannelModel';

@Injectable()
export class ChannelService {
    constructor(private _http: HttpClient) {
    }

    GetAll() {
        return this._http.get<any[]>(environment.API_ENDPOINT + "/api/channel").toPromise();
    }

    Create(data: ChannelForm) {
        return this._http.post<string>(environment.API_ENDPOINT + "/api/channel/create", data).toPromise();
    }

    Delete(channelId: string) {
        return this._http.delete(environment.API_ENDPOINT + "/api/channel/" + channelId).toPromise();
    }
}