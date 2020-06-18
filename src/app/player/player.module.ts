import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerRoutingModule } from './player-routing.module';
import { ExternalPlayerComponent } from './external-player/external-player.component';
import { AppPlayerComponent } from './app-player/app-player.component';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../@theme/theme.module';
import { NbAuthModule } from '@nebular/auth';
import { NbLayoutModule } from '@nebular/theme';
import { TestPlayerComponent } from './test-player/test-player.component';
import { WebStreamerService } from './services/web-streamer/web-streamer.service';
import { YoutubeDataService } from './services/youtube/youtube-data.service';
import { ChannelInfoService } from './services/channel/channel-info.service';

@NgModule({
  declarations: [
    ExternalPlayerComponent,
    AppPlayerComponent,
    TestPlayerComponent
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
    WebStreamerService,
    YoutubeDataService,
    ChannelInfoService
  ]
})
export class PlayerModule { }
