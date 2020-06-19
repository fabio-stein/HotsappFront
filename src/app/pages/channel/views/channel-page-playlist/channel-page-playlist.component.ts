import { Component, OnInit, Input } from '@angular/core';
import { ChannelService } from '../../channel.service';
import { PlaylistItemView } from './model/PlaylistItemView';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { ConfirmDialogService } from '../../../../@theme/components/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'channel-page-playlist',
  templateUrl: './channel-page-playlist.component.html',
  styleUrls: ['./channel-page-playlist.component.scss']
})
export class ChannelPagePlaylistComponent {
  Channel: number;

  constructor(private activatedRoute: ActivatedRoute, private toastr: NbToastrService, private confirmDialog: ConfirmDialogService) {
    this.activatedRoute.parent.paramMap.subscribe(params => {
      let id = params.get("id");
      this.Channel = Number(id);
    });
  }

  async removeItem() {
    let confirm = await this.confirmDialog.ConfirmAsync("Remove Media", "Are you sure?");
    if (confirm == true) {
      this.toastr.success("Media successfully removed", "Success");
    } else {
      this.toastr.danger("Failed to remove media", "Error");
    }
  }
}
