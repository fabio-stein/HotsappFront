import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyNumbersComponent } from './numbers/my-numbers/my-numbers.component';
import { BuyNumberComponent } from './numbers/buy-number/buy-number.component';
import { ChatComponent } from './chat/chat.component';
import { CampaignListComponent } from './campaign/campaign-list.component';
import { CampaignEditorComponent } from './campaign/campaign-editor/campaign-editor.component';
import { NumberConnectorComponent } from './numbers/number-connector/number-connector.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { PlansComponent } from './subscription/plans/plans.component';
import { WalletComponent } from './wallet/wallet.component';
import { CampaignStatusComponent } from './campaign/campaign-status/campaign-status.component';

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
      path: 'number/connector',
      component: NumberConnectorComponent,
      pathMatch: 'full'
    },
    {
      path: 'chat',
      component: ChatComponent
    },
    {
      path: 'chat/:id',
      component: ChatComponent
    },
    {
      path: 'campaign',
      component: CampaignListComponent
    },
    {
      path: 'campaign/new',
      component: CampaignEditorComponent
    },
    {
      path: 'campaign/:id',
      pathMatch: 'full',
      component: CampaignStatusComponent
    },
    {
      path: 'subscription',
      pathMatch: 'full',
      component: SubscriptionComponent
    },
    {
      path: 'subscription/plans',
      pathMatch: 'full',
      component: PlansComponent
    },
    {
      path: 'wallet',
      component: WalletComponent
    },

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
