import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ChatUpdate } from './chat-client/model/ChatUpdate';
import { SendMessageRequest } from './chat-client/model/SendMessageRequest';

@Injectable()
export class ChatService {
    constructor(private _http: HttpClient) {

    }

    GetChatList() {
        return this._http.get<any[]>(environment.API_ENDPOINT + "/api/Chat/GetList").toPromise();
    }

    GetContactUpdate(numberId: string) {
        return this._http.post<any[]>(environment.API_ENDPOINT + "/api/Chat/ContactUpdate/" + numberId, new Date()).toPromise();
    }

    GetChatUpdate(chatId: Number, lastMessageId: Number) {
        return this._http.post<ChatUpdate>(environment.API_ENDPOINT + "/api/Chat/ChatUpdate/", {
            ChatId: chatId,
            LastMessageId: lastMessageId
        }).toPromise();
    }

    SendMessage(data: SendMessageRequest) {
        return this._http.post<any[]>(environment.API_ENDPOINT + "/api/Chat/SendMessage", data).toPromise();
    }
}