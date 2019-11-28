import { Component, OnInit } from '@angular/core';
declare var window: any;

@Component({
  selector: 'plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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
        //ref.CaptureOrder(data.orderID);
      }
    }).render('#paypal-button-container-5');
  }

}
