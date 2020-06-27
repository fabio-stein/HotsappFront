import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { PlansComponent } from './subscription/plans/plans.component';
import { WalletComponent } from './wallet/wallet.component';
import { ChannelListComponent } from './channel/channel-list.component';
import { ChannelEditorComponent } from './channel/channel-editor/channel-editor.component';
import { ChannelDashboardComponent } from './channel/channel-dashboard/channel-dashboard.component';
import { ChannelPageDashboardComponent } from './channel/views/channel-page-dashboard/channel-page-dashboard.component';
import { ChannelPagePlaylistComponent } from './channel/views/channel-page-playlist/channel-page-playlist.component';
import { ChannelPageConfigurationComponent } from './channel/views/channel-page-configuration/channel-page-configuration.component';
import { ChannelPageLibraryComponent } from './channel/views/channel-page-library/channel-page-library.component';

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
          path: 'library',
          component: ChannelPageLibraryComponent
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
