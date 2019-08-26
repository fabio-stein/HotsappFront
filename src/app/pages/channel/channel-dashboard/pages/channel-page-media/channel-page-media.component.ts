import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MediaView } from './model/MediaView';
import { ChannelService } from '../../../channel.service';
import { ChannelMediaComponent } from '../../../views/channel-media/channel-media.component';
import { NbDialogService } from '@nebular/theme';
import { AddMediaComponent } from '../../../views/add-media/add-media.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'channel-page-media',
  templateUrl: './channel-page-media.component.html',
  styleUrls: ['./channel-page-media.component.scss']
})
export class ChannelPageMediaComponent {
  @ViewChild(ChannelMediaComponent, null) mediaComponent: ChannelMediaComponent;

  Channel: number;

  constructor(private activatedRoute: ActivatedRoute, private dialog: NbDialogService) {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = params.get("channelId");
      this.Channel = Number(id);
    });
  }

  addMediaClick() {
    this.dialog.open(AddMediaComponent, { context: { Options: { Channel: this.Channel } } }).onClose.subscribe(e => {
      this.mediaComponent.update();
    })
  }
}
