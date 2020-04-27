import { NgModule } from '@angular/core';
import { NbMenuModule, NbTabsetModule, NbCardModule, NbAccordionModule, NbCheckboxModule, NbListModule, NbActionsModule, NbIconModule, NbButtonModule, NbInputModule, NbUserModule, NbChatModule, NbSelectModule, NbRadioModule, NbProgressBarModule, NbStepperModule, NbSpinnerModule, NbTooltipModule, NbAlertModule, NbDialogModule } from '@nebular/theme';

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
    NbDialogModule
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
    ChannelEditorComponent
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
