import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../../../../@theme/components/confirm-dialog/confirm-dialog.component';
import { ChannelService } from '../../../channel.service';

@Component({
  selector: 'channel-page-configuration',
  templateUrl: './channel-page-configuration.component.html',
  styleUrls: ['./channel-page-configuration.component.scss']
})
export class ChannelPageConfigurationComponent implements OnInit {

  Channel: number;
  constructor(private activatedRoute: ActivatedRoute, private dialog: NbDialogService, private router: Router, private service: ChannelService, private toastr: NbToastrService) {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = params.get("channelId");
      this.Channel = Number(id);
    });
  }

  ngOnInit() {
  }

  deleteClick() {
    let ref = this.dialog.open(ConfirmDialogComponent, { context: { Title: "Delete Channel", Content: "Are you sure?" } });
    ref.componentRef.instance.OnConfirm.subscribe(e => {
      this.deleteChannel();
    })
  }
  deleteChannel() {
    this.service.DeleteChannel(this.Channel).then(e => {
      this.toastr.success("Channel deleted successfully", "Delete Channel");
      this.router.navigate(["/pages/channel"]);
    })
  }
}
