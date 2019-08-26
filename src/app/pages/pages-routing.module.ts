import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChannelSearchComponent } from './channel/channel-search/channel-search.component';
import { ChannelEditComponent } from './channel/channel-edit/channel-edit.component';
import { ChannelDashboardComponent } from './channel/channel-dashboard/channel-dashboard.component';
import { ChannelPageDashboardComponent } from './channel/channel-dashboard/pages/channel-page-dashboard/channel-page-dashboard.component';
import { ChannelPagePlaylistComponent } from './channel/channel-dashboard/pages/channel-page-playlist/channel-page-playlist.component';
import { ChannelPageMediaComponent } from './channel/channel-dashboard/pages/channel-page-media/channel-page-media.component';
import { ChannelPageConfigurationComponent } from './channel/channel-dashboard/pages/channel-page-configuration/channel-page-configuration.component';
import { ChannelPageComponent } from './channel/channel-page/channel-page.component';
import { ChannelPageHomeComponent } from './channel/channel-page/pages/channel-page-home/channel-page-home.component';

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
      path: 'channel/new',
      component: ChannelEditComponent
    },
    {
      path: 'channel/edit/:id',
      component: ChannelEditComponent
    },
    {
      path: 'channel/search',
      component: ChannelSearchComponent
    },
    {
      path: 'dashboard/:channelId',
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
      path: 'channel/:channelId',
      component: ChannelPageComponent,
      children: [
        {
          path: '',
          redirectTo: 'home',
          pathMatch: 'full'
        },
        {
          path: 'home',
          component: ChannelPageHomeComponent
        }
      ]
    },
    {
      path: 'channel',
      pathMatch: 'full',
      redirectTo: 'channel/search'
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
