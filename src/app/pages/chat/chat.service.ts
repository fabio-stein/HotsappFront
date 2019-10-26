import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ChatUpdate } from './model/ChatUpdate';
import { SendMessageRequest } from './model/SendMessageRequest';

@Injectable()
export class ChatService {
    constructor(private _http: HttpClient) {

    }

    GetContactUpdate(numberId: string) {
        return this._http.post<any[]>(environment.API_ENDPOINT + "/api/Chat/ContactUpdate/" + numberId, new Date()).toPromise();
    }

    GetChatUpdate(numberId: string, contactNumber: string, lastUpdate: Date) {
        return this._http.post<ChatUpdate>(environment.API_ENDPOINT + "/api/Chat/ChatUpdate/", {
            NumberId: numberId,
            ContactNumber: contactNumber,
            LastUpdate: lastUpdate
        }).toPromise();
    }

    SendMessage(data:SendMessageRequest) {
        return this._http.post<any[]>(environment.API_ENDPOINT + "/api/Chat/SendMessage", data).toPromise();
    }
}