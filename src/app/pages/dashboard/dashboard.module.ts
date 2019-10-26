import { NgModule } from '@angular/core';
import { NbCardModule, NbChatModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    NbChatModule
  ],
  declarations: [
    DashboardComponent,
  ],
  providers: [
  ]
})
export class DashboardModule { }
