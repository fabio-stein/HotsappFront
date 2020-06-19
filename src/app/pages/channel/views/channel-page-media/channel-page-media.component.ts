import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MediaView } from './model/MediaView';
import { ChannelService } from '../../channel.service';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../../../../@theme/components';
import { ConfirmDialogService } from '../../../../@theme/components/confirm-dialog/confirm-dialog.service';
import { AddMediaDialogService } from '../add-media-dialog/add-media-dialog.service';

@Component({
  selector: 'channel-page-media',
  templateUrl: './channel-page-media.component.html',
  styleUrls: ['./channel-page-media.component.scss']
})
export class ChannelPageMediaComponent {
  //@ViewChild(ChannelMediaComponent, null) mediaComponent: ChannelMediaComponent;

  Channel: number;

  constructor(private activatedRoute: ActivatedRoute, private toastr: NbToastrService, private confirmDialog: ConfirmDialogService,
    private mediaDialog: AddMediaDialogService) {
    this.activatedRoute.parent.paramMap.subscribe(params => {
      let id = params.get("id");
      this.Channel = Number(id);
    });
  }

  async addMediaClick() {
    let result = await this.mediaDialog.StartDialogAsync();
    if (result != null) {
      this.toastr.success("Successfully added media: " + result.mediaUrl, "Success");
    } else {
      this.toastr.danger("Failed to add media", "Error");
    }
  }

  sendToPlaylist() {
    if (Math.random() > 0.5) {
      this.toastr.success("Media successfully sent to playlist", "Success");
    } else {
      this.toastr.danger("Failed to send media to playlist", "Error");
    }
  }

  async deleteMedia() {
    let confirm = await this.confirmDialog.ConfirmAsync("Delete Media", "Are you sure?");
    if (confirm == true) {
      this.toastr.success("Media successfully deleted", "Success");
    } else {
      this.toastr.danger("Failed to delete media", "Error");
    }
  }
}
