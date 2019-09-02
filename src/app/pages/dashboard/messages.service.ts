import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class MessagesService{
    constructor(private _http: HttpClient){

    }

    GetMessage(id:Number){
        return this._http.post<any>(environment.API_ENDPOINT+"/api/Messages/GetMessage", id).toPromise();
    }

    SendMessage(message:string){
        return this._http.post<any>(environment.API_ENDPOINT+"/api/Messages/SendMessage", {message: message}).toPromise();
    }
}