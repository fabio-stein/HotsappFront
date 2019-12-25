import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export class SubscriptionService{
    constructor(private _http:HttpClient){

    }

    public CreateSubscription(){
        return this._http.get<any>(environment.API_ENDPOINT + "/api/subscription/create").toPromise();
    }

    public CancelSubscription(){
        return this._http.get<any>(environment.API_ENDPOINT + "/api/subscription/cancel").toPromise();
    }

    public GetPaymentUrl(){
        return this._http.get<any>(environment.API_ENDPOINT + "/api/subscription/getPaymentUrl").toPromise();
    }

    public GetStatus(){
        return this._http.get<any>(environment.API_ENDPOINT + "/api/subscription/getStatus").toPromise();
    }
}