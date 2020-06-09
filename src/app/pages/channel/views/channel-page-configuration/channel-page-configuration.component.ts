import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../../../@theme/components/confirm-dialog/confirm-dialog.component';
import { ChannelService } from '../../channel.service';
import { ConfirmDialogService } from '../../../../@theme/components/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'channel-page-configuration',
  templateUrl: './channel-page-configuration.component.html',
  styleUrls: ['./channel-page-configuration.component.scss']
})
export class ChannelPageConfigurationComponent implements OnInit {

  Channel: number;
  constructor(private activatedRoute: ActivatedRoute, private dialog: NbDialogService, private router: Router, private service: ChannelService, private toastr: NbToastrService, private confirmDialog: ConfirmDialogService) {
    this.activatedRoute.parent.paramMap.subscribe(params => {
      let id = params.get("channelId");
      this.Channel = Number(id);
    });
  }

  ngOnInit() {
  }

  async deleteClick() {
    let confirm = await this.confirmDialog.ConfirmAsync("Delete Channel", "Are you sure?");
    if (confirm == true) {
      this.toastr.success("Channel successfully deleted", "Success");
    } else {
      this.toastr.danger("Failed to delete channel", "Error");
    }
  }
}
