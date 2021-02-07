import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { AppPlayerComponent } from '../app-player/app-player.component';
import { ActivatedRoute } from '@angular/router';
import { WebStreamerService } from '../services/web-streamer/web-streamer.service';
import { Title } from '@angular/platform-browser';
import { ChannelInfoService } from '../services/channel/channel-info.service';
import { stringify } from 'querystring';
import { AnalyticsService } from '../../@core/utils';

@Component({
  selector: 'external-player',
  templateUrl: './external-player.component.html',
  styleUrls: ['./external-player.component.scss']
})

export class ExternalPlayerComponent implements OnInit {
  @ViewChild(AppPlayerComponent, null) player: AppPlayerComponent;
  channelId: string;
  backgroundCover = "";
  mediaId = "";
  mediaTitle = "";
  channelTitle = ""
  showPlayPopup = true;

  constructor(private route: ActivatedRoute, private _streamerService: WebStreamerService,
    private _title: Title, private _channelInfoService: ChannelInfoService, private analytics: AnalyticsService) {
  }

  ngAfterViewInit() {

  }

  async ngOnInit() {
    this.channelId = this.route.snapshot.paramMap.get('id');

    this.analytics.trackEvent('player_init');

    await this.updateChannelInfo();

    this.updateTitle();

    await this.player.initialize("gkEcoZyHI9s",
      "https://img.youtube.com/vi/gkEcoZyHI9s/hqdefault.jpg")

  }

  async initializePlayer() {
    try {
      await this._streamerService.Connect(this.channelId);
      this.analytics.trackEvent('player_connect_success');
    } catch (e) {
      console.error(e);
      alert("Failed to connect: " + e);
      this.analytics.trackEvent('player_connect_error');
    }
    this._streamerService.OnPlayEvent.subscribe(data => {
      let now = new Date();
      let start = new Date(data.startDateUTC);
      let diff = Math.ceil((now.getTime() - start.getTime()) / 1000);

      this.analytics.trackEvent('player_play_event');

      if (diff > data.duration) {
        console.log("Media already ended, waiting next");
        return;
      }
      if (diff < 0) {
        console.log("Invalid media start date or system date");
      }

      console.log("DIFF: " + diff);

      this.updateMediaInfo(data.mediaId);

      this.player.playVideo(data.mediaId, diff);
      console.log("PlayEvent Received: " + data.mediaId);
    })
  }

  playClick() {
    this.showPlayPopup = false;
    this.initializePlayer();
  }

  async updateMediaInfo(id: string) {
    this.backgroundCover = "https://img.youtube.com/vi/" + id + "/hqdefault.jpg";
    this.mediaId = id;

    await this.updateChannelInfo();

    this.updateTitle();
  }

  async updateChannelInfo() {
    try {
      let info = await this._channelInfoService.GetChannelInfo(this.channelId);
      this.channelTitle = info.title;
      this.mediaTitle = info.lastMediaTitle;
    } catch (e) {
      console.error(e);
    }
  }

  updateTitle() {
    let title = "";
    if (this.mediaTitle != null && this.mediaTitle != "") {
      title += this.mediaTitle + " - ";
    }
    if (this.channelTitle != null && this.channelTitle != "") {
      title += this.channelTitle + " - ";
    }
    title += "plister.net";

    this._title.setTitle(title);
  }

  ngOnDestroy() {
    this._streamerService.Disconnect();
    this.analytics.trackEvent('player_disconnect');
  }

}
