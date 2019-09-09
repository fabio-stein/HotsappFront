import { Component, OnInit } from '@angular/core';
declare var window: any;
@Component({
  selector: 'wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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
        //ref.CaptureOrder(data.orderID);
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
        //ref.CaptureOrder(data.orderID);
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
        //ref.CaptureOrder(data.orderID);
      }
    }).render('#paypal-button-container-50');
  }

}
