import { Component, OnInit, AfterViewInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { SubscriptionService } from '../subscription.service';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
declare var window: any;

@Component({
  selector: 'plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit, AfterViewInit {

  isSubscriberCard = false;
  plansCard = false;

  constructor(private service: SubscriptionService, private router: Router, private toastr: NbToastrService) { }

  async ngOnInit() {
    let subscription = await this.service.GetStatus();

    let activeSubscription = (subscription.status != null && (subscription.status == "Active" || subscription.status == "Pending"));
    this.isSubscriberCard = activeSubscription;
    this.plansCard = !activeSubscription;
  }

  async ngAfterViewInit() {
    setTimeout(() => {
      this.renderButton();
    }, 1000);
  }

  async createSubscription() {
    let s = await this.service.CreateSubscription();
    console.log(s);
  }

  renderButton() {
    let ref = this;
    window.paypal.Buttons({
      commit: true,
      onInit: function (data, actions) {
        actions.disable();
      },
      onClick: async function () {
        ref.Start();

        return false;
      }
    }).render('#paypal-button-container');
  }

  async Start() {
    this.toastr.info(null, "Aguarde");
    await this.createSubscription();
    await this.paySubscription();
    this.redirectToSubscription();
  }

  redirectToSubscription() {
    this.router.navigate(['/pages/subscription']);
  }

  async paySubscription() {
    //this.toastr.info(null, "Aguarde");
    let paymentUrl = await this.service.GetPaymentUrl();
    window.open(paymentUrl.url);
  }

}
