import { Component, OnInit } from '@angular/core';
import { WalletService } from './wallet.service';
import { OrderModel } from './model/OrderModel';
import { NbToastrService } from '@nebular/theme';
declare var window: any;
@Component({
  selector: 'wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  Balance = 0;
  Updating = false;
  optionSelected = 1;
  Order: OrderModel;

  constructor(private _service: WalletService, private toastr: NbToastrService) { }

  async Update() {
    this.Updating = true;
    this.Balance = await this._service.GetCurrentBalance();
    await new Promise((resolve) => setTimeout(resolve, 300));//sleep
    this.Updating = false;
  }

  async CaptureOrder(orderId: string) {
    await this._service.CaptureOrder(orderId);
  }

  ngOnInit() {
    this.Update();
    this.SelectOption(1);

    let ref = this;

    setTimeout(() => {
      window.paypal.Buttons({
        createOrder: async function (data, actions) {
          return await ref.CompleteOrder();
        },
        onApprove: async function (data, actions) {
          console.log(data);
          await ref.CaptureOrder(data.orderID);
          ref.toastr.success("Créditos adicionados com sucess", "Sucesso");
          location.reload();
        }
      }).render('#paypal-button-container-5');
    }, 1000);
  }

  async SelectOption(option) {
    this.optionSelected = option;
    this.Order = await this._service.StartOrder(option);
  }

  async ApplyCoupon(code) {
    let order = await this._service.ApplyCoupon(this.Order, code);
    this.Order = order;
    this.toastr.success("Cupom aplicado!", "Sucesso");
  }

  async RemoveCoupon() {
    this.Order = await this._service.RemoveCoupon(this.Order);
    this.toastr.success("Cupom removido!", "Sucesso");
  }

  async CompleteOrder() {
    let paypalOrderid = await this._service.CompleteOrder(this.Order);
    console.log("PaypalOrderId: " + paypalOrderid.id);
    return paypalOrderid.id;
  }

}
