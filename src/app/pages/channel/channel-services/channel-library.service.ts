import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ChannelLibraryService {
    constructor(private _http: HttpClient) {
    }

    GetAll(channelId: string) {
        return this._http.get<any[]>(environment.API_ENDPOINT + "/api/library/" + channelId).toPromise();
    }

    Delete(channelId: string, mediaId: string) {
        return this._http.delete(environment.API_ENDPOINT + "/api/library/" + channelId + "?mediaId=" + mediaId).toPromise();
    }

    SendToPlaylist(channelId: string, mediaId: string) {
        return this._http.post(environment.API_ENDPOINT + "/api/library/" + channelId + "/send-to-playlist?mediaId=" + mediaId, {}).toPromise();
    }

    ImportYouTubePlaylist(channelId: string, playlistUrl: string, addToPlaylist: boolean) {
        return this._http.post(environment.API_ENDPOINT + "/api/library/import-playlist", {
            channelId,
            playlistUrl,
            addToPlaylist
        }).toPromise();
    }
}