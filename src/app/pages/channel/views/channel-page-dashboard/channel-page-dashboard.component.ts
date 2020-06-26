import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChannelService } from '../../channel.service';
import { Observable, Subscription, timer, interval } from 'rxjs';

@Component({
  selector: 'channel-page-dashboard',
  templateUrl: './channel-page-dashboard.component.html',
  styleUrls: ['./channel-page-dashboard.component.scss']
})
export class ChannelPageDashboardComponent implements OnInit, OnDestroy {
  Channel: string;
  constructor(private activatedRoute: ActivatedRoute, private channelService: ChannelService) {
    this.activatedRoute.parent.paramMap.subscribe(params => {
      let id = params.get("id");
      this.Channel = id;
    });
  }

  status;
  remainingTime = 10;
  timer: Subscription;

  async ngOnInit() {
    await this.Update();
    this.timer = interval(10000)
      .subscribe(() => this.Update());
  }

  ngOnDestroy() {
    this.timer.unsubscribe();
  }

  async Update() {
    this.status = await this.channelService.GetLiveStatus(this.Channel);
    let rawDate: string = this.status.startDateUTC;
    if (rawDate != null) {
      let startDate = new Date(rawDate);
      console.log(startDate);
      let diff = Math.floor((new Date().getTime() - startDate.getTime()) / 1000);
      let remaining = this.status.currentMediaDuration - diff;
      if (remaining < 0) {
        remaining = 0;
      }
      this.remainingTime = remaining;
    } else {
      this.remainingTime = 0;
    }
  }

}
