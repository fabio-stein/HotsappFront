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
import { ChannelPageDashboardComponent } from './channel/views/channel-page-dashboard/channel-page-dashboard.component';
import { ChannelPagePlaylistComponent } from './channel/views/channel-page-playlist/channel-page-playlist.component';
import { ChannelPageMediaComponent } from './channel/views/channel-page-media/channel-page-media.component';
import { ChannelPageConfigurationComponent } from './channel/views/channel-page-configuration/channel-page-configuration.component';

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
      component: ChannelDashboardComponent,
      children: [
        {
          path: '',
          redirectTo: 'dashboard',
          pathMatch: 'full'
        },
        {
          path: 'dashboard',
          component: ChannelPageDashboardComponent
        },
        {
          path: 'playlist',
          component: ChannelPagePlaylistComponent
        },
        {
          path: 'media',
          component: ChannelPageMediaComponent
        },
        {
          path: 'config',
          component: ChannelPageConfigurationComponent
        }
      ]
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
