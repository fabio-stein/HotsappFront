import { Component, OnInit, Input } from '@angular/core';
import { ChannelService } from '../../channel.service';
import { PlaylistItemView } from './model/PlaylistItemView';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'channel-page-playlist',
  templateUrl: './channel-page-playlist.component.html',
  styleUrls: ['./channel-page-playlist.component.scss']
})
export class ChannelPagePlaylistComponent {
  Channel: number;

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.parent.paramMap.subscribe(params => {
      let id = params.get("channelId");
      this.Channel = Number(id);
    });
  }

}
