import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class WalletService{
    constructor(private _http:HttpClient){

    }

    GetCurrentBalance(){
        return this._http.get<number>(environment.API_ENDPOINT+"/api/payment/CurrentBalance").toPromise();
    }

    AddBalance(){
        return this._http.post(environment.API_ENDPOINT+"/api/payment/AddBalance", {}).toPromise();
    }

    CaptureOrder(orderId: string){
        return this._http.put(environment.API_ENDPOINT+"/api/payment/CaptureOrder/"+orderId, {}).toPromise();
    }
}