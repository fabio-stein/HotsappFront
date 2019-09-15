import { NgModule } from '@angular/core';
import { NbMenuModule, NbTabsetModule, NbCardModule, NbAccordionModule, NbCheckboxModule, NbListModule, NbActionsModule, NbIconModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { FormsModule } from '@angular/forms';
import { RouteTabsetComponent } from '../@theme/components';
import { WalletComponent } from './wallet/wallet.component';
import { WalletService } from './wallet/wallet.service';

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
    NbIconModule
  ],
  declarations: [
    PagesComponent,
    RouteTabsetComponent,
    WalletComponent,
  ],
  providers: [
    WalletService
  ],
})
export class PagesModule {
}
