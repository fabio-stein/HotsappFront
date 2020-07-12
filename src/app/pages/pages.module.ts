import { NgModule } from '@angular/core';
import { NbMenuModule, NbTabsetModule, NbCardModule, NbAccordionModule, NbCheckboxModule, NbListModule, NbActionsModule, NbIconModule, NbButtonModule, NbInputModule, NbUserModule, NbChatModule, NbSelectModule, NbRadioModule, NbProgressBarModule, NbStepperModule, NbSpinnerModule, NbTooltipModule, NbAlertModule, NbDialogModule, NbRouteTabsetModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { PlansComponent } from './subscription/plans/plans.component';
import { NoActiveSubscriptionComponent } from './subscription/components/no-active-subscription/no-active-subscription.component';
import { SubscriptionService } from './subscription/subscription.service';
import { WalletComponent } from './wallet/wallet.component';
import { WalletService } from './wallet/wallet.service';
import { ChannelListComponent } from './channel/channel-list.component';
import { ChannelDashboardComponent } from './channel/channel-dashboard/channel-dashboard.component';
import { ChannelEditorComponent } from './channel/channel-editor/channel-editor.component';
import { ChannelService } from './channel/channel-services/channel.service';
import { ChannelPageDashboardComponent } from './channel/views/channel-page-dashboard/channel-page-dashboard.component';
import { ChannelPagePlaylistComponent } from './channel/views/channel-page-playlist/channel-page-playlist.component';
import { ChannelPageConfigurationComponent } from './channel/views/channel-page-configuration/channel-page-configuration.component';
import { CountdownModule, CountdownGlobalConfig } from 'ngx-countdown';
import { ChannelPageLibraryComponent } from './channel/views/channel-page-library/channel-page-library.component';
import { ChannelLibraryService } from './channel/channel-services/channel-library.service';
import { ChannelPlaylistService } from './channel/channel-services/channel-playlist.service';
import { DashboardService } from './dashboard/dashboard.service';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbTabsetModule,
    NbCardModule,
    FormsModule,
    NbAccordionModule,
    NbCheckboxModule,
    NbListModule,
    NbActionsModule,
    NbIconModule,
    NbButtonModule,
    NbInputModule,
    NbUserModule,
    NbChatModule,
    NbSelectModule,
    NbRadioModule,
    NbProgressBarModule,
    NbStepperModule,
    ReactiveFormsModule,
    NbSpinnerModule,
    NbTooltipModule,
    NbAlertModule,
    NbDialogModule,
    NbRouteTabsetModule,

    CountdownModule 
  ],
  declarations: [
    PagesComponent,
    DashboardComponent,
    SubscriptionComponent,
    PlansComponent,
    NoActiveSubscriptionComponent,
    WalletComponent,
    ChannelListComponent,
    ChannelDashboardComponent,
    ChannelEditorComponent,
    ChannelPageDashboardComponent,
    ChannelPagePlaylistComponent,
    ChannelPageLibraryComponent,
    ChannelPageConfigurationComponent,
  ],
  entryComponents: [
  ],
  providers: [
    SubscriptionService,
    WalletService,
    ChannelService,
    ChannelLibraryService,
    ChannelPlaylistService,
    DashboardService,
    CountdownGlobalConfig
  ],
})
export class PagesModule {
}
