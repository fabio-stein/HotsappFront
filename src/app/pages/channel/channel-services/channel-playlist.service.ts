import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ChannelPlaylistService {
    constructor(private _http: HttpClient) {
    }

    GetAll(channelId: string) {
        return this._http.get<any[]>(environment.API_ENDPOINT + "/api/playlist/" + channelId).toPromise();
    }

    Delete(channelId: string, index: number, hash: string) {
        return this._http.delete(environment.API_ENDPOINT + "/api/playlist/" + channelId + "?indexToRemove=" + index + "&hash=" + hash).toPromise();
    }
}