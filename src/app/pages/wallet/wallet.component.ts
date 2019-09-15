import { Component, OnInit } from '@angular/core';
import { WalletService } from './wallet.service';
declare var window: any;
@Component({
  selector: 'wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  Balance = 0;
  Updating = false;

  constructor(private _service: WalletService) { }

  async Update() {
    this.Updating = true;
    this.Balance = await this._service.GetCurrentBalance();
    await new Promise((resolve) => setTimeout(resolve, 300));//sleep
    this.Updating = false;
  }

  async CaptureOrder(orderId: string) {
    await this._service.CaptureOrder(orderId);
  }

  async AddBalance() {
    await this._service.AddBalance();
    await this.Update();
  }

  ngOnInit() {
    this.Update()

    let ref = this;

    window.paypal.Buttons({
      createOrder: function (data, actions) {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: '5'
            }
          }]
        });
      },
      onApprove: function (data, actions) {
        console.log(data);
        ref.CaptureOrder(data.orderID);
      }
    }).render('#paypal-button-container-5');

    window.paypal.Buttons({
      createOrder: function (data, actions) {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: '5'
            }
          }]
        });
      },
      onApprove: function (data, actions) {
        console.log(data);
        ref.CaptureOrder(data.orderID);
      }
    }).render('#paypal-button-container-20');

    window.paypal.Buttons({
      createOrder: function (data, actions) {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: '5'
            }
          }]
        });
      },
      onApprove: function (data, actions) {
        console.log(data);
        ref.CaptureOrder(data.orderID);
      }
    }).render('#paypal-button-container-50');
  }

}
