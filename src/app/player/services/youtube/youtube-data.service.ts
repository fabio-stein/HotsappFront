import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class YoutubeDataService {
    constructor(private _http: HttpClient) {

    }

    async GetInfo(id: string) {
        return this._http.get<any>("https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=" + id + "&format=json").toPromise();
    }
}