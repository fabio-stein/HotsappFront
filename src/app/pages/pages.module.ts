import { NgModule } from '@angular/core';
import { NbMenuModule, NbTabsetModule, NbCardModule, NbAccordionModule, NbCheckboxModule, NbListModule, NbActionsModule, NbIconModule, NbButtonModule, NbInputModule, NbUserModule, NbChatModule, NbSelectModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { FormsModule } from '@angular/forms';
import { RouteTabsetComponent } from '../@theme/components';
import { WalletComponent } from './wallet/wallet.component';
import { WalletService } from './wallet/wallet.service';
import { MessageComponent } from './message/message.component';
import { NewSingleMessageComponent } from './message/new-single-message/new-single-message.component';
import { MyNumbersComponent } from './numbers/my-numbers/my-numbers.component';
import { BuyNumberComponent } from './numbers/buy-number/buy-number.component';
import { ChatComponent } from './chat/chat.component';
import { ContactListComponent } from './chat/components/contact-list/contact-list.component';
import { NumberService } from './numbers/number.service';

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
    MessageComponent,
    NewSingleMessageComponent,
    MyNumbersComponent,
    BuyNumberComponent,
    ChatComponent,
    ContactListComponent,
  ],
  providers: [
    WalletService,
    NumberService
  ],
})
export class PagesModule {
}
