import { NgModule } from '@angular/core';
import { NbMenuModule, NbTabsetModule, NbCardModule, NbAccordionModule, NbCheckboxModule, NbListModule, NbActionsModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ChannelSearchComponent } from './channel/channel-search/channel-search.component';
import { ChannelListComponent } from './channel/views/channel-list/channel-list.component';
import { FormsModule } from '@angular/forms';
import { ChannelService } from './channel/channel.service';
import { ChannelPageComponent } from './channel/channel-page/channel-page.component';
import { ChannelPageHomeComponent } from './channel/channel-page/pages/channel-page-home/channel-page-home.component';
import { AddMediaComponent } from './channel/views/add-media/add-media.component';
import { ChannelControlViewComponent } from './channel/views/channel-control-view/channel-control-view.component';
import { ChannelMediaComponent } from './channel/views/channel-media/channel-media.component';
import { ChannelPlaylistComponent } from './channel/views/channel-playlist/channel-playlist.component';
import { ChannelEditComponent } from './channel/channel-edit/channel-edit.component';
import { ChannelDashboardComponent } from './channel/channel-dashboard/channel-dashboard.component';
import { ChannelPageDashboardComponent } from './channel/channel-dashboard/pages/channel-page-dashboard/channel-page-dashboard.component';
import { ChannelPagePlaylistComponent } from './channel/channel-dashboard/pages/channel-page-playlist/channel-page-playlist.component';
import { ChannelPageMediaComponent } from './channel/channel-dashboard/pages/channel-page-media/channel-page-media.component';
import { ChannelPageConfigurationComponent } from './channel/channel-dashboard/pages/channel-page-configuration/channel-page-configuration.component';
import { RouteTabsetComponent } from '../@theme/components';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    NbTabsetModule,
    NbCardModule,
    FormsModule,
    NbAccordionModule,
    NbCheckboxModule,
    NbListModule,
    NbActionsModule,
  ],
  declarations: [
    PagesComponent,
    ChannelSearchComponent,
    ChannelListComponent,
    ChannelPageComponent,
    ChannelPageHomeComponent,
    AddMediaComponent,
    ChannelControlViewComponent,
    ChannelMediaComponent,
    ChannelPlaylistComponent,
    ChannelEditComponent,
    ChannelDashboardComponent,
    ChannelPageDashboardComponent,
    ChannelPagePlaylistComponent,
    ChannelPageMediaComponent,
    ChannelPageConfigurationComponent,
    RouteTabsetComponent
  ],
  providers: [
    ChannelService,
  ],
})
export class PagesModule {
}
