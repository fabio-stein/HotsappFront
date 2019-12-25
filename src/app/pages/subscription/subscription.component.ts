import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from './subscription.service';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

  constructor(private service: SubscriptionService, private toastr: NbToastrService) { }

  currentStatus;

  async ngOnInit() {
    await this.getStatus();
  }

  async cancelSubscription() {
    try {
      let s = await this.service.CancelSubscription();
      this.toastr.success("Assinatura cancelada com sucesso", "Sucesso");
    } catch (e) {
      this.toastr.danger(e.message);
    }
    await this.getStatus();
  }

  async paySubscription() {
    this.toastr.info(null, "Aguarde");
    let paymentUrl = await this.service.GetPaymentUrl();
    window.open(paymentUrl.url);
  }

  async getStatus() {
    let s = await this.service.GetStatus();
    if (s.status == null || s.status == "Cancelled") {
      this.currentStatus = "Inactive"
    } else {
      this.currentStatus = s.status;
    }
  }
}
