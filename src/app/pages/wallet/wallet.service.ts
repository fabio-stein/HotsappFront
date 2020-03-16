import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { OrderModel } from './model/OrderModel';

@Injectable()
export class WalletService {
    constructor(private _http: HttpClient) {

    }

    GetCurrentBalance() {
        return this._http.get<number>(environment.API_ENDPOINT + "/api/payment/CurrentBalance").toPromise();
    }

    CaptureOrder(orderId: string) {
        return this._http.put(environment.API_ENDPOINT + "/api/payment/CaptureOrder/" + orderId, {}).toPromise();
    }

    StartOrder(option: number) {
        return this._http.get<OrderModel>(environment.API_ENDPOINT + "/api/payment/StartOrder/" + option, {}).toPromise();
    }

    ApplyCoupon(order: OrderModel, coupon: string) {
        return this._http.post<OrderModel>(environment.API_ENDPOINT + "/api/payment/ApplyCoupon/" + coupon, order).toPromise();
    }

    RemoveCoupon(order: OrderModel) {
        return this._http.post<OrderModel>(environment.API_ENDPOINT + "/api/payment/RemoveCoupon/", order).toPromise();
    }

    CompleteOrder(order: OrderModel) {
        return this._http.post<any>(environment.API_ENDPOINT + "/api/payment/CompleteOrder/", order).toPromise();
    }
}