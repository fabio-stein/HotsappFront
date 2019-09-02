import { NgModule } from '@angular/core';
import { NbCardModule, NbChatModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { MessagesService } from './messages.service';

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
    MessagesService
  ]
})
export class DashboardModule { }
