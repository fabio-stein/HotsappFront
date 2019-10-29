import { NgModule } from '@angular/core';
import { NbMenuModule, NbTabsetModule, NbCardModule, NbAccordionModule, NbCheckboxModule, NbListModule, NbActionsModule, NbIconModule, NbButtonModule, NbInputModule, NbUserModule, NbChatModule, NbSelectModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { FormsModule } from '@angular/forms';
import { RouteTabsetComponent } from '../@theme/components';
import { WalletComponent } from './wallet/wallet.component';
import { WalletService } from './wallet/wallet.service';
import { MyNumbersComponent } from './numbers/my-numbers/my-numbers.component';
import { BuyNumberComponent } from './numbers/buy-number/buy-number.component';
import { ChatComponent } from './chat/chat.component';
import { ContactListComponent } from './chat/components/contact-list/contact-list.component';
import { NumberService } from './numbers/number.service';
import { ChatService } from './chat/chat.service';
import { BulkMessagingComponent } from './bulk-messaging/bulk-messaging.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BulkMessagingCampaignComponent } from './bulk-messaging/campaign/bulk-messaging-campaign/bulk-messaging-campaign.component';

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
    NbSelectModule
  ],
  declarations: [
    PagesComponent,
    RouteTabsetComponent,
    WalletComponent,
    MyNumbersComponent,
    BuyNumberComponent,
    ChatComponent,
    ContactListComponent,
    BulkMessagingComponent,
    DashboardComponent,
    BulkMessagingCampaignComponent,
  ],
  providers: [
    WalletService,
    NumberService,
    ChatService
  ],
})
export class PagesModule {
}
