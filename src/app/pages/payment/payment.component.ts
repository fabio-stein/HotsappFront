import { Component, OnInit } from '@angular/core';
import { PaymentService } from './payment.service';
declare var window: any;
@Component({
  selector: 'payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  Balance = 0;
  constructor(private _service: PaymentService) { }

  ngOnInit() {
    let ref = this;
    window.paypal.Buttons({
      createOrder: function(data, actions) {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: '5'
            }
          }]
        });
      },
      onApprove: function(data, actions) {
        console.log(data);
        ref.CaptureOrder(data.orderID);
      }
    }).render('#paypal-button-container');
  }

  async CaptureOrder(orderId:string){
    await this._service.CaptureOrder(orderId);
  }

  async GetBalance() {
    this.Balance = await this._service.GetCurrentBalance();
  }

  async AddBalance() {
    await this._service.AddBalance();
    await this.GetBalance();
  }

  test1() {
    console.log(window.Mercadopago.getIdentificationTypes());
  }
}
