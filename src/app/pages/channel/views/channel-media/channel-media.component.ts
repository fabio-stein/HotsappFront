import { Component, OnInit, Input } from '@angular/core';
import { ChannelService } from '../../channel.service';
import { MediaView } from './model/MediaView';

@Component({
  selector: 'channel-media',
  templateUrl: './channel-media.component.html',
  styleUrls: ['./channel-media.component.scss']
})
export class ChannelMediaComponent implements OnInit {

  @Input()
  Channel: number;

  constructor(private _service: ChannelService) { }

  items: MediaView[];
  ngOnInit() {
    this.update();
  }

  update() {
    this._service.GetMediaList(this.Channel).then(l => {
      this.items = l;
    })
  }

  remove(item: MediaView) {
    this._service.RemoveMedia(item.id).then(d => {
      this.update();
    });
  }

  addToPlaylist(item: MediaView) {
    this._service.AddMediaToPlaylist(item.id, this.Channel).then(d => {
    })
  }
}
