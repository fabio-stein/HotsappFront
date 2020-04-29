import { NgModule } from '@angular/core';
import { NbMenuModule, NbTabsetModule, NbCardModule, NbAccordionModule, NbCheckboxModule, NbListModule, NbActionsModule, NbIconModule, NbButtonModule, NbInputModule, NbUserModule, NbChatModule, NbSelectModule, NbRadioModule, NbProgressBarModule, NbStepperModule, NbSpinnerModule, NbTooltipModule, NbAlertModule, NbDialogModule, NbRouteTabsetModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CampaignListComponent } from './campaign/campaign-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CampaignEditorComponent } from './campaign/campaign-editor/campaign-editor.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { PlansComponent } from './subscription/plans/plans.component';
import { NoActiveSubscriptionComponent } from './subscription/components/no-active-subscription/no-active-subscription.component';
import { SubscriptionService } from './subscription/subscription.service';
import { WalletComponent } from './wallet/wallet.component';
import { WalletService } from './wallet/wallet.service';
import { CampaignStatusComponent } from './campaign/campaign-status/campaign-status.component';
import { CampaignService } from './campaign/campaign.service';
import { ChannelListComponent } from './channel/channel-list.component';
import { ChannelDashboardComponent } from './channel/channel-dashboard/channel-dashboard.component';
import { ChannelEditorComponent } from './channel/channel-editor/channel-editor.component';
import { ChannelService } from './channel/channel.service';
import { ChannelPageDashboardComponent } from './channel/views/channel-page-dashboard/channel-page-dashboard.component';
import { ChannelPagePlaylistComponent } from './channel/views/channel-page-playlist/channel-page-playlist.component';
import { ChannelPageMediaComponent } from './channel/views/channel-page-media/channel-page-media.component';
import { ChannelPageConfigurationComponent } from './channel/views/channel-page-configuration/channel-page-configuration.component';
import { AddMediaDialogComponent } from './channel/views/add-media-dialog/add-media-dialog.component';
import { AddMediaDialogService } from './channel/views/add-media-dialog/add-media-dialog.service';

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
    NbRouteTabsetModule
  ],
  declarations: [
    PagesComponent,
    CampaignListComponent,
    DashboardComponent,
    CampaignEditorComponent,
    SubscriptionComponent,
    PlansComponent,
    NoActiveSubscriptionComponent,
    WalletComponent,
    CampaignStatusComponent,
    ChannelListComponent,
    ChannelDashboardComponent,
    ChannelEditorComponent,
    ChannelPageDashboardComponent,
    ChannelPagePlaylistComponent,
    ChannelPageMediaComponent,
    ChannelPageConfigurationComponent,
  ],
  entryComponents: [
  ],
  providers: [
    SubscriptionService,
    WalletService,
    CampaignService,
    ChannelService,
  ],
})
export class PagesModule {
}
