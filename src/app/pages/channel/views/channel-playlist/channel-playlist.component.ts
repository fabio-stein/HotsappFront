import { Component, OnInit, Input } from '@angular/core';
import { ChannelService } from '../../channel.service';
import { PlaylistItemView } from '../../channel-dashboard/pages/channel-page-playlist/model/PlaylistItemView';

@Component({
  selector: 'channel-playlist',
  templateUrl: './channel-playlist.component.html',
  styleUrls: ['./channel-playlist.component.scss']
})
export class ChannelPlaylistComponent implements OnInit {

  @Input()
  Channel: number;

  constructor(private _service: ChannelService) { }

  items: PlaylistItemView[];
  ngOnInit() {
    this.update();
  }

  update() {
    this._service.GetPlaylist(this.Channel).then(l => {
      console.log(l);
      this.items = l;
    })
  }

  moveUp(item: PlaylistItemView) {
    this._service.MovePlaylistItemUp(item.id)
      .then(d => {
        this.update();
      })
  }

  moveDown(item: PlaylistItemView) {
    this._service.MovePlaylistItemDown(item.id)
      .then(d => {
        this.update();
      })
  }

  remove(item: PlaylistItemView) {
    this._service.RemovePlaylistItem(item.id)
      .then(d => {
        this.update();
      })
  }
}
