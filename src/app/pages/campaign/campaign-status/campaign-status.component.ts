import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CampaignService } from '../campaign.service';

@Component({
  selector: 'campaign-status',
  templateUrl: './campaign-status.component.html',
  styleUrls: ['./campaign-status.component.scss']
})
export class CampaignStatusComponent implements OnInit, OnDestroy {

  id;
  updater: Subscription;
  status;

  constructor(private route: ActivatedRoute, private service: CampaignService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.updater = timer(0, 5000).pipe(
      switchMap(() => this.update())
    ).subscribe();
  }

  ngOnDestroy() {
    this.updater.unsubscribe();
  }

  async update() {
    this.status = await this.service.GetStatus(this.id);
  }

  statusResolver(status) {
    switch (status) {
      case "running":
        return "Enviando...";
      case "paused":
        return "Pausado";
      case "finished":
        return "Finalizado";
      case "canceled":
        return "Cancelado"
    }
    return "Desconhecido";
  }

  async pause() {
    await this.service.Stop(this.id);
    await this.update();
  }

  async start() {
    await this.service.Start(this.id);
    await this.update();
  }

  async cancel() {
    await this.service.Cancel(this.id);
    await this.update();
  }

}
