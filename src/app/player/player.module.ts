import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerRoutingModule } from './player-routing.module';
import { ExternalPlayerComponent } from './external-player/external-player.component';
import { AppPlayerComponent } from './app-player/app-player.component';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../@theme/theme.module';
import { NbAuthModule } from '@nebular/auth';
import { PlayerService } from './player.service';
import { NbLayoutModule } from '@nebular/theme';

@NgModule({
  declarations: [
    ExternalPlayerComponent,
    AppPlayerComponent
  ],
  imports: [
    CommonModule,
    PlayerRoutingModule,
    FormsModule,
    ThemeModule,
    NbAuthModule,
    NbLayoutModule
  ],
  exports: [
    AppPlayerComponent
  ],
  providers: [
    PlayerService
  ]
})
export class PlayerModule { }
