import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MediaView } from './model/MediaView';
import { ChannelService } from '../../channel-services/channel.service';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../../../../@theme/components';
import { ConfirmDialogService } from '../../../../@theme/components/confirm-dialog/confirm-dialog.service';
import { ChannelLibraryService } from '../../channel-services/channel-library.service';
import { ImportYouTubePlaylistDialogService } from '../dialogs/import-youtube-playlist-dialog/import-youtube-playlist-dialog.service';

@Component({
  selector: 'channel-page-library',
  templateUrl: './channel-page-library.component.html',
  styleUrls: ['./channel-page-library.component.scss']
})
export class ChannelPageLibraryComponent implements OnInit {
  Channel: string;

  library: any[];

  constructor(private activatedRoute: ActivatedRoute, private toastr: NbToastrService, private confirmDialog: ConfirmDialogService,
    private mediaDialog: ImportYouTubePlaylistDialogService, private channelLibraryService: ChannelLibraryService) {

    this.activatedRoute.parent.paramMap.subscribe(params => {
      let id = params.get("id");
      this.Channel = id;
    });
  }

  async ngOnInit() {
    await this.Update();
  }

  async Update() {
    this.library = await this.channelLibraryService.GetAll(this.Channel);
  }

  async importPlaylistClick() {
    let result = await this.mediaDialog.StartDialogAsync();
    if (result != null) {
      try {
        this.toastr.info("Processing your request", "Please Wait");
        await this.channelLibraryService.ImportYouTubePlaylist(this.Channel, result.mediaUrl, result.addToPlaylist);
        this.toastr.success("Playlist imported successfully", "Success");
      } catch (e) {
        console.error(e);
        this.toastr.danger("Failed to import playlist", "Error");
      }
    }
    await this.Update();
  }

  async sendToPlaylist(mediaId: string) {
    try {
      await this.channelLibraryService.SendToPlaylist(this.Channel, mediaId);
      this.toastr.success("Media successfully sent to playlist", "Success");
    } catch (e) {
      console.error(e);
      this.toastr.danger("Failed to send media to playlist", "Error");
    }
  }

  async deleteMedia(mediaId: string) {
    let confirm = await this.confirmDialog.ConfirmAsync("Delete Media", "Are you sure?");
    if (confirm == true) {
      try {
        await this.channelLibraryService.Delete(this.Channel, mediaId);
        this.toastr.success("Media successfully deleted", "Success");
        await this.Update();
      } catch (e) {
        console.error(e);
        this.toastr.danger("Failed to delete media", "Error");
      }
    }
  }
}
