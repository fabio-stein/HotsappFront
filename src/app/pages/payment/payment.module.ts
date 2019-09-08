import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './payment.component';
import { PaymentService } from './payment.service';

@NgModule({
  declarations: [PaymentComponent],
  imports: [
    CommonModule,
    PaymentRoutingModule
  ],
  providers: [
    PaymentService
  ]
})
export class PaymentModule { }
