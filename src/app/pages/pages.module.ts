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
    NbActionsModule
  ],
  declarations: [
    PagesComponent,
    ChannelSearchComponent,
    ChannelListComponent
  ],
  providers:[
    ChannelService
  ]
})
export class PagesModule {
}
