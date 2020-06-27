import { Component, OnInit, Input } from '@angular/core';
import { ChannelService } from '../../channel-services/channel.service';
import { PlaylistItemView } from './model/PlaylistItemView';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { ConfirmDialogService } from '../../../../@theme/components/confirm-dialog/confirm-dialog.service';
import { ChannelPlaylistService } from '../../channel-services/channel-playlist.service';

@Component({
  selector: 'channel-page-playlist',
  templateUrl: './channel-page-playlist.component.html',
  styleUrls: ['./channel-page-playlist.component.scss']
})
export class ChannelPagePlaylistComponent implements OnInit {
  Channel: string;
  playlist: any[];
  playlistHash: string;

  constructor(private activatedRoute: ActivatedRoute, private toastr: NbToastrService,
    private confirmDialog: ConfirmDialogService, private channelPlaylistService: ChannelPlaylistService) {
    this.activatedRoute.parent.paramMap.subscribe(params => {
      let id = params.get("id");
      this.Channel = id;
    });
  }

  async ngOnInit() {
    await this.Update();
  }

  async Update() {
    let data: any = await this.channelPlaylistService.GetAll(this.Channel);
    this.playlist = data.data;
    this.playlistHash = data.hash;
  }

  async removeItem(index: number) {
    let confirm = await this.confirmDialog.ConfirmAsync("Remove Media", "Are you sure?");
    if (confirm == true) {
      try {
        await this.channelPlaylistService.Delete(this.Channel, index, this.playlistHash);
        this.toastr.success("Media successfully removed", "Success");
      } catch (e) {
        console.error(e);
        this.toastr.danger("Failed to remove media", "Error");
      }
      await this.Update();
    }
  }
}
