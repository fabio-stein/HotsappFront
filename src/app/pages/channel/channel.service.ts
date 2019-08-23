import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ActionChannelSearch } from './channel-search/action/ActionChannelSearch';
import { ChannelViewModel } from './views/ChannelViewModel';

@Injectable()
export class ChannelService {
    constructor(private _http: HttpClient) {

    }

    Add(Channel: ChannelViewModel) {
        const url = environment.API_ENDPOINT + '/api/Channel/Add';
        return this._http.post(url, Channel).toPromise();
    }

    Get(): Promise<ChannelViewModel[]> {
        const url = environment.API_ENDPOINT + '/api/Channel/Get';
        return this._http.post<ChannelViewModel[]>(url, {}).toPromise();
    }

    DeleteChannel(channel: number) {
        const url = environment.API_ENDPOINT + '/api/Channel/Delete/' + channel;
        return this._http.post<any>(url.toString(), {}).toPromise();
    }

    /*GetPlaylist(channel: number): Promise<PlaylistItemView[]> {
        let url = environment.API_ENDPOINT + "/api/ChannelPlaylist/GetList/" + channel;
        return this._http.get<PlaylistItemView[]>(url.toString()).toPromise();
    }

    RemovePlaylistItem(id: number) {
        let url = environment.API_ENDPOINT + "/api/ChannelPlaylist/Remove/" + id;
        return this._http.post(url.toString(), {}).toPromise();
    }

    MovePlaylistItemUp(id: number) {
        let url = environment.API_ENDPOINT + "/api/ChannelPlaylist/MoveUp/" + id;
        return this._http.post(url.toString(), {}).toPromise();
    }

    MovePlaylistItemDown(id: number) {
        let url = environment.API_ENDPOINT + "/api/ChannelPlaylist/MoveDown/" + id;
        return this._http.post(url.toString(), {}).toPromise();
    }

    GetMediaList(channel: number) {
        let url = environment.API_ENDPOINT + "/api/Media/GetList/" + channel;
        return this._http.get<MediaView[]>(url.toString()).toPromise();
    }

    RemoveMedia(id: number) {
        let url = environment.API_ENDPOINT + "/api/Media/Remove/" + id;
        return this._http.post(url.toString(), {}).toPromise();
    }

    AddMediaToPlaylist(media: number, channel: number) {
        let url = environment.API_ENDPOINT + "/api/ChannelPlaylist/AddMediaToPlaylist";
        return this._http.post(url.toString(), {
            mediaId: media,
            channel
        }).toPromise();
    }

    StartChannel(channel: number) {
        let url = environment.API_ENDPOINT + "/api/Channel/StartChannel/" + channel;
        return this._http.post(url.toString(), {}).toPromise();
    }

    StopChannel(channel: number) {
        let url = environment.API_ENDPOINT + "/api/Channel/StopChannel/" + channel;
        return this._http.post(url.toString(), {}).toPromise();
    }

    ChannelStatus(channel: number): Promise<ChannelStatusView> {
        let url = environment.API_ENDPOINT + "/api/Channel/ChannelStatus/" + channel;
        return this._http.get<ChannelStatusView>(url.toString()).toPromise();
    }

    GetMediaInfo(action: ActionGetMediaInfo) {
        let url = environment.API_ENDPOINT + "/api/Media/GetMediaInfo";
        return this._http.post(url.toString(), action).toPromise();
    }
    AddMedia(action: ActionAddMedia) {
        let url = environment.API_ENDPOINT + "/api/Media/AddMedia";
        return this._http.post(url.toString(), action).toPromise();
    }*/

    Search(action: ActionChannelSearch): Promise<ChannelViewModel[]> {
        const url = environment.API_ENDPOINT + '/api/Channel/Search';
        return this._http.post<ChannelViewModel[]>(url.toString(), action).toPromise();
    }
}
