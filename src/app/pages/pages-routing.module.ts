import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CampaignListComponent } from './campaign/campaign-list.component';
import { CampaignEditorComponent } from './campaign/campaign-editor/campaign-editor.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { PlansComponent } from './subscription/plans/plans.component';
import { WalletComponent } from './wallet/wallet.component';
import { CampaignStatusComponent } from './campaign/campaign-status/campaign-status.component';
import { ChannelListComponent } from './channel/channel-list.component';
import { ChannelEditorComponent } from './channel/channel-editor/channel-editor.component';
import { ChannelDashboardComponent } from './channel/channel-dashboard/channel-dashboard.component';

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
      path: 'channel',
      component: ChannelListComponent
    },
    {
      path: 'channel/new',
      component: ChannelEditorComponent
    },
    {
      path: 'channel/:id',
      pathMatch: 'full',
      component: ChannelDashboardComponent
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
