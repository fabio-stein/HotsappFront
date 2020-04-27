import { Component, OnInit } from '@angular/core';
import { CampaignModel } from '../model/ChannelModel';
import { ChannelService } from '../channel.service';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'channel-editor',
  templateUrl: './channel-editor.component.html',
  styleUrls: ['./channel-editor.component.scss']
})
export class ChannelEditorComponent implements OnInit {

  constructor(private service: ChannelService, private router: Router, private toastr: NbToastrService) { }

  ngOnInit() {
  }

  async OnSubmit(e: CampaignModel) {
    try {
      let result = await this.service.Create(e);
      this.toastr.success("Channel created successfully", "Success");
      this.router.navigate(['/pages/channel/' + result]);
    } catch (e) {
      console.log(e);
      this.toastr.danger("Failed to create channel", "Error");
    }
  }
}
