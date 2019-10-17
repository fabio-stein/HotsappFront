import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WalletComponent } from './wallet/wallet.component';
import { MessageComponent } from './message/message.component';
import { NewSingleMessageComponent } from './message/new-single-message/new-single-message.component';
import { MyNumbersComponent } from './numbers/my-numbers/my-numbers.component';
import { BuyNumberComponent } from './numbers/buy-number/buy-number.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: 'wallet',
      component: WalletComponent
    },
    {
      path: 'single_message',
      component: MessageComponent,
    },
    {
      path: 'single_message/new',
      component: NewSingleMessageComponent,
    },

    {
      path: 'number/my',
      component: MyNumbersComponent,
      pathMatch: 'full'
    },
    {
      path: 'number/buy',
      component: BuyNumberComponent,
      pathMatch: 'full'
    },
    {
      path: 'chat',
      component: ChatComponent
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
