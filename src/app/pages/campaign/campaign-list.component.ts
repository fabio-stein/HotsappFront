import { Component, OnInit } from '@angular/core';
import { CampaignService } from './campaign.service';

@Component({
  selector: 'campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.scss']
})
export class CampaignListComponent implements OnInit {

  constructor(private service: CampaignService) { }
  campaigns: any[] = [];
  hideFinished = true;

  async ngOnInit() {
    await this.update();
  }

  async update() {
    let status = "all";
    if (this.hideFinished) {
      status = "active";
    }
    this.campaigns = await this.service.GetAll(status);
  }

  async toggleFinished(e) {
    this.hideFinished = !this.hideFinished;
    await this.update();
  }

  statusResolver(campaign) {
    if (campaign.isComplete) {
      return "Finalizado";
    } else if (campaign.isCanceled) {
      return "Cancelado";
    } else if (campaign.isPaused) {
      return "Pausado";
    } else {
      return "Enviando";
    }
  }

  iconResolver(campaign) {
    let status = this.statusResolver(campaign);
    switch (status) {
      case "Finalizado":
        return "check";
      case "Cancelado":
        return "times";
      case "Pausado":
        return "pause-circle";
      case "Enviando":
        return "play";
    }
  }

  classResolver(campaign) {
    let status = this.statusResolver(campaign);
    switch (status) {
      case "Finalizado":
        return "text-secondary";
      case "Cancelado":
        return "text-secondary";
      case "Pausado":
        return "text-primary";
      case "Enviando":
        return "text-success";
    }
  }

}
